const http = require('http');
const https = require('https');
const { URL } = require('url');

/**
 * Proxy endpoint supporting both POST and GET to /request.
 * - POST: Accepts url, method, headers, body in req.body.
 * - GET: Accepts url, method, headers, body all via URL params.
 */
const handleProxyRequest = async (req, res) => {
    try {
        let url, method, headers, body;
        if (req.method === 'GET') {
            // All info via query params for GET /request
            url = req.query.url;
            method = req.query.method || 'GET';
            try {
                headers = req.query.headers
                    ? JSON.parse(req.query.headers)
                    : {};
            } catch {
                headers = {};
            }
            body = req.query.body ? req.query.body : undefined;
        } else {
            // POST, standard JSON input
            ({ url, method = 'GET', headers = {}, body } = req.body);
        }

        if (!url) {
            return res.status(999).json({
                error: 'URL is required',
                success: false,
            });
        }

        // Validate URL
        let targetUrl;
        try {
            targetUrl = new URL(url);
        } catch {
            return res.status(999).json({
                error: 'Invalid URL provided',
                success: false,
            });
        }

        const requestModule = targetUrl.protocol === 'https:' ? https : http;

        const options = {
            hostname: targetUrl.hostname,
            port:
                targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
            path: targetUrl.pathname + targetUrl.search,
            method: method.toUpperCase(),
            headers: {
                ...headers,
                'User-Agent': headers['User-Agent'] || 'ya-corps/1.0.0',
            },
        };

        // Create the request
        const proxyReq = requestModule.request(options, proxyRes => {
            // Set CORS headers
            res.set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*',
            });

            // Forward status code
            res.status(proxyRes.statusCode);

            // Forward response headers (excluding some that might cause issues)
            const excludeHeaders = [
                'set-cookie',
                'access-control-allow-origin',
            ];
            Object.keys(proxyRes.headers).forEach(header => {
                if (!excludeHeaders.includes(header.toLowerCase())) {
                    res.set(header, proxyRes.headers[header]);
                }
            });

            // Pipe the response
            proxyRes.pipe(res);
        });

        // Handle request errors
        proxyReq.on('error', error => {
            console.error('Proxy request error:', error);
            if (!res.headersSent) {
                res.status(999).json({
                    error: 'Failed to complete request',
                    success: false,
                    details: error.message,
                });
            }
        });

        // Send body if present (for POST, PUT, PATCH, etc.)
        if (
            body &&
            (options.method === 'POST' ||
                options.method === 'PUT' ||
                options.method === 'PATCH')
        ) {
            if (typeof body === 'object') {
                proxyReq.write(JSON.stringify(body));
            } else {
                proxyReq.write(body);
            }
        }

        // End the request
        proxyReq.end();
    } catch (error) {
        console.error('Request processing error:', error);
        res.status(999).json({
            error: 'Proxy Error: Whoops. Something went wrong while processing yer request! Are you sure the URL is correct? or that the site has a port we can sale to?',
            success: false,
            details: error.message,
        });
    }
};
exports.handleProxyRequest = handleProxyRequest;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const app = express();
const PORT =
    process.env.YA_CORPS_PORT ||
    (() => {
        throw new Error('YA_CORPS_PORT is not defined in .env file');
    })();

app.use(express.json());
app.use(cors());

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
    });
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send({
        message:
            "Ahoy there, ye scallywag! Ye've found the Ya-Corps API, the finest vessel on these digital seas. If ye be lookin' to send yer messages across the briny deep, chart a course to /request and let the adventure begin!",
        success: true,
        endpoints: {
            '/request': {
                method: 'POST & GET',
                description:
                    'Send a CORS-enabled proxy request to any port on the web — no landlubber restrictions here!',
                body: {
                    url: 'string (required) - The destination URL, where ye wish to send yer message in a bottle',
                    method: "string (optional) - The HTTP method (GET, POST, PUT, DELETE, etc.) — defaults to GET if ye don't specify",
                    headers:
                        'object (optional) - Any extra orders (headers) ye want to send with yer request',
                    body: "any (optional) - The cargo (body) for POST/PUT requests, if ye be needin' it",
                },
                get_params: {
                    url: 'string (required) - The destination URL',
                    method: 'string (optional) - HTTP method, defaults to GET',
                    headers:
                        'stringified JSON (optional) - Any extra orders (headers)',
                    body: 'string (optional) - Body for POST/PUT requests, if needed',
                },
            },
        },
    });
});

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

// Support POST and GET to /request
app.post('/request', handleProxyRequest);
app.get('/request', handleProxyRequest);

app.get('*', (req, res) => {
    res.status(404).send({
        error: "You be sailin' in uncharted waters, matey!",
        success: false,
    });
});

if (require.main === module) {
    app.listen(PORT, () =>
        console.log(
            `Arrr! The Ya-Corps API be sailin' at http://localhost:${PORT} — ready fer adventure! 🏴‍☠️`
        )
    );
}

module.exports = app;

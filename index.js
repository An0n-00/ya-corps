require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const app = express();
const PORT =
    process.env.PORT ||
    (() => {
        throw new Error('PORT is not defined in .env file');
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
                method: 'POST',
                description:
                    'Send a CORS-enabled proxy request to any port on the web — no landlubber restrictions here!',
                body: {
                    url: 'string (required) - The destination URL, where ye wish to send yer message in a bottle',
                    method: "string (optional) - The HTTP method (GET, POST, PUT, DELETE, etc.) — defaults to GET if ye don't specify",
                    headers:
                        'object (optional) - Any extra orders (headers) ye want to send with yer request',
                    body: "any (optional) - The cargo (body) for POST/PUT requests, if ye be needin' it",
                },
            },
        },
    });
});

app.post('/request', async (req, res) => {
    try {
        const { url, method = 'GET', headers = {}, body } = req.body;

        if (!url) {
            return res.status(400).json({
                error: 'URL is required',
                success: false,
            });
        }

        // Validate URL
        let targetUrl;
        try {
            targetUrl = new URL(url);
        } catch (error) {
            return res.status(400).json({
                error: 'Invalid URL provided',
                success: false,
            });
        }

        // Choose the appropriate module based on protocol
        const requestModule = targetUrl.protocol === 'https:' ? https : http;

        // Prepare request options
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
                res.status(500).json({
                    error: 'Failed to complete request',
                    success: false,
                    details: error.message,
                });
            }
        });

        // Send body if present (for POST, PUT, etc.)
        if (
            body &&
            (method.toUpperCase() === 'POST' ||
                method.toUpperCase() === 'PUT' ||
                method.toUpperCase() === 'PATCH')
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
        res.status(500).json({
            error: 'Internal server error',
            success: false,
            details: error.message,
        });
    }
});

app.get('*', (req, res) => {
    res.status(404).send({
        error: "You be sailin' in uncharted waters, matey!",
        success: false,
    });
});

app.listen(PORT, () =>
    console.log(
        `Arrr! The Ya-Corps API be sailin' at http://localhost:${PORT} — ready fer adventure! 🏴‍☠️`
    )
);

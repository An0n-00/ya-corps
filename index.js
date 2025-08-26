/* eslint-disable quotes */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleProxyRequest } = require('./src/handleProxyRequest');
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

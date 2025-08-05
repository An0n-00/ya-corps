require('dotenv').config();
const PORT = process.env.PORT || 3000;
const fetch = require('node-fetch');

async function testProxy() {
    try {
        console.log('Testing CORS proxy...');
        const response = await fetch(`http://localhost:${PORT}/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: 'https://httpbin.org/get',
                method: 'GET'
            })
        });

        console.log('Response status:', response.status);
        const data = await response.text();
        console.log('Response data:', data);
        
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testProxy();

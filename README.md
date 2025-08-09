<div align="center">

# ya-corps

**Y**et **A**nother **COR**(S) **P**roxy **S**erver

Hey Matey! Welcome to **ya-corps**, a simple CORS proxy server built with Node.js and Express. This project allows you to bypass CORS restrictions by proxying requests through a server, making it easier to access APIs and resources that have CORS policies in place.

To be blunt with you mate, I dislike long readme files, so I tried to keep it short and essential. Just click on a header you are interested in and **dive right in**!

We would really appreciate your support by starring the project! You are keeping us afloat ❤️🚢🔱

</div>

<h2>🚀 Features</h2>

- **CORS Proxy**: Bypass CORS restrictions by proxying requests through the server
- **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, and other HTTP methods
- **Header Forwarding**: Forward custom headers with your requests
- **Request Body Support**: Send request bodies for POST/PUT operations
- **Error Handling**: Comprehensive error handling and reporting
- **Simple API**: Easy-to-use REST API interface. Like reallllyyy easy



<details><summary><h2>📦 Installation</h2></summary>

1. Clone the repository:
```bash
git clone https://github.com/An0n-00/ya-corps.git
cd ya-corps
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
mv .env.example .env
```

4. Start the server:
```bash
npm run main
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

</details>

<details><summary><h2>🛠️ Usage</h2></summary>

### Basic Proxy Request

Send a POST request to `/request` with the target URL:
```javascript
fetch('http://localhost:3000/request', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: 'https://api.example.com/data'
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Advanced Proxy Request

Include custom headers and request body:
```javascript
fetch('http://localhost:3000/request', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url: 'https://api.example.com/users',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer your-token',
            'Content-Type': 'application/json'
        },
        body: {
            name: 'John Doe',
            email: 'john@example.com'
        }
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

</details>

<details><summary><h2>📋 API Reference</h2></summary>

To see the full API reference, you can view the OpenAPI specification in [`openapi.yml`](./openapi.yml).

### POST /request

Proxy a request to the specified URL.

**Request Body:**
- `url` (string, required): The target URL to proxy
- `method` (string, optional): HTTP method (defaults to GET)
- `headers` (object, optional): Headers to forward with the request  
- `body` (any, optional): Request body for POST/PUT requests

**Response:**
The response from the target URL with CORS headers added.

Returns API information and usage examples.

> [!IMPORTANT]
> If there is any error in the request, the server will return a **999** status code. This is a custom status code used to indicate that the request could not be processed due to an error. The response will include an `error` field and a `details` field with details about the issue. This is to avoid confusion with standard HTTP status codes and to provide a clear indication of errors specific to this proxy server and not the target API.

</details>

<details><summary><h2>🔧 Configuration</h2></summary>

BEFORE RUNNING THIS PROJECT: Configure the server using environment variables in your `.env` file:

- `YA_CORPS_PORT`: Server port (default: 3000)

</details>

<details><summary><h2>📝 License</h2></summary>

<a href="https://github.com/An0n-00/ya-corps">ya-corps</a> © 2025 by <a href="https://github.com/An0n-00">An0n-00</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</a>
<img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="Creative Commons" style="height: 20px">
<img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="Attribution" style="height: 20px">
<img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="Non-Commercial" style="height: 20px">
<img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="Share Alike" style="height: 20px">

See full license in [LICENSE](./LICENSE).

</details>

<details><summary><h2>🤝 Contributing</h2></summary>

Contributions are welcome! Please [open an issue](https://github.com/An0n-00/ya-corps/issues) before submitting a Pull Request to discuss your changes.

</details>

## 📈 Charts

![Commit Activity](https://repobeats.axiom.co/api/embed/932a6cb7be2968ddc52d8baba05673642b47ab25.svg)

Feel free to [provide feedback](https://github.com/An0n-00/ya-corps/issues) or contribute to the project!

[![Star History Chart](https://api.star-history.com/svg?repos=An0n-00/ya-corps&type=Date)](https://www.star-history.com/#An0n-00/ya-corps&Date)

We would really appreciate your support by starring the project! You are keeping us afloat ❤️

[<img src="./docs/jack_the_great.gif"></img>](https://github.com/An0n-00/ya-corps/stargazers)

<div align="center">

# ya-corps

**Y**et **A**nother **COR**(S) **P**roxy **S**erver

Hey Matey! Welcome to **ya-corps**, a simple CORS proxy server built with Node.js and Express. This project allows you to bypass CORS restrictions by proxying requests through a server, making it easier to access APIs and resources that have CORS policies in place.

To be blunt with you mate, I dislike long readme files, so I tried to keep it short and essential. Just click on a header you are interested in and **dive right in**!

### We would really appreciate your support by starring the project! You are keeping us afloat ❤️🚢🔱

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

### Proxy Endpoint

#### `POST /request`

Send an HTTP request anywhere!

**Body (`application/json`):**

```json
{
    "url": "https://targetsite.com/api",
    "method": "POST",
    "headers": { "Authorization": "Bearer token" },
    "body": { "foo": "bar" }
}
```

- `url`: **required** — full destination URL
- `method`: optional — HTTP method, defaults to `GET`
- `headers`: optional — object of headers
- `body`: optional — any data, for POST/PUT/PATCH

#### `GET /request`

Send all info via **query parameters**:

```
/request?url=https://targetsite.com/api&method=POST&headers={"Authorization":"Bearer%20token"}&body={"foo":"bar"}
```

- `url`: **required** — destination URL
- `method`: optional — HTTP method, defaults to `GET`
- `headers`: optional — JSON-stringified headers (URL-encoded)
- `body`: optional — string or JSON-stringified body (URL-encoded)

</details>

## 📈 Charts

![Commit Activity](https://repobeats.axiom.co/api/embed/932a6cb7be2968ddc52d8baba05673642b47ab25.svg)

Feel free to [provide feedback](https://github.com/An0n-00/ya-corps/issues) or contribute to the project!

[![Star History Chart](https://api.star-history.com/svg?repos=An0n-00/ya-corps&type=Date)](https://www.star-history.com/#An0n-00/ya-corps&Date)

We would really appreciate your support by starring the project! You are keeping us afloat ❤️

[<img src="./docs/jack_the_great.gif"></img>](https://github.com/An0n-00/ya-corps/stargazers)

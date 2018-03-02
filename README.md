# punchman (1)


## Configuration

.punchmanrc, punchman.config.js or a punchman property in package.json

```js
{
    "testDir": "e2e",
    "baseUrl": process.env.SERVER_URL,
    "puppeteer": {
        "sloMo": 0,
        "headless": true,
        "ignoreHTTPSErrors": true 
    },
    "plugins": [
        "punchman-react"
    ]
}
```

## Starting and stopping a server

```sh
npm install --saveDev with-server
```

```json
{
  "scripts": {
    "start": "webpack-dev-server",
    "test": "with-server punchman"
  }
}
```
# NodeJS run-middleware

NodeJS module to execute your Express endpoints (middlewares) from your code. This module will let you manually launch all your middleware. It is simulating a client calling your rest APIs, without using a network connection (your server does not even need to listen on a port).

[![npm](https://img.shields.io/npm/dt/run-middleware.svg?maxAge=2592000)](https://www.npmjs.com/package/run-middleware)
[![npm version](https://badge.fury.io/js/run-middleware.svg)](https://badge.fury.io/js/run-middleware)
[![Join the chat at https://gitter.im/node-run-middleware/Lobby](https://badges.gitter.im/node-run-middleware/Lobby.svg)](https://gitter.im/node-run-middleware/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/Aminadav/node-run-middleware.svg?branch=master)](https://travis-ci.org/Aminadav/node-run-middleware)

## Why?

Many times, your server and your client, need to execute the same functions. For example here is an endpoint to get user details:

```js
app.get('/get-user/:id', (req, res) => {
  mysql.query('select * from users where id=?', [req.params.id], (err, rows) => {
    res.send({
      user: rows[0]
    });
  });
});
```

Now you want to get the user details from your code. What should you do?

```js
app.runMiddleware('/get-user/20', (_, body) => {
  console.log(`User details: ${body}`);
});
```

## Installation

```sh
npm i -S run-middleware
```

```js
const express = require('express');
const app = express();
const runMiddleware = require('run-middleware');

runMiddleware(app);
```

## Support & Contributions

* Pull requests, issues, and English proofreading are welcome on Github.
* Question & support on StackOverflow using `run-middleware`tag.

## Change request paramaters

As options you can pass the `query`, `body`, `method` and `cookies` parameters.

```js
app.runMiddleware('/handler', {
  method: 'post',
  query: {
    token: 'tk-12345'
  },
  body: {
    "action": "list",
    "path": "/"
  }
}, (code, data) => {
  console.log(code, data);
  process.exit(0);
});
```

## Auto pass cookies

When you `runMiddleware` from another location, you don't have to pass all the parameters of the current middleware to the handler.

```js
app.get('/middleware1', (req, res) => {
  req.runMiddleware( /* ... */ );
})
```

## Redirecting

You can check if the middleware executed will redirect the request by checking the `code` and the `headers.location` fields.

```js
app.runMiddleware('/this-middleware-will-response-as-redirect', (code, body, headers) => {
  if (code === 301 || code === 302) { // Redirect HTTP codes
    console.log('Redirect to:', headers.location);
  }
});
```

## Changelog

* v1.0.0 (25 June 2018) -
* v0.6.1 (9 Sep 2016) - Supports response.redirect
* v0.6.2 (10 Sep 2016) - Supports passing cookies and other variables to runMiddleware
* v0.6.3 (11 Sep 2016) - Supports running middleware from others middleware, for automatically passing cookies and headers between middlewares.
* v0.6.4 (13 Sep 2016) - Better documentation and examples

## Examples

See the tests for further examples.

[Control V](https://ctrl.vi)

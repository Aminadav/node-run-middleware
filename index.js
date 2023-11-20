var _ = require("lodash");

var request = require("express/lib/request");

module.exports = function(app) {
  app.use((req, res, next) => {
    req.runMiddleware = (path, options, callback) => {
      if (_.isFunction(options)) {
        callback = options;
        options = {};
      }
      options.original_req = req;
      options.original_res = res;
      app.runMiddleware(path, options, callback);
    };
    next();
  });
  if (app.runMiddleware) return; // Do not able to add us twice

  app.runMiddleware = function(path, options, callback) {
    if (callback) callback = _.once(callback);
    if (typeof options == "function") {
      callback = options;
      options = null;
    }
    options = options || {};
    options.url = path;
    var new_req, new_res;
    if (options.original_req) {
      new_req = options.original_req;
      for (var i in options) {
        if (i == "original_req") continue;
        new_req[i] = options[i];
      }
    } else {
      new_req = createReq(path, options);
    }
    new_res = createRes(callback);
    app(new_req, new_res);
  };

  /* end - APP.runMiddleware*/
};

function createReq(path, options) {
  if (!options) options = {};
  var req = _.extend(
    {
      method: "GET",
      host: "",
      cookies: {},
      query: {},
      url: path,
      headers: {},
    },
    options
  );
  req.method = req.method.toUpperCase();
  // req.connection=_req.connection
  return req;
}
function createRes(callback) {
  var res = {
    _removedHeader: {},
    _statusCode: 200,
    statusMessage: 'OK',
    get statusCode() {
      return this._statusCode
    },
    set statusCode(status) {
      this._statusCode = status
      this.status(status)
    }
  };
  // res=_.extend(res,require('express/lib/response'));

  var headers = {};
  var code = 200;
  res.set = res.header = (x, y) => {
    if (arguments.length === 2) {
      res.setHeader(x, y);
    } else {
      for (var key in x) {
        res.setHeader(key, x[key]);
      }
    }
    return res;
  }
  res.setHeader = (x, y) => {
    headers[x] = y;
    headers[x.toLowerCase()] = y;
    return res;
  };
  res.getHeader = (x) => headers[x];
  // res.get=(x) => {
  // 	return headers[x]
  // }
  res.redirect = function(_code, url) {
    if (!_.isNumber(_code)) {
      code = 301;
      url = _code;
    } else {
      code = _code;
    }
    res.setHeader("Location", url);
    res.end();
    // callback(code,url)
  };
  res.status = res.sendStatus = function(number) {
    code = number;
    return res;
  };
  res.end = res.send = res.write = function(data) {
    if (callback) callback(code, data, headers);
    // else if (!options.quiet){
    //     _res.send(data)
    // }
  };
  res.getHeader = function(name) {
    if ( 'undefined' !== typeof headers[name] ) {
      return headers[name];
    }
    return null; 
  };
  return res;
}

var express = require("express");
var AddRunMiddleware = require("../");

test("test redirect", done => {
  var app = express();
  AddRunMiddleware(app);
  app.get("/customRedirectCode", function(req, res) {
    res.redirect("http://github.com");
  });
  app.runMiddleware("/customRedirectCode", {}, function callback(
    code,
    data,
    headers
  ) {
    try {
      expect(code).toEqual(301);
      expect(headers.location).toEqual("http://github.com");
      done();
    } catch (err) {
      done(err);
    }
  });
});

test("test custom redirect", done => {
  var app = express();
  AddRunMiddleware(app);
  app.get("/customRedirectCode", function(req, res) {
    res.redirect(302, "http://github.com");
  });
  app.runMiddleware("/customRedirectCode", {}, function callback(
    code,
    data,
    headers
  ) {
    try {
      expect(code).toEqual(302);
      expect(headers.location).toEqual("http://github.com");
      done();
    } catch (err) {
      done(err);
    }
  });
});

test("test route with id", done => {
  var app = express();
  AddRunMiddleware(app);
  app.get("/get-user/:id", function(req, res) {
    res.send({ user: req.params.id, name: "Moyshale" });
  });

  app.runMiddleware("/get-user/20", {}, function(code, data) {
    try {
      expect(code).toEqual(200);
      expect(data).toEqual({ user: "20", name: "Moyshale" });
      done();
    } catch (err) {
      done(err);
    }
  });
});

test("test passing cookies", done => {
  var app = express();
  AddRunMiddleware(app);

  app.get("/see_cookie", function(req, res) {
    // This route show cookie1
    res.send({ cookie_status: req.cookies.cookie1 });
  });
  app.runMiddleware(
    "/see_cookie",
    { cookies: { cookie1: "this-is-the-cookie" } },
    function(code, data, headers) {
      try {
        expect(data).toEqual({ cookie_status: "this-is-the-cookie" });
        done();
      } catch (err) {
        done(err);
      }
    }
  );
});

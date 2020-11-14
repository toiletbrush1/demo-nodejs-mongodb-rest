var express = require('express');
var mongodb = require('../db');
var getIP = require('ipware')().get_ip;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  mongodb.getVal(res);
});


 router.get('/redir', function(req, res) {
   var ipInfo = JSON.stringify(getIP(req));
     mongodb.sendVal("Redirection: " + ipInfo, 0);
    res.redirect(303, 'http://52.200.252.64/latest/meta-data/hostname') // Notice the 303 parameter
 });

 router.get('/redir2', function(req, res) {
   var ipInfo = JSON.stringify(getIP(req));
     mongodb.sendVal("Redirection: " + ipInfo, 0);
    res.redirect(303, 'https://52.200.252.64/latest/meta-data/hostname') // Notice the 303 parameter
 });

 router.get('/redir3', function(req, res) {
   var ipInfo = JSON.stringify(getIP(req));
     mongodb.sendVal("Redirection: " + ipInfo, 0);
    res.redirect(303, 'http://52.200.252.64/unknownxyz') // Notice the 303 parameter
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

var express = require('express');
var router = express.Router();
var fs  = require("fs");
var sss = require("./filesave");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function(req, res, next) {
  //console.log(req.files);
  var obj = req.files.file;
  var tmp_path = obj.path;
  var new_path = "./uploadfiles/"+obj.name;
  util = require('util');

  var is = fs.createReadStream(tmp_path);
  var os = fs.createWriteStream(new_path);


  is.on("end", function () {
    res.json({"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"});
  })

  var domain = require('domain');

  function save() {
    is.pipe(os);

  }

  var d = domain.create();
  d.on('error',function(err){
    res.sendStatus(404);
    console.log(err);
  });

  d.add(is);
  d.add(os);
  d.run(save);




});
module.exports = router;

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
  fs.rename(tmp_path,new_path,function(err){
    if(err){
      console.log(err);
    }
    else
    {
      setTimeout(function () {
        res.send('respond with a resource');
      },0);

    }



  });

  fs.renameSync(tmp_path,new_path);
  //res.sendStatus(404)
  res.json({"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "id"});


});
module.exports = router;

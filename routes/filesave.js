
var fs  = require("fs");


function savefilearr(oldpath,newpath,callback)
{
  fs.rename(oldpath,newpath,function(err){

    setTimeout(function () {
      res.send('respond with a resource');
      callback(err)
    },5000);

  })
}



module.exports=savefilearr;

var express = require('express');
var router = express.Router();
var fs = require('fs')
var times = new Date();
// 异步存储
var store = {
    save: function () {
        // 如果存在进行读取在存储
        fs.stat('', function (err, stats) {
            if (err) {
                console.log(err)
                return false
            }
            console.log("文件：" + stats.isFile())
            console.log("目录：" + stats.isDirectory())
        })
        // fs.statSync('',function )
        // if() {

        // }
    }
}



/* GET home page. */
router.get('/api/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

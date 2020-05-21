var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs')
var moment = require("moment"),
    time = moment().format('YYYY-MM-DD')
// 异步存储
var store = {
    save: function (type, datas) {
        if(!type && !Array.isArray(datas)) {
            console.error('store 保存参数错误')
            return;
        }
        // 如果存在进行读取在存储
        let filePath = path.join(__dirname, "../logs/" + type +'/' + time + ".json");
        fs.exists(filePath, function (exists) {
            if (exists) {
                console.log('文件存在');
                // 进行读取文件，然后在将文件
                fs.appendFile(filePath, datas, "utf8", function (err,ret) {
                    if(err) {
                        throw err;
                    }
                });
            }else {
                // 文件不存在，进行创建文件并且
                fs.writeFile(filePath, datas);
            }
        });
        console.log(ls,'');
        // , function (err, stats) {
        //     console.log(22222,'');
        //   if (err) {
        //     console.log(err);
        //     return false;
        //   }
        //   console.log("文件：" + stats.isFile());
        //   console.log("目录：" + stats.isDirectory());
        // }
        // fs.statSync('',function )
        // if() {

        // }
    }
}



/* 请求监控 */
router.all('/api/ajaxs', function(req, res, next) {
    var params = req.params;
    store.save("request", [
      {
        href: params.href, // 整个域名请求
        url: params.url, // 请求的url
        datas: params.datas, // 内容
        method: params.method, // 请求方式
        query: params.query, // 传参的参数
        headers: params.headers, // 请求头参数
        define: params.define, // 自定义传过来的参数
      },
    ]);
    res.send('')
    next()
//   res.render('index', { title: 'Express' });
});

// 请求错误打印
router.all("/api/winErr", function (req, res, next) {
     var params = req.params;
    // store.save("err", [
    //   {
    //     device: params.device, // 出错是哪个设备
    //     uid: params.uid, // 自定义用户浏览器id
    //     href: params.href, // 整个域名请求
    //     datas: datas, // 请求错误
    //   }
    // ]);
    res.send({})
});

// 请求

module.exports = router;

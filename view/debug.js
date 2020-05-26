/** 
 * 注意点：
 *  1、当前请求错误或者代码错误，就不进行上报。一个路由只能上报一次。
 *  2、只有在打测试包或者是本地包，都得进行上报
 *  3、将vue或者 react的报错上报
 *  4、离线缓存，然后通过连接网站后，进行
 * 
 * 脚本错误、网络错误、
 * 
 * 1、初始化：在页面中，就有初始化地址。会尝试与服务器建立连接，生成脚本地址。
 * 2、自动生成 uid 作为用户id
 * 3、
 * 
 * 后台生成的代码变动的：请求接口地址。
**/
(function (window) {
    
    // 进行初始化下
    var win = window,
        debug = null,
        config = {}; // 配置文件
    debug = {
        /**
         * @abstract 设置配置文件
         * @param { Object }
        **/
        setConfig(_Object) {
            
        },
        /**
         * @abstract 初始化
         * @param 配置文件
         * @default 
         */
        init(config) {
            console.log(11111,win);
            listenerNum = this.listenerNum
            // 监听网页
            win.addEventListener('error', function (msg, url, line, col, error) {
                console.log(22222,'');
                // 同一个页面最多上报10次错误，防止某个循环错误页面一直打开，不断的报错
                if (listenerNum-- < 0) return;
                //没有URL不上报！上报也不知道错误
                if (msg != "Script error." && !url) {
                    return true;
                }
                setTimeout(function () {
                    var data = {};
                    //不一定所有浏览器都支持col参数
                    col = col || (window.event && window.event.errorCharacter) || 0;
                    data.url = url;
                    data.lineNo = line;
                    data.columnNo = col;
                    if (!!error && !!error.stack) {
                        //如果浏览器有堆栈信息
                        //直接使用
                        data.message = error.stack.toString();
                    } else if (!!arguments.callee) {
                        //尝试通过callee拿堆栈信息
                        var ext = [];
                        var f = arguments.callee.caller,
                            c = 3;
                        //这里只拿三层堆栈信息
                        while (f && (--c > 0)) {
                            ext.push(f.toString());
                            if (f === f.caller) {
                                break; //如果有环
                            }
                            f = f.caller;
                        }
                        ext = ext.join(",");
                        data.message = error.stack.toString();
                    }
                    //把data上报到后台！
                    console.log(data, '======data=====')
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://10.0.3.91:3001/api/err', true);
                    // 添加http头，发送信息至服务器时内容编码类型
                    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.setRequestHeader("Content-type", "application/json");
                    // xhr.setRequestHeader('Content-Type','application/json');
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200 || xhr.status == 304) {
                                // console.log(xhr.responseText);
                            }
                        }
                    }
                    xhr.send(JSON.stringify(data));
                }, 0);
                var show_js_error = true;
                if (show_js_error != true) {
                    //关闭js报错提示
                    return true;
                }
            }, true)
        },
        /**
         * @abstract 切换路由时候， 就可以使用这个
         * @type {number}
         * @param {listenerNum}
         * @default {10}
        */
        addRouterListener(listenerNum) {
            this.listenerNum = listenerNum || 10
        },
        /**
         * @abstract window.error错误发送请求次数。
         */
        listenerNum: 10,
        /**
         * 
        */
        
    }
    // 初始化
    debug.init()
    // 
    win.debugLog = debug
        // $.ajax({
        //     url: 'http://10.0.3.91:8111/api/winErr',
        //     method: 'POST'
        // })
})(window)

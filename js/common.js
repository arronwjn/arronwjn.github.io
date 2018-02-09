(function(owner){

	owner.ajax = function(url,data,type,success){
		$.ajax({
			url:url,
			data:data,
            dataType:'json',
            type:type,
            timeout:10000,
            success:success
		})
    }
    owner.selectAnswer = function (e, index, activeNum, title, answerArray){
        if (activeNum == index) {
            if (e === '') {
                // alert('请选择正确答案');
                return index
            } else {
                
                if (e === title) {
                    
                    return index
                    // console.log(answerArray[e].oa[0],'answerArray[e].oa[0]')
                } else {
                    // alert('您的答案错误，请重新选择');
                    return -1
                }

            }
        }
    }
	// 保存本地存储
    owner.setStorage = function (key, value) {
        localStorage.setItem('$' + key, value);
    };
    // 获取本地存储
    owner.getStorage = function (key) {
        return localStorage.getItem('$' + key);
    }
    // 删除本地的存储
    var removeStorage = function (key){
    	localStorage.removeItem('$' + key);
    }
	// 创建用户信息
    owner.setuser = function (token) {
        setStorage("token", token);
    };
    // 获取账号信息
    owner.getuser = function () {
        return getStorage("token");
    };
    // 删除账号信息
    owner.removeuser = function(){
    	removeStorage("token");
    };
    // 创建信息的公共方法
    owner.setinfo = function(name,info){
        setStorage(name, info);
    };
    //获得信息的公共方法
    owner.getinfo = function(name){
        return getStorage(name);
    };
    //删除信息的公共方法
    owner.removeinfo = function(name){
        removeStorage(name);
    }; 
    // 获取get传值
    owner.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2])
        }else{
            return null;
        } 
    };
    //获取get传值对象
    owner.getQuery = function () {
        var query = window.location.search.substr(1);

        var pos = 0;
        var res = [];
        for (var i = 0; i < query.length; i++) {
            var q = query[i];
            // 获取key
            if (q == '=') {
                var key = unescape(query.substring(pos, i));
                res.push(key);
                pos = i + 1;
                continue;
            }
            // 获取value
            if (q == '&') {
                var value = unescape(query.substring(pos, i));
                res.push(value);
                pos = i + 1;
                continue;
            }
        }

        // 处理
        var value = unescape(query.substring(pos, query.length));
        res.push(value);

        // 组合为对象
        var obj = {};
        for (var i = 0; i < res.length; i = i + 2) {
            obj[res[i]] = res[i + 1];
        }
        return obj;
    };

    //获取location传值
    owner.GetRequest = function (url) {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
        console.log(theRequest)
    };

    //验证手机号格式
    owner.isMobil= function (s) { var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/; if (!patrn.exec(s)){return false}else{return true}   };

    //验证出生日期
    owner.isBirthday = function (data){
        var filter=/^\d{4}\-\d{2}\-\d{2}$/

        if (filter.test(data)){
            return true
        }else{
            return false
        }
    };
    //匹配中文字符或字符串
    owner.isName=function(n){
        var patrn=/^[a-zA-Z\u4e00-\u9fa5]+$/
        if(!patrn.exec(n)){
            return false;
        }else{
            return true;
        }
    }
    //匹配字符串
    owner.isString=function(n){
        var patrn=/^[A-Za-z]+$/;
        if(!patrn.exec(n)){
            return false
        }else{
            return true
        }
    }
    //验证数字
    owner.isNumber=function(n){
        var patrn=/^[0-9]*$/
        if(!patrn.exec(n)){
            return false
        }else{
            return true
        }
    }
    //验证特殊字符
    owner.isChart=function(n){
        var patrn=/[^%&',;=?$\x22]+/
        if(!patrn.exec(n)){
            return false
        }else{
            return true
        }
    }
    //验证邮箱
    owner.isEmail=function(mail){
        var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail)){
            return true;
        }else{
            return false;
        }
    }
    //验证身份证
    owner.isCard=function(card){
        var patrn = /^\d{15}|\d{}18$/;
        if(!patrn.exec(card)){
            return false;
        }else{
            return true;
        }
    }
    //验证字符串和中文字符

    //html转码
    owner.HTMLDecode=function(text){
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }
    //图片路径转换
    owner.formatImg=function(imgUrl, allowCache) {
        var baseUrl='http://zuche.ueepub.cn/'
        if (imgUrl) {
            imgUrl = imgUrl.split(',')[0];
            if (imgUrl.indexOf('http') !== 0) {
                imgUrl = baseUrl + imgUrl;
            }
        } else {
            imgUrl = 'widget://assets/images/bg-my.png';
        }
        if (allowCache) {
            return imgUrl;
        } else {
            return imgUrl + '?' + Math.random();
        }
    }

    //获取时间戳
    owner.timeDiff=function(stringTime){
        var timestamp2 = Date.parse(new Date(stringTime));
        timestamp2 = timestamp2 / 1000;
        return timestamp2
    }

    //时间戳相减
    owner.dayDiff=function($begin_time,$end_time){
            if($begin_time < $end_time){
                $starttime = $begin_time;
                $endtime = $end_time;
            }else{
                $starttime = $end_time;
                $endtime = $begin_time;
            }
            //计算天数
            $timediff = $endtime-$starttime;
            $days = ($timediff/86400);
            return  $days;
    }
    owner.dgetMonthWeek = function (data) {
        var d = new Date(data);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
    //验证权限跳转登录页
    owner.jumpSign=function(time){
        setTimeout(function(){
            window.location.href='./sign.html'
        },time)
    }

}(window.common = {}));
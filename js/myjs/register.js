var smsVerify = null;
apiready = function(){
  smsVerify = api.require('smsVerify');
  register();
};
var wait=60;
function time() {
        //var o=document.getElementById("btn");
        if (wait == 0) {
            //o.removeAttribute("disabled");
            document.getElementById("btn").disabled=true;
            document.getElementById("btn").innerHTML="免费获取验证码";
            wait = 60;
        } else {
            //o.setAttribute("disabled", true);
            document.getElementById("btn").disabled=false;
            document.getElementById("btn").innerHTML=wait+"秒后可以重新发送";
            alert("fasong");
            setTimeout(function(o) {
              document.getElementById("btn").innerHTML=wait+"秒后可以重新发送";
                wait--;
            },
            1000)
        }
    }
// 注册，初始化
function register(){
  smsVerify.register(function(ret, err){
    if(ret.status){
        //api.alert({msg: '注册成功'});
    }else{
        api.alert({msg: err.code+' 注册失败'});
    }
  });
}
// 发短信验证码
function sms(){
  var phone = document.getElementById("log_phone").value;
  smsVerify.sms({
    phone:phone,
  },function(ret, err){
  if(ret.status){
    // 新增的安卓智能验证功能
    if( ret.smart == true ){	// 安卓版特有功能 智能验证成功
      api.alert({msg: '智能验证成功'});
      document.getElementById("log_click").value="智能验证成功";
      $("#log_click").readOnly=true;
    }else{
      layer.open({
        content: '验证码发送成功！',
        skin:"msg",
        time: 2//2秒钟后消失
     });
    }
  }else{
    layer.open({
      content: '验证码发送失败！',
      skin:"msg",
      time: 2//2秒钟后消失
    });
  }
});
}
//删除两段空格
function trim(str){ //删除左右两端的空格
　　 return str.replace(/(^\s*)|(\s*$)/g, "");
}

function checkInfo(){

  var phone=document.getElementById("log_phone").value;
  var name=document.getElementById("name").value;
  var password=document.getElementById("password").value;
  var code=document.getElementById("log_click").value;

 //验证手机号是否错误 是否重复
 if(!(/^1[34578]\d{9}$/.test(phone))){
   layer.open({
      content: '手机号不合法！',
      skin:"msg",
      time: 2//2秒钟后消失
   });
   $("#log_phone").focus();
   document.getElementById("log_phone").value="";
   return false;
 }
 if(/^1[34578]\d{9}$/.test(phone)){
   api.ajax({
     url: 'http://123.58.253.71:8808/FHMYSQL/checkphone',
     method: 'post',
     dataType:'text',
     data: {
       values: {
         phone:phone
       }
     }
   },
  function(ret, err){
    if (ret) {
      if(ret=="error"){
        layer.open({
           content: '手机号已被注册！',
           skin:"msg",
           time: 2//2秒钟后消失
        });
        $("#log_phone").focus();
        document.getElementById("log_phone").value="";
        return false;
      }
    } else {
        layer.open({
           content: '出现了一个错误请稍后重试！',
           skin:"msg",
           time: 2//2秒钟后消失
        });
        return false;
    }
  });//end ajax
 }
 //验证验证码
 if(code!="智能验证成功"){
   smsVerify.verify({
     phone:phone,
     code:code,
   },function(ret, err){
     if(ret.status){
      //  layer.open({
      //    content: '验证通过！',
      //    skin:"msg"
      //  });
     }else{
        layer.open({
          content: '验证码错误！'
        });
        document.getElementById("log_click").value="";
        return false;
     }
   });
 }
// alert("用户名："+trim(name));
 if (trim(name)!=""&&trim(name).length<15) {
   api.ajax({
   //  url: 'http://192.168.3.20:8080/FHMYSQL/checkname',
     url: 'http://123.58.253.71:8808/FHMYSQL/checkname',
     method: 'post',
     dataType:'text',
     data: {
       values: {
         name:name
       }
     }
   },
  function(ret, err){
    if (ret) {
      if(ret=="error"){
        layer.open({
           content: '用户名已存在！',
           skin:"msg",
           time: 2//2秒钟后消失
        });
        $("#name").focus();
        document.getElementById("name").value="";
        return false;
      }
    } else {
        layer.open({
           content: '出现了一个错误请稍后重试！',
           skin:"msg",
           time: 2//2秒钟后消失
        });
        return false;
    }
  });//end ajax
}//end if
if(trim(name)==""&&trim(name).length>15) {
  layer.open({
     content: '用户名格式不合法！请输入小于15字符的用户名！',
     skin:"msg",
     time: 2//2秒钟后消失
  });
  $("#name").focus();
  document.getElementById("name").value="";
  return false;
}
var mag=/^[a-zA-Z0-9]{6,20}$/;
if(!mag.test(password)){
  layer.open({
      content: '密码格式不合法，请输入长度为6到20的数字或字母！',
      skin:"msg",
      time: 2//2秒钟后消失
  });
  $("#password").focus();
  document.getElementById("password").value="";
  return false;
}
    to_Rgister(phone,code,name,password);
}
//注册
function to_Rgister(phone,code,name,password){
  //checkInfo(phone,code,name,password);
  if (trim(phone)!=""&&trim(name)!=""&&trim(code)!=""&&trim(password)!="") {
    //将数据存入数据库
    api.ajax({
      url: 'http://123.58.253.71:8808/FHMYSQL/register',
      //url: 'http://192.168.3.20:8808/FHMYSQL/register',
      method: 'post',
      dataType:'text',
      data: {
        values: {
          KEYDATA:name+",fh,"+password+",fh,"+phone
        }
      }
    },
    function(ret, err){
      if(ret){
        if (ret!="error") {
          layer.open({
              type: 4,
              content: '<i class="layui-layer-ico layui-layer-ico2"></i><div class="lay-error">注册成功<div>'
           });
          api.openWin({
            name: 'main',
            url: 'login.html',
          });
        }else {
          layer.open({
          type: 4,
          content: '<i class="layui-layer-ico layui-layer-ico2"></i><div class="lay-error">注册失败<div>'
          });
        }
      }
    });
  }else {
    layer.open({
        content: ' 信息不能为空！',
        skin:"msg",
        time: 2//2秒钟后消失
    });
  }

}
function open_agreement() {
  api.openWin({
    name: '用户协议',
    url: 'agreement.html',
  });
}

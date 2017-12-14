var smsVerify = null;
apiready = function(){
  smsVerify = api.require('smsVerify');
  register();
};

// 注册，初始化z
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
//判断手机号格式是否合法
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
        $("#btn_check").value="验证码发送成功";
    }
  }else{
    api.alert({msg: err.code+' 短信发送失败'});
  }
});
}
function updata(){
// 校验验证码
var phone = document.getElementById("log_phone").value;
var code = document.getElementById("log_click").value;
if(!(/^1[34578]\d{9}$/.test(phone))){
  layer.open({
     content: '手机号不合法！',
     skin:"msg",
     time: 2//2秒钟后消失
  });
  $("#log_phone").focus();
  document.getElementById("log_phone").value="";
}else {
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
      alert(ret);
      if(ret=="error"){
         layer.open({
            content: '手机号已被注册！',
            skin:"msg",
            time: 2//2秒钟后消失
         });
         $("#log_phone").focus();
         document.getElementById("log_phone").value="";
      }
      if (ret=="success") {
         if ($api.byId('log_click').value!="智能验证成功") {
           smsVerify.verify({
              phone:phone,
              code:code,
           },function(ret, err){
                if(ret.status){
                //验证通过提交更改
                 edit_phone(phone);
                }else{
                    layer.open({
                      content: '验证码错误！',
                      skin:"msg",
                    });
                    document.getElementById("log_click").value="";
                }
           });
         }else{
            edit_phone(phone);
         }
       }
     } else {
         layer.open({
            content: '出现了一个错误请稍后重试！',
            skin:"msg",
            time: 2//2秒钟后消失
         });
       }
   });//end ajax
}
}
function edit_phone(phone){
 api.ajax({
   url: 'http://123.58.253.71:8808/FHMYSQL/updatePhone',
   method: 'post',
   dataType:'text',
   data: {
     values: {
       phone:phone,
       userid:$api.getStorage("userInfo").userId
     }
   }
 },
function(ret, err){
  if (ret=="success") {
    //将前台保存手机号换为最新版
    //$api.setStorage('key', 'value');
     api.openWin({
        name: 'main',
        url: 'Person_set.html',
     });
  } else {
      alert("失败");
      api.alert({ msg: JSON.stringify(err) });
  }
 });
}

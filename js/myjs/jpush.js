$(function(){
  //两个监听事件
  api.addEventListener({
     name : 'pause'
  }, function(ret, err) {
     onPause();
     //监听应用进入后台，通知jpush暂停事件
  });
  api.addEventListener({
     name : 'resume'
  }, function(ret, err) {
     onResume();
    //监听应用恢复到前台，通知jpush恢复事件
  });

  var ajpush = api.require('ajpush');

  //初始化
  ajpush.init(function(ret) {
      if (ret && ret.status){
          //success
          alert("初始化成功！");
      }
  });
  //设置监听
  ajpush.setListener(
      function(ret) {
           var id = ret.id;
           var title = ret.title;
           var content = ret.content;
           var extra = ret.extra;
      }
  );

})

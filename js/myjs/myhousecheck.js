 function goChecking(){
//api.closeWin({
//});
    api.openWin({
	    name:'checking',
	    url: 'myhouse-checking-Win.html'
    });
	
}
function goPast(){
//	  api.closeWin({
//  });
    api.openWin({
	   name:'past',
	    url: 'myhouse-past-Win.html'
    });
}
function goNow(){
//	  api.closeWin({
//  });
    api.openWin({
	   name:'now',
	    url: 'myhouse-now-Win.html'
    });
}
	 function goDown(id){
	 	api.confirm({
	 		title: '提示',
        	msg: '您确定要下架吗？',
        	buttons: ['确定', '取消']

         },function(ret,err){
         	if(ret.buttonIndex==1){
         		api.ajax({
        		url: 'http://123.58.253.71:8808/FHMYSQL/houseList/downAll',
        		method: 'get',
        		async:true,
        		dataType:'text',
       			data: {
            		values: {
               			ids:id
            		}
          		}
    		},function(ret, err) {
        		if (ret) {
            		alert("下架成功！");
            		window.location.reload();
            		
        		} else {
            		alert("请求出错，请返回重试！");
        		}
    		});
         	
         	
         	
         	} else {
            		alert(JSON.stringify(err));
        		}
         });
	  	
    }
     function goUp(){
     		var str = '';
			for(var i=0;i < document.getElementsByName('ids').length;i++)
			{
				  if(document.getElementsByName('ids')[i].checked){
				  	if(str=='') str += document.getElementsByName('ids')[i].value;
				  	else str += ',' + document.getElementsByName('ids')[i].value;
				  }
			}
			if(str==''){
				alert("您没有选中任何数据");
				return ;
			}
			
			
			    api.confirm({
        			title: '提示',
        			msg: '您确定要发布吗？',
        			buttons: ['确定', '取消']
    			}, function(ret, err) {
        			if (ret) {	
        				if(ret.buttonIndex==1){
        					
					
				api.ajax({
					url : 'http://123.58.253.71:8808/FHMYSQL/houseList/upAll',
					method : 'get',
					async : true,
					dataType : 'text',
					data : {
						values : {
							ids : str
						}
					}
				}, function(ret, err) {
					if (ret) {
						alert("发布成功！");
						window.location.reload();

					} else {
						alert("请求出错，请返回重试！");
					}
				});


            		}


        		} else {
            		alert(JSON.stringify(err));
        		}
    		});
			
			
			
			
			
			
			
     	
     }
     function goDelete(){
     	var str = '';
			for(var i=0;i < document.getElementsByName('ids').length;i++)
			{
				  if(document.getElementsByName('ids')[i].checked){
				  	if(str=='') str += document.getElementsByName('ids')[i].value;
				  	else str += ',' + document.getElementsByName('ids')[i].value;
				  }
			}
			if(str==''){
				alert("您没有选中任何数据");
				return ;
			}
			api.confirm({
				title: '提示',
        		msg: '您确定要删除吗？',
        		buttons: ['确定', '取消']
				
            },function(ret,err){
            	if(ret.buttonIndex==1){
            	
			api.ajax({
				url : 'http://123.58.253.71:8808/FHMYSQL/houseList/deleteAll',
				method : 'get',
				async : true,
				dataType : 'text',
				data : {
					values : {
						ids : str
					}
				}
			}, function(ret, err) {
				if (ret) {
					alert("删除成功！");
					window.location.reload();

				} else {
					alert("请求出错，请返回重试！");
				}
			}); 
         	
            	}
            });
	
     }
          function goCancle(){
     	var str = '';
			for(var i=0;i < document.getElementsByName('ids').length;i++)
			{
				  if(document.getElementsByName('ids')[i].checked){
				  	if(str=='') str += document.getElementsByName('ids')[i].value;
				  	else str += ',' + document.getElementsByName('ids')[i].value;
				  }
			}
			if(str==''){
				alert("您没有选中任何数据");
				return ;
			}
			api.confirm({
				title: '提示',
        		msg: '您确定要取消吗？',
        		buttons: ['确定', '取消']
				
            },function(ret,err){
            	if(ret.buttonIndex==1){
            	
			api.ajax({
				url : 'http://123.58.253.71:8808/FHMYSQL/houseList/deleteAll',
				method : 'get',
				async : true,
				dataType : 'text',
				data : {
					values : {
						ids : str
					}
				}
			}, function(ret, err) {
				if (ret) {
					alert("取消成功！");
					window.location.reload();

				} else {
					alert("请求出错，请返回重试！");
				}
			}); 
         	
            	}
            });
	
     }
    
    
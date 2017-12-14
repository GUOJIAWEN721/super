function check(){
		var name=$.trim($('#login').val());
		var password=$.trim($('#password').val());
		if(''==name){
			api.toast({
            	msg:'请填写用户名！'
        	});
        	return false;
		}
		if(''==password){
			api.toast({
            	msg:'请填写密码！'
        	});
        	return false;
		}
		var code = "qq313596790fh"+name+",fh,"+password+"QQ978336446fh";
					api.ajax({				
	                    //url:'http://123.58.253.71:8808/FHMYSQL/login_login',	 192.168.3.20   http:192.168.43.203
	                    url:'http://123.58.253.71:8808/FHMYSQL/login_login',                  
	                    method: 'post', 
	            
	                    dataType:'json',	             
	                    async:true,
	                    data: {
        					values: {
        					    KEYDATA:code,
        					    tm:new Date().getTime()		
                            }
                        }  
                    },function(ret,err){
                    	if(ret){
                    	
                    		 if('-1'!=ret.userId){
                     			$api.setStorage('userInfo', ret); 
                                api.openSlidLayout({
        							type: 'right',   
        							fixedPane: {
            							name: 'fixed',
            							url: 'slid.html'
        							},
        							slidPane: {
            							name: 'slide',
            							url: 'input_jibenxinxi.html'
        							}
    							}, function (ret) {
        							
    							}); 

                    		}else{
                    			api.toast({
            						msg:'用户名或密码错误！'
        						});
                    			document.getElementById("login").value='';
                                document.getElementById("password").value=''; 
                    		}		
                    		
                       }else{
        					alert(JSON.stringify(err));
        	           }
                    });  		
}
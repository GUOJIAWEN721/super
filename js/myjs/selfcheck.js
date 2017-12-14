       function checks(){
        	if(''==$.trim($('#name').val())){
        		api.toast({
            		msg:'请填写姓名！'
        		});
        		return false;
        	}
        	if(''==$.trim($('#phone').val())){
        		api.toast({
            		msg:'请填写手机号！'
        		});
        		return false;
        	}
        	if(''==$.trim($('#WeChat').val())){
        		api.toast({
            		msg:'请填写微信号！'
        		});
        		return false;
        	}
        	
        	if(''==$.trim($('#company').val())){
        		api.toast({
            		msg:'请填写公司！'
        		});
        		return false;
        	}
        	if(''==$.trim($('#store').val())){
        		api.toast({
            		msg:'请填写门店！'
        		});
        		return false;
        	}
        	if(''==$.trim($('#position').val())){
        		api.toast({
            		msg:'请填写职位！'
        		});
        		return false;
        	}
        	if(''==$.trim($('#IDCard').val())){
        		api.toast({
            		msg:'请填写身份证号！'
        		});
        		return false;
        	}
        	if(''==$.trim($('#workhours').val())){
        		api.toast({
            		msg:'请填写从业时间！'
        		});
        		return false;
        	}
        	var regs=/^[0-9]+[0-9]*]*$/;
        	
        	if(!regs.test($.trim($('#workhours').val()))){
        		api.toast({
            		msg:'从业时间格式不正确！'
        		});
        		return false;
        	}
        	
        	
        	if(''==$.trim($('#imagesAddress').val())){
        		api.toast({
            		msg:'请至少上传一张证件照！'
        		});
        		return false;
        	}
        	
//        	var name=$.trim($('#name').val());
//			var phone=$.trim($('#phone').val());
//			var WeChat=$.trim($('#WeChat').val());
//			var company=$.trim($('#company').val());
//			var store=$.trim($('#store').val());
//			var position=$.trim($('#position').val());
//			var IDCard=$.trim($('#IDCard').val());
//			var workhours=$.trim($('#workhours').val());
//			if(name==''||phone==''||WeChat==''||company==''||store==''||position==''||position==''||IDCard==''||workhours==''){
//				alert("请将信息输入完整");
//				return false;
//			}
        	 var values={};
             var x=$("#form_selfmessage").serializeArray();
              values["userId"]=$api.getStorage("userInfo").userId;
             $.each(x, function(i, field){
             	var key=field.name;
                values[key]=field.value;
             });           
			 api.ajax({
	        //url:'http://192.168.3.20:8080/FHMYSQL/selfmsg/addSelfphoto',123.58.253.71:8808/FHMYSQL
	        	url:'http://123.58.253.71:8808/FHMYSQL/selfmsg/addSelfMessage',
	        	method:'post',
	        	async:true,
	        	dataType:'text',
	        	data:{
	        		 userId:$api.getStorage("userInfo").userId,
	        		values:values  		
	       		 }
        	},function(ret,err){       	
        		if(ret){
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
        			alert(JSON.stringify(err));
        		}
        	});
        }
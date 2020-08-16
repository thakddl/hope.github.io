var Member = function()
{
	/* 처리 페이지 주소 */
	if(GNB_PROCESS == null || GNB_PROCESS == undefined) {
		var GNB_PROCESS = "/cri";
	}
	var process = GNB_PROCESS + "/process/member/member_manager.php";
	if(_GLB_POSITION == 'admin'){
		var returnPage = GNB_PROCESS + "/index.php";		// 로그인후 이동할 페이지 주소
	}else{
		var returnPage = "/";		// 로그인후 이동할 페이지 주소
	}

	return {
		login : function(frm,prelogin)
		{

			if(!chkInputType(frm,'id','아이디를',0,'')) return false;
			if(!chkInputType(frm,'pwd','비밀번호를',0,'')) return false;
			var param = $(frm).serialize();
			var rPage = $("#returnURL").val();
			if(rPage == undefined){
				if(returnPage == "") returnPage = "/";
				rPage = returnPage;
			}else{
				if(rPage == "") rPage = "/";
			}
			$.ajax({
				type: "POST",
				url: process,
				dataType:"json",
				data:param + "&memMode=login&relogin=" + prelogin,
				success:function(data){
					if(data.result == 'not'){
						alert('입력하신 정보가 일치하지 않습니다.');
					}else if(data.result == 'ok'){
						window.document.location.replace(rPage);
						return;
					}else if(data.result == 'relogin'){
						if(confirm('입력하신 아이디가 이미 로그인 되어 있습니다.\r\n강제로 로그인시 접속되어 있는 곳에서는 로그아웃 됩니다.\r\n로그인 하시겠습니까?')){
							Member.login(frm,'y');
						}
					}
				},
				error:function(xhr){
					alert('처리중 오류가 발생했습니다.');
					return false;
				}
			});
			return false;
		},
		logout : function(){
			if(confirm('로그아웃 하시겠습니까?')){
				$.ajax({
					type: "POST",
					url: process,
					dataType:"json",
					data:"memMode=logout",
					success:function(data){
						window.document.location.href = returnPage;
					},
					error:function(xhr){			
						alert('처리중 오류가 발생했습니다.');
						return false;
					}
				});		
				return ;
			}
		},
        chk_id : function(){
			var id = $("#id").val();
			if(id == ""){
				alert('아이디를 입력해주세요.');
                $("#id").focus();
				return;
			}
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"memMode=chk_id&id=" + id,
                success:function(data){
					var result = data.result;
					if(result == 'yes'){
						alert('해당 아이디는 이미 사용중입니다.');
                        $("#chk_id").val('n');
                        $("#id").focus();
                        $("#id").select();

						return;
					}else if(result == 'no'){
                        alert('해당 아이디는 사용가능합니다.');
						$("#chk_id").val('y');
                        $("#id").attr("readOnly",true);
                        return;
                    }else if(result == 'none'){
                        alert('아이디를 입력해주세요.');
                        return;
                    }
                },
                error:function(xhr){
                    alert('처리중 오류가 발생했습니다.');
                    return false;
                }
            });
        },
        chk_nickname : function(){
            var nickname = $("#nickname").val();
            if(nickname == ""){
                alert('닉네임을 입력해주세요.');
                $("#nickname").focus();
                return;
            }
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"memMode=chk_nickname&nickname=" + nickname,
                success:function(data){
                    var result = data.result;
                    if(result == 'yes'){
                        alert('해당 닉네임은 이미 사용중입니다.');
                        $("#chk_nickname").val('n');
                        $("#nickname").focus();
                        $("#nickname").select();

                        return;
                    }else if(result == 'no'){
                        alert('해당 닉네임은 사용가능합니다.');
                        $("#chk_nickname").val('y');
                        $("#nickname").attr("readOnly",true);
                        return;
                    }else if(result == 'none'){
                        alert('닉네임을 입력해주세요.');
                        return;
                    }
                },
                error:function(xhr){
                    alert('처리중 오류가 발생했습니다.');
                    return false;
                }
            });
        },
        sameInfo : function(checked){
            if(checked){
                $("#manager").val($("#name").val());
                $("#mng_tel1").val($("#hp1").val());
                $("#mng_tel2").val($("#hp2").val());
                $("#mng_tel3").val($("#hp3").val());
            }else{
                $("#manager").val("");
                $("#mng_tel1").val("");
                $("#mng_tel2").val("");
                $("#mng_tel3").val("");
            }
        },
        reg: function(){
            var frm = document._zzWriteF;
            if(!chkInputType(frm,'id','아이디를',0,'')) return ;
            if(!chkInputType(frm,'pwd','비밀번호를',0,'')) return ;
            if(!chkInputType(frm,'name','이름을',0,'')) return ;
            if(confirm('가입 하시겠습니까?')){
                var param = $("#_zzWriteF").serialize();

                $.ajax({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    data:"memMode=register_com&" + param,
                    success:function(data){
                        var result = data.result;
                        var rurl = data.returnURL;
                        if(result == 'ok'){
                            alert('정상적으로 등록되었습니다.');
                            window.document.location.replace(rurl);
                        }else{
                            alert('처리중 오류가 발생했습니다.');
                            return;
                        }
                    },
                    error:function(xhr){
                        alert('처리중 오류가 발생했습니다.');
                        return false;
                    }
                });
            }
        },
		join : function(){
			var frm = document._memFrm;
            var obj = document.getElementsByName("u_city[]");

            /*
            if($("#id").val() == ''){

                alert('아이디를 입력해주세요');
                $("#id").focus();
            }
            */
            if(!chkInputType(frm,'id','아이디를',0,'')) return ;
            if(!chkInputType(frm,'pwd','비밀번호를',0,'')) return ;
            if(!chkInputType(frm,'pwd_ok','비밀번호 확인란을',0,'')) return ;

            if(!chkInputType(frm,'name','이름을',0,'')) return ;
            if(!chkInputType(frm,'hp1','휴대폰번호를',1,'')) return ;
            if(!chkInputType(frm,'hp2','휴대폰번호를',0,'')) return ;
            if(!chkInputType(frm,'hp3','휴대폰번호를',0,'')) return ;

            if(!chkInputType(frm,'b_year','생년월일(년)을',1,'')) return ;
            if(!chkInputType(frm,'b_month','생년월일(월)을',0,'')) return ;
            if(!chkInputType(frm,'b_day','생년월일(일)을',0,'')) return ;
            if(!chkInputType(frm,'sex','성별을',1,'rdo')) return ;

            if($("#member_type").val() == '1'){
                if(obj.length == 0){
                    alert('활동가능지역을 선택하세요.');
                    return;
                }
            }

			if(frm.pwd.value != frm.pwd_ok.value){
				alert('비밀번호가 일치하지 않습니다.');
				frm.pwd_ok.focus();
				return;
			}
            if(frm.chk_id.value != "y"){
				alert('아이디 중복확인을 확인해주세요.');
				return;
			}
            if(!frm.agree.checked){
                alert('이용약관에 동의하셔야 가입이 가능합니다.');
                frm.agree.focus();
                return;
            }
            if(!frm.privacy.checked){
                alert('개인보호 취급방침에 동의하셔야 가입이 가능합니다.');
                frm.privacy.focus();
                return;
            }

			if(confirm('가입 하시겠습니까?')){

                var param = $("#_memFrm").serialize();
                $("#memMode").val('register');
                //$.ajax({
                $("#_memFrm").ajaxForm({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    beforeSubmit:function(data,frm,opt){
                        return true;
                    },
                    success:function(data,status){
                        var result = data.result;
                        if(result == 'ok'){
                            window.document.location.replace("/join_complete.php");
                        }else{
                            alert('처리중 오류가 발생했습니다.');
                            return;
                        }
                    },
                    error:function(xhr){
                        alert('처리중 오류가 발생했습니다.');
                        return false;
                    }
                }).submit();
			}
		}
	}	
}();

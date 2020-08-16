var VisitBoard = function()
{
    /* 처리 페이지 주소 */
    if(GNB_PROCESS == null || GNB_PROCESS == undefined) {
        var GNB_PROCESS = "/cri";
    }
    var process = GNB_PROCESS + "/process/weddingboard/board_manager.php";
    if(_GLB_POSITION == 'admin'){
        var returnPage = GNB_PROCESS + "/index.php";		// 로그인후 이동할 페이지 주소
    }else{
        var returnPage = "/";		// 로그인후 이동할 페이지 주소
    }

    var chkId = false;
	var refCode = "";
	var refPage = 1;
	var cPage = 1;
    return {
        delPrev: function(code){
            if(code == '') return;
            if(confirm('해당 데이터를 삭제 하시겠습니까?')){
                var param = "code=" + code;

                $.ajax({
                    type: "POST",
                    url: process,
                    dataType:"json",
                    data:"mode=del&" + param,
                    success:function(data){
                        var result = data.result;
                        var rurl = data.returnURL;
                        if(result == 'ok'){
                            alert('정상적으로 삭제 되었습니다.');
                            window.document.location.reload();
                        }else if(result == 'not'){
                            alert('비밀번호가 일치하지 않습니다.');
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
       
        reg: function(){
            var frm = document._zzWriteF;
            var mode = $("#mode").val();
            var mcode = $("#mcode").val();

            if(!chkInputType(frm,'name','이름을',0,'')) return ;
						if(!chkInputType(frm,'pwd','비밀번호를',0,'')) return ;
            if(!chkInputType(frm,'memo','내용을',0,'')) return ;


            if(mode == 'reg') msg = '등록';
            else if(mode == 'mod') msg = '수정';
            if(confirm(msg + ' 하시겠습니까?')){
            var param = $("#_zzWriteF").serialize();

            $("#_zzWriteF").ajaxForm({
                type: "POST",
                url: process,
                dataType:"json",
                beforeSubmit:function(data,frm,opt){
                    return true;
                },
                success:function(data,status){
                    var result = data.result;
                    if(result == 'ok'){
                        var index = data.index;
                        VisitBoard.callList(0,mcode);
                    }else{
                        alert('처리중 오류가 발생했습니다.');
                        return;
                    }

										frm.reset();
                },
                error:function(xhr){
                    alert('처리중 오류가 발생했습니다.');
                    return false;
                }
            }).submit();
            }
        },
				viewDel: function(code){
					if(code == '') return;
					$("#pwd_btn" + code).hide();
					$("#pwd_div" + code).show();					
				},
				delCancel: function(code){
					if(code == '') return;
					$("#pwd_btn" + code).show();
					$("#pwd_div" + code).hide();					
				},
				del: function(code){
					if(code == '') return;
					if($("#pwd" + code).val() == ""){
						alert('비밀번호를 입력해주세요.');
						$("#pwd" + code).focus();
						return;
					}
					if(confirm('해당 데이터를 삭제하시겠습니까.?')){
						var param = "code=" + code + "&pwd=" + $("#pwd" + code).val();
						$.ajax({
								type: "POST",
								url: process,
								dataType:"json",
								data:"mode=del&" + param,
								success:function(data){
										var result = data.result;
										var rurl = data.returnURL;
										if(result == 'ok'){
											VisitBoard.callList(refPage,refCode);
										}else if(result == 'not_pwd'){
											alert('비밀번호가 일치하지 않습니다.');
										}else{
											
										}
								},
								error:function(xhr){
										alert('처리중 오류가 발생했습니다.');
										return false;
								}
						});
						//$("#list_visit_div" + code).remove();
					}
				},
				admin_del: function(code){
					if(code == '') return;
					if(confirm('해당 데이터를 삭제하시겠습니까.?')){
						var param = "code=" + code;
						$.ajax({
								type: "POST",
								url: process,
								dataType:"json",
								data:"mode=admin_del&" + param,
								success:function(data){
										var result = data.result;
										var rurl = data.returnURL;
										if(result == 'ok'){
											alert('정상적으로 삭제되었습니다.');
											window.document.location.reload();
										}else if(result == 'not_pwd'){
											alert('비밀번호가 일치하지 않습니다.');
										}else{
											
										}
								},
								error:function(xhr){
										alert('처리중 오류가 발생했습니다.');
										return false;
								}
						});
						//$("#list_visit_div" + code).remove();
					}
				},
				search: function(param){
            var skey = $("#skey").val();
            var sword = $("#sword").val();
            window.document.location.replace("/cri/_card/index.php?_pd=comment&_pg=index&skey=" + skey + "&sword=" + sword);
        },
		callCommentMore: function(ref_code){
			cPage++;
			var param = "ref_code=" + ref_code + "&page=" + cPage;
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"mode=call_list&" + param,
                success:function(data){
                    var result = data.result;
                    if(result == 'ok'){
                        var list = data.list;
                        var num = data.num;
                        var HTML = '';
	
                        if(num > 0){
                            for(i = 0; i < num; i++){
                                var code = list[i].code;
                                var name = list[i].name;
                                var memo = list[i].memo;
                                var register_day = list[i].register_day;
                                var join_yn = list[i].join_yn;
                                HTML += "<div class='list-data' id='list_visit_div" + code + "'>";
                                HTML += "<div style='padding:10px;'><span style='font-weight:bold;'>" + name + "</span> <span style='font-weight:bold;'>" + join_yn + "</span> <span style='float:right'>" + register_day + "</span></div>";
                                HTML += "<div style='padding:10px;font-size:1.8em;'>" + memo + "</div>";
                                HTML += "<div style='padding:10px;'>";
                                HTML += "<span style='padding:10px;display:none;' id='pwd_div" + code + "'><span style='margin-top:3px'>비밀번호 </span><span><input type='password' name='pwd" + code + "' id='pwd" + code + "' style='font-size:1em;width:30%;border:1px solid #DEDEDE;height:40px;margin-top:-3px;'></span> ";
                                HTML += "<a href=\"javascript:VisitBoard.del('" + code + "');\"><span style='background:purple;color:#FFFFFF;padding:2px 10px;'>확인</span></a> ";
                                HTML += "<a href=\"javascript:VisitBoard.delCancel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;'>취소</span></span></a>";
                                HTML += "<span style='float:right;' id='pwd_btn" + code + "'><a href=\"javascript:VisitBoard.viewDel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;font-size:.9em;'>삭제</span></a></span></div>";
                                HTML += "</div>";
                            }
                        }else{
							alert('더이상 데이터가 없습니다.');
						}

						preHTML = $("#visit_item_list").html();
                        $("#visit_item_list").html(preHTML + HTML);
                    }
                },
                error:function(xhr){
                    alert('처리중 오류가 발생했습니다.');
                    return false;
                }
            });
		},
        callList: function(flag,ref_code){
			refCode = ref_code;
			
			if(flag == 0){
                page = 1;
            }
			refPage = page;
            var param = "ref_code=" + ref_code + "&page=" + page;
            $.ajax({
                type: "POST",
                url: process,
                dataType:"json",
                data:"mode=call_list&" + param,
                success:function(data){
                    var result = data.result;
                    if(result == 'ok'){
                        var list = data.list;
                        var num = data.num;
                        var HTML = '';

                        if(num > 0){
                            for(i = 0; i < num; i++){
                                var code = list[i].code;
                                var name = list[i].name;
                                var memo = list[i].memo;
                                var register_day = list[i].register_day;
                                var join_yn = list[i].join_yn;
                                HTML += "<div class='list-data' id='list_visit_div" + code + "'>";
                                HTML += "<div style='padding:10px;'><span style='font-weight:bold;'>" + name + "</span> <span style='font-weight:bold;'>" + join_yn + "</span> <span style='float:right'>" + register_day + "</span></div>";
                                HTML += "<div style='padding:10px;font-size:1.8em;'>" + memo + "</div>";
                                HTML += "<div style='padding:10px;'>";
                                HTML += "<span style='padding:10px;display:none;' id='pwd_div" + code + "'><span style='margin-top:3px'>비밀번호 </span><span><input type='password' name='pwd" + code + "' id='pwd" + code + "' style='font-size:1em;width:30%;border:1px solid #DEDEDE;height:40px;margin-top:-3px;'></span> ";
                                HTML += "<a href=\"javascript:VisitBoard.del('" + code + "');\"><span style='background:purple;color:#FFFFFF;padding:2px 10px;'>확인</span></a> ";
                                HTML += "<a href=\"javascript:VisitBoard.delCancel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;'>취소</span></span></a>";
                                HTML += "<span style='float:right;' id='pwd_btn" + code + "'><a href=\"javascript:VisitBoard.viewDel('" + code + "');\"><span style='background:#DEDEDE;color:#666666;padding:2px 10px;font-size:.9em;'>삭제</span></a></span></div>";
                                HTML += "</div>";
                            }
                        }


                        $("#visit_item_list").html(HTML);
                    }
                },
                error:function(xhr){
                    alert('처리중 오류가 발생했습니다.');
                    return false;
                }
            });
        }
    }
}();


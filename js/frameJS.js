/**
 * Created by CainSummer on 2017/5/24.
 */





window.onload = function () {
    let url = location.href;
    let tmp1=url.split("?")[1];
    let tmp2=tmp1.split("&")[0];
    let tmp3=tmp2.split("=")[1];
    let account=tmp3;


    //显示使用人员
    $(function () {
        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            data: JSON.stringify(account),
            success: function (res) {
                let perosn2 = res.data;
                $(".person").text(perosn2.userName);
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236

=======
>>>>>>> fixedBy YuFan
            },
            error: function () {
                console.log(false);
                return false;
            }
        });

    });


    $(function () {
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236
        $(".person").click(function () {
            $(".personNav").slideToggle(1);
=======
        $(".person").mouseenter(function () {
            $(".personNav").slideDown(1);
        });

        $(".personNav ").mouseleave(function () {
            $(".personNav").slideUp(1);
>>>>>>> fixedBy YuFan
        })
    });


    $(function () {

        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            data: JSON.stringify(account),
            success: function (res) {
                let perosn2 = res.data;
                $(".person").text(perosn2.userName);
                if(res.data.userLevel == "系统管理员"){
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236
                    $(".personNav").append(

                      '<div class="personChoice">' + "个人信息"+'</div>'
                        +'<div class="personChoice">'+"更改人员"+'</div>'
                      +'<div class="personChoice">'+"更改影厅"+'</div>'
                      +'<div class="personChoice">'+"查看售票"+'</div>'
                    );
                    $(".bodyDiv").append(
                        '<div class="personMessage">'
                        +'<form>' +
                        '<label>id(不可修改):</label>'+'<br/>'+'<input type="text">'+'<br/>'

                   + '<label>姓名(不可修改):</label>'+'<br/>'+'<input type="text" >'+'<br/>'
                        +'<label>账号(不可修改):</label>'+'<br/>'+'<input type="text">'+'<br/>'
                        +'<label>密码:</label>'+'<br/>'+'<input type="text">'+'<br/>'
                        +'<label>职位:</label>'+'<br/>'+'<input type="text">'+'<br/>'
                        +'<label>电话:</label>'+'<br/>'+'<input type="text">'+'<br/>'
                        +'<label>性别(不可修改):</label>'+'<br/>'+'<input type="text">'+'<br/>'
                        +'</form>'+

                         '<button onclick="upDateUser()">确定修改</button>'   +
                        '</div>'
                    );

                    $("input").eq(0).attr("value",res.data.userId);
                    $("input").eq(0).attr("placeholder",res.data.userId);
                    $("input").eq(1).attr("placeholder",res.data.userName);
                    $("input").eq(2).attr("placeholder",res.data.userAccount);
                    $("input").eq(3).attr("placeholder",res.data.userPassword);
                    $("input").eq(4).attr("placeholder",res.data.userLevel);
                    $("input").eq(5).attr("placeholder",res.data.userTel);
                    $("input").eq(6).attr("placeholder",res.data.userSex);

                    $(".personChoice").eq(0).click(function () {

                        let d = $("#hideDiv").css("display");
                        if (d == "none") {
                            $("#hideDiv").css("display", "block");
                            $(".personMessage").css("display", "block");
                        }
                    });
=======
                    bodyAppendPersonMessage(res);       //添加系统管理员的个人信息
                    toolNavAppend(res);


>>>>>>> fixedBy YuFan
                }
            },
            error: function () {
                console.log(false);
                return false;
            }
        });

    });

    $(function () {
        $("#hideDiv").click(function () {
            $("#hideDiv").css("display", "none");
            $(".personMessage").css("display", "none");
        })
    });


    $(function () {
        $(".bodyDiv").click(function () {
            $(".personNav").css("display","none");
        })
    })
};

function upDateUser() {
    let $form = $("input");
    let id = $form.eq(0).val();
    let passWord =  $form.eq(3).val();
    let level = $form.eq(4).val();
    let tel = $form.eq(5).val();
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236


=======
>>>>>>> fixedBy YuFan
    $.ajax({
        url: "http://api.ksgin.online/User/UpdateUserPassword",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                "id": id,
                "passWord":passWord
            }
        ),
        success: function (res) {
            console.log(res.msg);

        },
        error: function () {
            console.log(false);
            return false;
        }
    })

    $.ajax({
        url: "http://api.ksgin.online/User/UpdateUserLevel",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(
            {
                "id": id,
                "level":level
            }
        ),
        success: function (res) {
            console.log(res.msg);
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236

=======
            alert("修改成功");
>>>>>>> fixedBy YuFan
        },
        error: function () {
            console.log(false);
            return false;
        }
    })
}
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236
=======

function bodyAppendPersonMessage(res) {
    $(".personNav").append(

        '<div class="personChoice">' + "个人信息"+'</div>'
        +'<div class="personChoice">'+"签到记录"+'</div>'
        +'<div class="personChoice">'+"信箱"+'</div>'
        +'<div class="personChoice">'+"系统通知"+'</div>'
    );

    $(".messageBody").append(
        '<div class="personMessage">'
        +'<form>' +
        '<label>id(不可修改):</label>'+'<br/>'+'<input type="text">'+'<br/>'

        + '<label>姓名(不可修改):</label>'+'<br/>'+'<input type="text" >'+'<br/>'
        +'<label>账号(不可修改):</label>'+'<br/>'+'<input type="text">'+'<br/>'
        +'<label>密码:</label>'+'<br/>'+'<input type="text">'+'<br/>'
        +'<label>职位:</label>'+'<br/>'+'<input type="text">'+'<br/>'
        +'<label>电话:</label>'+'<br/>'+'<input type="text">'+'<br/>'
        +'<label>性别(不可修改):</label>'+'<br/>'+'<input type="text">'+'<br/>'
        +'</form>'+

        '<button onclick="upDateUser()">确定修改</button>'   +
        '</div>'
    );

    $("input").eq(0).attr("value",res.data.userId);
    $("input").eq(0).attr("placeholder",res.data.userId);
    $("input").eq(1).attr("placeholder",res.data.userName);
    $("input").eq(2).attr("placeholder",res.data.userAccount);
    $("input").eq(3).attr("placeholder",res.data.userPassword);
    $("input").eq(4).attr("placeholder",res.data.userLevel);
    $("input").eq(5).attr("placeholder",res.data.userTel);
    $("input").eq(6).attr("placeholder",res.data.userSex);

    $("input").eq(0).attr("disabled",true);
    $("input").eq(1).attr("disabled",true);
    $("input").eq(2).attr("disabled",true);
    $("input").eq(6).attr("disabled",true);
    $("input").eq(4).attr("disabled",true);

    $(".personChoice").eq(0).click(function () {
        queryUsers();
        $(".personMessage").css("display", "block");
    });
}

function toolNavAppend(res) {
    $(".toolNav").append(

        '<div class="toolChild">' + "添加员工"+'</div>'
        +'<div class="toolChild">'+"查询员工"+'</div>'
        +'<div class="toolChild">'+"添加影厅"+'</div>'
        +'<div class="toolChild">'+"删除影厅"+'</div>'
    );

    $(".toolNav").children().eq(0).css({
        "border-top-left-radius":"10px",
        "border-top-right-radius":"10px"
    });

    $(".toolNav").children().eq(3).css({
       "border-bottom-left-radius":"10px",
        "border-bottom-right-radius":"10px"
    });


    for(let i = 0;i<4;i++){
        $(".messageBody").append(
            '<div class="choiceBody">'+i+'</div>'
        )
    }


    for(let i =0;i<4;i++){
            $(".toolNav").children().eq(i).click(function () {
                queryUsers();
                $(".choiceBody").eq(i).css("display","block");
            });

    }

}

function queryUsers() {
    $(".messageBody").children().css("display","none");

}
>>>>>>> fixedBy YuFan

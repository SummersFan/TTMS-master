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

            },
            error: function () {
                console.log(false);
                return false;
            }
        });

    });


    $(function () {
        $(".person").click(function () {
            $(".personNav").slideToggle(1);
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

        },
        error: function () {
            console.log(false);
            return false;
        }
    })
}

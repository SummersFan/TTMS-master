/**
 * Created by CainSummer on 2017/5/24.
 */





window.onload = function () {
    let url = location.href;
    let tmp1 = url.split("?")[1];
    let tmp2 = tmp1.split("&")[0];
    let tmp3 = tmp2.split("=")[1];
    let account = tmp3;


    //显示使用人员
    $(function () {
        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            data: JSON.stringify(account),
            xhrFields: {withCredentials: true},
            success: function (res) {
                let person2 = res.data;
                $(".person").text(person2.userName);
            },
            error: function () {
                console.log(false);
                return false;
            }
        });
    });


    $(function () {
        $(".person").mouseenter(function () {
            $(".personNav").slideDown(1);
        });

        $(".personNav ").mouseleave(function () {
            $(".personNav").slideUp(1);
        })
    });


    $(function () {

        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            xhrFields: {withCredentials: true},
            data: JSON.stringify(account),
            success: function (res) {
                let perosn2 = res.data;
                $(".person").text(perosn2.userName);
                if (res.data.userLevel == "系统管理员") {
                    bodyAppendPersonMessage(res);       //添加系统管理员的个人信息
                    toolNavAppend(res);


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
            $(".personNav").css("display", "none");
        })
    })
};


//修改个人信息
function upDateUser() {
    let $form = $("input");
    let id = $form.eq(0).val();
    let passWord = $form.eq(7).val();
    let level = $form.eq(6).val();
    let tel = $form.eq(8).val();
    $.ajax({
        url: "http://api.ksgin.online/User/UpdateUserPassword",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        data: JSON.stringify(
            {
                "id": id,
                "passWord": passWord
            }
        ),
        success: function (res) {
            console.log(res.msg);
        },
        error: function () {
            console.log(false);
            return false;
        }
    });

    $.ajax({
        url: "http://api.ksgin.online/User/UpdateUserLevel",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        data: JSON.stringify(
            {
                "id": id,
                "level": level
            }
        ),
        success: function (res) {
            console.log(res.msg);
            alert("修改成功");
        },
        error: function () {
            console.log(false);
            return false;
        }
    });

    $.ajax({
        url: "http://api.ksgin.online/User/UpdateUserTel",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        data: JSON.stringify(
            {
                "id": id,
                "tel": tel
            }
        ),
        success: function (res) {
            console.log(tel);
        },
        error: function () {
            console.log(false);
            return false;
        }
    })
}


function bodyAppendPersonMessage(res) {
    $(".personNav").append(
        '<div class="personChoice">' + "个人信息" + '</div>'
        + '<div class="personChoice">' + "签到记录" + '</div>'
        + '<div class="personChoice">' + "信箱" + '</div>'
        + '<div class="personChoice">' + "系统通知" + '</div>'
    );

    $(".messageBody").append(
        '<div class="personMessage">'
        + '<div class="personMessageTitle">'
        + '<span class="span-titA"></span>'
        + '<span class="span-titB">我的信息</span>'
        + '</div>'

        + '<div class="personMessageBody">'

        + '<div class="personMessageLeft">'
        + '<div>'
        + '<p>id:</p>' + '<input type="text">' + '<br/>'
        + '</div>'

        + '<div>'
        + '<p>工作账号:</p>' + '<input type="text" >' + '<br/>'
        + '</div>'

        + '<div>'
        + '<p>性别:</p>' + '<input type="text">' + '<br/>'
        + '</div>'

        + '<div>'
        + '<p>创建时间:</p>' + '<input type="text">' + '<br/>'
        + '</div>'

        + '<div>'
        + '<p>上次登录:</p>' + '<input type="text">' + '<br/>'
        + '</div>'
        + '</div>'


        + '<div class="personMessageRight">'

        + '<div>'
        + '<p>用户名:</p>' + '<input type="text">' + '<br/>'
        + '</div>'

        + '<div>'
        + '<p>工作职位:</p>' + '<input type="text">' + '<br/>'
        + '</div>'


        + '<div>'
        + '<p>密码:</p>' + '<input type="text">' + '<br/>'
        + '</div>'

        + '<div>'
        + '<p>电话:</p>' + '<input type="text">' + '<br/>'
        + '</div>'

        + '</div>'
        + '</div>'

        + '<button onclick="upDateUser()">确定修改</button>'
        + '</div>'
    );

    $("input").eq(0).attr("value", res.data.userId);
    $("input").eq(1).attr("value", res.data.userAccount);
    $("input").eq(2).attr("value", res.data.userSex);
    $("input").eq(3).attr("value", res.data.userCreateTime);
    $("input").eq(4).attr("value", res.data.userLastSignInTime);
    $("input").eq(5).attr("value", res.data.userName);
    $("input").eq(6).attr("value", res.data.userLevel);
    $("input").eq(7).attr("value", res.data.userPassword);
    $("input").eq(8).attr("value", res.data.userTel);

    $("input").eq(0).attr("disabled", true);
    $("input").eq(1).attr("disabled", true);
    $("input").eq(2).attr("disabled", true);
    $("input").eq(3).attr("disabled", true);
    $("input").eq(4).attr("disabled", true);
    $("input").eq(5).attr("disabled", true);
    $("input").eq(6).attr("disabled", true);


    $(".personChoice").eq(0).click(function () {
        queryUsers(0);
        $(".personMessage").css("display", "block");
    });
}


function toolNavAppend(res) {
    $(".toolNav").append(
        '<div class="toolChild">' + "添加员工" + '</div>'
        + '<div class="toolChild">' + "查询员工" + '</div>'
        + '<div class="toolChild">' + "开除员工" + '</div>'
        + '<div class="toolChild">' + "添加影厅" + '</div>'
        + '<div class="toolChild">' + "删除影厅" + '</div>'
    );

    $(".toolNav").children().eq(0).css({
        "border-top-left-radius": "10px",
        "border-top-right-radius": "10px"
    });

    $(".toolNav").children().eq(4).css({
        "border-bottom-left-radius": "10px",
        "border-bottom-right-radius": "10px"
    });

    //添加面板数据
    for (let i = 0; i < $(".toolChild").length; i++) {
        $(".messageBody").append(
            '<div class="choiceBody"></div>'
        )
    }


    //添加面板内容
    for (let i = 0; i < 5; i++) {
        addUser(i);
    }

    //修改面板数据
    for (let i = 0; i < $(".toolChild").length; i++) {
        $(".toolNav").children().eq(i).click(function () {
            queryUsers(i);
            $(".choiceBody").eq(i).css("display", "block");
        });
    }
}


function queryUsers(i) {
    $(".messageBody").children().eq(i).siblings().css("display", "none");

}


//系统管理员添加用户
function addUser(i) {
    if (i == 0) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">添加员工</span>'
            + '<span class="cancelAddUserBtn">'
            + '<button onclick="cancelBtn()" >取消</button>'
            + '</span>'
            + '<span class="confirmAddUserBtn">'
            + '<button onclick="addUserBtn()" >确认</button>'
            + '</span>'
            + '</div>'
            + '<div class="addUserBody">'

            + '<div class="addUserInput">'
            + '<p>用户姓名:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>账号:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>密码:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>确认密码:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>电话:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>工作职位:</p>'
            + '<select>'
            + '<option value="剧院经理"><span>剧院经理</span></option>'
            + '<option value="售票员"><span>售票员</span></option>'
            + '</select>'
            + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>性别</p>'
            + '<select>'
            + '<option value="男"><span>男</span></option>'
            + '<option value="女"><span>女</span></option>'
            + '</select>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>剧院</p>'
            + '<select>'
            + '</select>'
            + '</div>'



            + '</div>'
        );

        $.ajax({
            url: "http://api.ksgin.online/Theater",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                for (let i = 0; i < res.data.length; i++) {
                    $("select").eq(2).append(
                        '<option value="男"><span>'+res.data[i].theaterName+'</span></option>'
                    );
                }

                for (let i = 0; i < res.data.length; i++) {
                    $("select").eq(2).children().eq(i).attr("value",res.data[i].theaterId);
                }
            }
        })


    }
}
function addUserBtn() {
    let $addForm = $(".addUserInput");
    let $form = $addForm.find("input");
    let name = $form.eq(0).val();
    let account = $form.eq(1).val();
    let passWord = $form.eq(2).val();
    let conformPassWord = $form.eq(3).val();
    let level = $addForm.find("select").eq(0).val();
    let sex = $addForm.find("select").eq(1).val();
    let theaterId = $addForm.find("select").eq(2).val();
    let tel = $form.eq(4).val();

    if(name == ''||account == ''||passWord == ''|| conformPassWord == ''|| tel ==''){
        alert("输入有空");
        return false;
    }

    if(passWord!=conformPassWord){
        alert("密码与确认密码不符");
        return false;
    }



    $.ajax({
        url: "http://api.ksgin.online/User/CreateUser",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},

        data: JSON.stringify(
            {
                "name": name,
                "account": account,
                "password": passWord,
                "level": level,
                "sex": sex,
                "tel": tel,
                "theaterId": theaterId
            }
        ),

        success: function (res) {
            alert("添加成功！");
        },

        error: function () {
            console.log(false);
            return false;
        }
    })
}

function cancelBtn() {
    let $input =  $("input");
    $input.val("");
}


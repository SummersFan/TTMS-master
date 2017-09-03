/**
 * Created by CainSummer on 2017/5/24.
 */





window.onload = function () {
    let url = location.href;
    let tmp1 = url.split("?")[1];
    let tmp3 = tmp1.split("=")[1];
    let account = tmp3;


    //显示使用人员
    $(function () {
        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            xhrFields: {withCredentials: true},
            success: function (res) {
                if (res.msg != "successful"){
                    alert("亲，没有登陆呢！");
                    window.location.assign("../index.html")
                }

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
        $(".frameNav").mouseleave(function () {
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

//添加控制面板
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
        '<div class="TMToolChildNav">' + "员工管理" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "添加员工" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "查询员工" + '</div>'
        + '<div class="TMToolChildNav">' + "影厅管理" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "添加影厅" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "查询影厅" + '</div>'
        + '<div class="TMToolChildNav">' + "电影管理" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "查询上映电影" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "添加上映电影" + '</div>'

    );


    $("TMToolChild").eq(0).css({
        "border-top-left-radius": "10px",
        "border-top-right-radius": "10px"
    });

    $(".TMToolChild").eq(5).css({
        "border-bottom-left-radius": "10px",
        "border-bottom-right-radius": "10px"
    });

    //添加面板数据
    for (let i = 0; i < $(".TMToolChild").length; i++) {
        $(".messageBody").append(
            '<div class="choiceBody"></div>'
        )
    }


    //根据选项卡修改面板内容
    for (let i = 0; i < $(".TMToolChild").length; i++) {
        addUser(i);
        queryUsersMessage(i);
        addTheater(i);
        queryTheater(i);
        queryMovie(i);
        addMovie(i);
    }

    //修改面板数据
    for (let i = 0; i < $(".TMToolChild").length; i++) {
        $(".TMToolChild").eq(i).click(function () {
            $(".choiceBody").eq(i).siblings().css("display", "none");
            $(".choiceBody").eq(i).css("display", "block");
        });
    }

    slide();
}


//下拉函数
function slide() {
    $(".TMToolChildNav").eq(0).click(function () {
        if ($(".TMToolChild").eq(0).css("display") == "none") {
            $(".TMToolChild").eq(0).slideDown("slow");
            $(".TMToolChild").eq(1).slideDown("slow");
        } else {
            $(".TMToolChild").eq(0).slideUp("slow");
            $(".TMToolChild").eq(1).slideUp("slow");
        }
    })

    $(".TMToolChildNav").eq(1).click(function () {
        if ($(".TMToolChild").eq(2).css("display") == "none") {
            $(".TMToolChild").eq(2).slideDown("slow");
            $(".TMToolChild").eq(3).slideDown("slow");
        } else {
            $(".TMToolChild").eq(2).slideUp("slow");
            $(".TMToolChild").eq(3).slideUp("slow");
        }
    })
    $(".TMToolChildNav").eq(2).click(function () {
        if ($(".TMToolChild").eq(4).css("display") == "none") {
            $(".TMToolChild").eq(4).slideDown("slow");
            $(".TMToolChild").eq(5).slideDown("slow");
        } else {
            $(".TMToolChild").eq(4).slideUp("slow");
            $(".TMToolChild").eq(5).slideUp("slow");
        }
    })
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
            + '<button  onclick="addUserBtn()" >确认</button>'
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
            + '<p>电话:</p>' + '<input type="tel" name="tel" id="tel" required onblur="checkme(this)" >' + '<br/>'
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
                        '<option value=""><span>' + res.data[i].theaterName + '</span></option>'
                    );
                }

                for (let i = 0; i < res.data.length; i++) {
                    $("select").eq(2).children().eq(i).attr("value", res.data[i].theaterId);
                }
            }
        })

    }
}


//验证手机表达式
function checkme(obj) {
    let val = obj.value;
    let mobilevalid = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!mobilevalid.test(val)) {
        alert('请输入正确的手机号码！');
        return false;
    }
}

//添加员工按钮
function addUserBtn() {
    let $addForm = $(".addUserInput");
    let $form = $addForm.find("input");
    let name = $form.eq(0).val();
    let account = $form.eq(1).val();
    let level = $addForm.find("select").eq(0).val();
    let sex = $addForm.find("select").eq(1).val();
    let theaterId = $addForm.find("select").eq(2).val();
    let tel = $form.eq(2).val();

    if (name == '' || account == '' || tel == '') {
        alert("输入有空");
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
                "password": 8888,
                "level": level,
                "sex": sex,
                "tel": tel,
                "theaterId": theaterId
            }
        ),

        success: function (res) {
            console.log(res.msg);

            alert("添加成功！");

            updateUserTable();
        },

        error: function () {

            return false;
        }
    })
}

//清除按钮
function cancelBtn() {
    let $input = $("input");
    $input.val("");
}


//更新人员情况
function updateUserTable() {

    $("#userTable").children().eq(0).remove();

    $.ajax({
        url: "http://api.ksgin.online/User",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {
            console.log(res.msg);
            let $data = res.data;
            for (let i = 0; i < $data.length; i++) {
                $("#userTable").append(
                    +'<tbody>'
                    +'<tr class="trr" ><td>' + $data[i].userName + '</td><td>'
                    + $data[i].userAccount + '</td><td>' + $data[i].userSex
                    + '</td><td>' + $data[i].userLevel + '</td><td>' + $data[i].userTel + '</td></tr></tbody>'
                );
            }


            $(".bodyDiv").append(
                '<div class="userMessageClass">'
                + '<div class="userMessageClassBody">'
                + '</div>'
                + '</div>'
            );

            $(function () {
                $(".trr").click(function () {
                    let $account = $(this).children().eq(1).text();
                    $.ajax({
                        url: "http://api.ksgin.online/User/QueryUserByAccount/" + $account,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {
                            console.log(res.msg);
                            queryUsersMessageById(res.data);
                            return true;
                        },
                        error:function () {
                            alert("失败");
                            return false
                        }
                    });
                });

            });

            changeUserMessage();
        }
    });
}


//改变颜色
function changeUserMessage() {

    let $cool = $("#userTable").children().children();
    for (let i = 1; i < $cool.length; i++) {

        if (i % 2 == 0) {

            $cool.eq(i).children().css("background-color", "white");
        } else {

            $cool.eq(i).children().css("background-color", "#9d9d9d");
        }
    }
}


//系统管理员查询员工
function queryUsersMessage(i) {
    if (i == 1) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询员工</span>'
            + '<span class="queryUserInput">'
            + '<button class="queryUserBtn" onclick="queryUserByAccountOrIdBtn()">查询</button> '
            + '<input id="queryUserById" type="text" placeholder="输入用户ID">'
            + '<input id="queryUserByAccount" type="text" placeholder="输入用户账号">'
            + '</span>'
            + '</div>'
            + '<div class="queryUserBody">'
            + '</div>'
        );


        $.ajax({
            url: "http://api.ksgin.online/User",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                let $data = res.data;

                $(".queryUserBody").append(
                    '<table id="userTable" class="userTable" width="400">'
                    + '<tr>'
                    + '<th>' + "姓名" + '</th>'
                    + '<th>' + "账号" + '</th>'
                    + '<th>' + "性别" + '</th>'
                    + '<th>' + "职位" + '</th>'
                    + '<th>' + "电话" + '</th>'
                    + '</tr>'
                    + '</table>'
                );
            }
        });

        updateUserTable();

    }
}


function queryUsersMessageById(res) {
    $(".userMessageClass").remove();
    $.ajax({
        url: "http://api.ksgin.online/User/QueryUserById/" + res.userId,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (rest) {
            $(".bodyDiv").append(
                '<div class="userMessageClass">'
                + '<div class="userMessageClassBody">'
                + '<ul>'
                + '<li>' + "ID:" + res.userId + '</li>'
                + '<li>' + "姓名:" + res.userName + '</li>'
                + '<li>' + "账号:" + res.userAccount + '</li>'
                + '<li>' + "职位:" + res.userLevel + '</li>'
                + '<li>' + "性别:" + res.userSex + '</li>'
                + '<li>' + "电话:" + res.userTel + '</li>'
                // + '<li>' + "影院Id:" + rest.data.theaterName + '</li>'
                + '<li>' + "账号创建时间:" + '<br/>' + res.userCreateTime + '</li>'
                + '<li>' + "最近一次登陆:" + '<br/>' + res.userLastSignInTime + '</li>'
                + '</ul>'
                + '</div>'

                + '<div class="userMessageClassBtnDiv">'
                + '<button class="button1"  onclick="userMessageClassBtn()">确定</button>'
                + '<button class="button2" onclick="deleteUserBtn()">删除</button>'
                + '</div>'

                + '</div>'
            );
            $("#hideDiv").css("display", "block");
            $(".userMessageClass").css("display", "block");

            return true;

        },
        error: function () {
            alert("false");
            return false;
        }
    });
}

//用户信息面板隐藏
function userMessageClassBtn() {
    $("#hideDiv").css("display", "none");
    $(".userMessageClass").css("display", "none");
    $(".theaterMessageClass").css("display", "none");
    $(".movieMessageClass").css("display", "none");
}


function queryUserByAccountOrIdBtn() {
    let id = $("#queryUserById").val();
    let account = $("#queryUserByAccount").val();

    if (id != "") {
        $.ajax({
            url: "http://api.ksgin.online/User/QueryUserById/" + id,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {

                if (res.data == null) {
                    alert("查无此人");
                    return false;
                }
                if (account != "") {
                    if (res.data.userAccount != account) {
                        alert("用户名与id不符");
                        return false;
                    }
                }


                queryUsersMessageById(res.data);
                return true;

            },
            error: function () {
                alert("false");
                return false;
            }
        });
    }
    if (account != "") {
        $.ajax({
            url: "http://api.ksgin.online/User/QueryUserByAccount/" + account,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                if (res.data == null) {
                    alert("查无此人");
                    return false;
                }
                if (id != "") {
                    if (res.data.userId != id) {
                        alert("用户名与id不符");
                        return false;
                    }
                }
                queryUsersMessageById(res.data);
                return true;
            },
            error: function () {
                alert("false");

            }
        });
    }

}


//删除用户按钮
function deleteUserBtn() {
    let $i = $(".userMessageClassBody").children().eq(0).children().eq(0).text();
    let id = $i.split(":")[1];


    let cfd = confirm("确定删除？");

    if (cfd == true) {
        $.ajax({
            url: "http://api.ksgin.online/User/DeleteUser/" + id,
            type: "DELETE",
            xhrFields: {withCredentials: true},
            success: function (res) {

                updateUserTable();
                alert("删除成功");
                userMessageClassBtn();

                return true;
            },
            error: function () {
                alert("false");
                return false;
            }

        });
    }
}


//添加影厅面板
function addTheater(i) {
    if (i == 2) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">添加影厅</span>'
            + '<span class="cancelAddUserBtn">'
            + '<button onclick="cancelBtn()" >取消</button>'
            + '</span>'
            + '<span class="confirmAddUserBtn">'
            + '<button onclick="addTheaterBtn()" >确认</button>'
            + '</span>'
            + '</div>'

            + '<div class="addTheaterBody">'

            + '<div class="addTheaterLeft">'

            + '<div class="addTheaterInputDiv">'
            + '<p>影厅名称:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addTheaterInputDiv">'
            + '<p>影厅地址:</p>' + '<input type="text">' + '<br/>'
            + '</div>'



            + '<div class="addTheaterInputDiv">'
            + '<p>座位行数:</p>' + '<input style="width: 20%" type="number" max="12" min="5" value="5">' + '<br/>'
            + '</div>'

            + '<div class="addTheaterInputDiv">'
            + '<p>座位列数:</p>' + '<input style="width: 20%" type="number" max="12" min="5" value="5">' + '<br/>'
            + '</div>'


            + '</div>'


            + '<div class="addTheaterRight">'

            + '<iframe id="content_info" src=" http://ditu.amap.com/ " style="width:100%;height:100%">' +

            '</iframe>'
            + '</div>'

            + '</div>'
        );



    }
}

//确认添加影厅按钮
function addTheaterBtn() {
    let $input = $(".addTheaterInputDiv").find("input");
    let $name = $input.eq(0).val();
    let $location = $input.eq(1).val();
    let row = $input.eq(2).val();
    let col = $input.eq(3).val();

    $.ajax({
        url: "http://api.ksgin.online/Theater/CreateTheater",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        data: JSON.stringify(
            {
                "theaterName": $name,
                "location": $location,
                "mapSite": "string",
                "seatRowCount": row,
                "seatColCount": col
            }
        ),

        success: function (res) {
            updateTheaterTable();


            $.ajax({
                url: "http://api.ksgin.online/Theater",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},
                success: function (res) {
                    $("select").children().remove();

                    for (let i = 0; i < res.data.length; i++) {
                        $("select").eq(2).append(
                            '<option value=""><span>' + res.data[i].theaterName + '</span></option>'
                        );
                    }

                    for (let i = 0; i < res.data.length; i++) {
                        $("select").eq(2).children().eq(i).attr("value", res.data[i].theaterId);
                    }
                }
            })

            alert("添加成功！");




        },

        error: function () {

            return false;
        }
    })

}


// 更新影厅情况
function updateTheaterTable() {

    $("#TheaterTable").children().eq(0).remove();

    $.ajax({
        url: "http://api.ksgin.online/Theater",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {
            let $data = res.data;

            for (let i = 0; i < $data.length; i++) {
                $("#TheaterTable").append(
                    '<tr class="trrTheater" ><td style="display: none">' + $data[i].theaterId + '</td><td>'+ $data[i].theaterName + '</td><td>'
                    + $data[i].theaterLocation + '</td><td>' + $data[i].theaterSeatRowsCount + '</td><td>' + $data[i].theaterSeatColsCount + '</td></tr>'
                );
            }
            changeTheaterMessage();

            $(".bodyDiv").append(
                '<div class="theaterMessageClass">'
                + '<div class="theaterMessageClassBody">'
                + '</div>'
                + '</div>'
            );

            //添加点击查看影厅
            $(function () {
                $(".trrTheater").click(function () {
                    let $id = $(this).children().eq(0).text();

                    console.log($id);
                    $.ajax({
                        url: "http://api.ksgin.online/Theater/QueryTheater/" + $id,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {
                            console.log(res.msg);
                            if(res.msg == "successful"){
                                queryTheaterMessageById(res.data);
                                return true;
                            }
                        }
                    });
                });
            });
        }
    });
}

//改变影厅表格颜色
function changeTheaterMessage() {
    let $cool = $("#TheaterTable").children().children();
    for (let i = 1; i < $cool.length; i++) {
        if (i % 2 == 0) {
            $cool.eq(i).children().css("background-color", "white");
        } else {

            $cool.eq(i).children().css("background-color", "#9d9d9d");
        }
    }
}



//查询影厅
function queryTheater(i) {
    if (i == 3) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询影厅</span>'
            + '<span class="queryUserInput">'
            + '<button class="queryUserBtn" onclick="queryTheaterMessage()">查询</button> '
            + '<input id="queryTheaterById" type="text" placeholder="输入影厅ID">'
            + '<input id="queryTheaterByName" type="text" placeholder="输入影厅名称">'
            + '</span>'
            + '</div>'
            + '<div class="queryTheaterBody">'
            + '</div>'
        );
        $.ajax({
            url: "http://api.ksgin.online/Theater",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                let $data = res.data;

                $(".queryTheaterBody").append(
                    '<table id="TheaterTable" class="TheaterTable" width="400">'
                    + '<tr>'
                    + '<th style="display: none">' + "影厅id" + '</th>'
                    + '<th>' + "影厅名称" + '</th>'
                    + '<th>' + "影厅地址" + '</th>'
                    + '<th>' + "座位行数" + '</th>'
                    + '<th>' + "座位列数" + '</th>'
                    + '</tr>'
                    + '</table>'
                );
            }
        });
        updateTheaterTable();
    }
}



function queryTheaterMessage(){

    let id =  $("#queryTheaterById").val();

    if(id != ""){

        $.ajax({
            url:"http://api.ksgin.online/Theater/QueryTheater/"+id,
            type:"GET",
            xhrFields: {withCredentials: true},
            success: function (res) {
                if(res.msg == "successful"){

                    $(".theaterMessageClass").remove();

                    $(".bodyDiv").append(
                        '<div class="theaterMessageClass">'
                        + '<div class="theaterMessageClassBody">'
                        + '<ul>'
                        + '<li>' + "ID:" + res.data.theaterId + '</li>'
                        + '</ul>'
                        + '</div>'
                        + '<div class="userMessageClassBtnDiv">'
                        + '<button class="button1" onclick="userMessageClassBtn()">确定</button>'
                        + '<button class="button2" onclick="theaterMessageClassBody()">删除</button>'
                        + '</div>'
                        + '</div>'
                    );
                    $("#hideDiv").css("display", "block");
                    $(".theaterMessageClass").css("display", "block");

                    return true;
                }
            }

        })


    }
}


//查询影厅回信息
function queryTheaterMessageById(res) {

    $(".theaterMessageClass").remove();

            $.ajax({
                url: "http://api.ksgin.online/User/SelectUser/" + res.theaterId,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},
                success: function (rest) {

                    $(".bodyDiv").append(
                        '<div class="theaterMessageClass">'
                        + '<div class="theaterMessageClassBody">'
                        + '<ul class="queryTheaterMessageUl">'
                        + '<li style="display: none">' + "ID:" + res.theaterId + '</li>'
                        + '<li>' + "名称:" + res.theaterName + '</li>'
                        + '<li>' + "座位列数:" + res.theaterSeatRowsCount +"座位行数:"+res.theaterSeatColsCount+ '</li>'
                        + '<li>' + "地址:" + res.theaterLocation + '</li>'
                        + '<li>' + "剧院经理:" + '<select id ="queryTheaterMessageS1"></select>' + '</li>'
                        + '<li>' + "售票员:" + '<select id="queryTheaterMessageS2"></select>' + '</li>'

                        + '</ul>'
                        + '</div>'
                        + '<div class="userMessageClassBtnDiv">'
                        + '<button  class="button1" onclick="userMessageClassBtn()">确定</button>'
                        + '<button  class="button2" onclick="theaterMessageClassBody()">删除</button>'
                        + '</div>'
                        + '</div>'
                    );



                    for(let i =0;i<rest.data.length;i++){
                        if(rest.data[i].userLevel == "剧院经理"){
                            $("#queryTheaterMessageS1").append(
                                '<option>'+rest.data[i].userName+'</option>'
                            );
                        }
                        if(rest.data[i].userLevel == "售票员"){
                            $("#queryTheaterMessageS2").append(
                                '<option>'+rest.data[i].userName+'</option>'
                            );
                        }
                    }




                    $("#hideDiv").css("display", "block");
                    $(".theaterMessageClass").css("display", "block");

                    return true;


                }
            });

}


//删除影厅
function theaterMessageClassBody() {
    let $i = $(".theaterMessageClassBody").children().eq(0).children().eq(0).text();
    
    let id = $i.split(":")[1];

    console.log(id);
    let cfd = confirm("确定删除？");

    if (cfd == true) {
        $.ajax({
            url: "http://api.ksgin.online/Theater/DeleteTheater/" + id,
            type: "DELETE",
            xhrFields: {withCredentials: true},
            success: function (res) {

                console.log(res.msg)

                updateTheaterTable();

                $.ajax({
                    url: "http://api.ksgin.online/Theater",
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function (res) {
                        $("select").children().remove();

                        for (let i = 0; i < res.data.length; i++) {
                            $("select").eq(2).append(
                                '<option value=""><span>' + res.data[i].theaterName + '</span></option>'
                            );
                        }

                        for (let i = 0; i < res.data.length; i++) {
                            $("select").eq(2).children().eq(i).attr("value", res.data[i].theaterId);
                        }
                    }
                })
                alert("删除成功");
                userMessageClassBtn();
                return true;
            },
            error: function () {
                alert("false");
                return false;
            }

        });
    }
}


//查询上映的电影面板
function queryMovie(i) {


    if (i == 4) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询上映的电影</span>'
            + '<span class="queryUserInput">'
            + '<button class="queryUserBtn" onclick="updateMovieTable()">取消</button> '
            + '<button class="queryUserBtn" onclick="queryMovieByBtn()">查询</button> '
            + '<select class="selectMovie" ></select>'
            + '<input id="queryMovieById" type="text" placeholder="输入电影ID">'
            + '<input id="queryMovieByName" type="text" placeholder="输入电影名称">'
            + '</span>'
            + '</div>'
            + '<div class="queryMovieBody">'
            + '</div>'
        );

        $.ajax({
            url: "http://api.ksgin.online/Programme/GetAllTags",
            type: "GET",

            xhrFields: {withCredentials: true},
            success: function (res) {
                $(".selectMovie").append(
                    '<option value=""><span>无选项</span></option>'
                );

                $(".selectMovie").children().eq(0).attr("value", "");

                for (let i = 0; i < res.data.length; i++) {
                    $(".selectMovie").append(
                        '<option value=""><span>' + res.data[i].tag + '</span></option>'
                    )
                }


                for (let i = 0; i < res.data.length; i++) {
                    $(".selectMovie").children().eq(i + 1).attr("value", res.data[i].tag);
                }


                return true;
            },
            error: function () {
                alert("false");
                return false;
            }
        });

        updateMovieTable();
    }
}

//更新电影的面板信息
function updateMovieTable() {
    $(".queryMovieBody").children().remove();

    $.ajax({
        url: "http://api.ksgin.online/Programme",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {

            if (res.msg == "successful") {
                for (let i = 0; i < res.data.length; i++) {
                    $(".queryMovieBody").append(
                        '<div class="movieDiv">'

                        +'<img src=""/>'

                        +'<p>' + res.data[i].programmeName + '</p></div>'
                    )


                }
            }

            let movie = $(".movieDiv");

            for(let i = 0;i<res.data.length;i++){
                console.log(res.msg);

                $.ajax({
                    type: "GET",
                    url: " http://api.ksgin.online/Programme/QueryProgrammeByName/"+res.data[i].programmeName,
                    xhrFields: {withCredentials: true},
                    contentType: "application/json; charset=utf-8",
                    dataType:"json",
                    success: function (rest) {

                        console.log(rest.msg);
                        $.ajax({
                            type: "GET",
                            url: " http://api.ksgin.online/Programme/SelectPlayBill/"+rest.data.programmeId,
                            xhrFields: {withCredentials: true},
                            success: function (rests) {

                                let $src = "http://pic.ksgin.online/"+rests.data;

                                movie.eq(i).find("img").attr("src",$src);

                            },
                            error: function (err) {
                                // alert("上传文件出现错误！");
                                // console.log(err);
                            }
                        });

                    },
                    error: function (err) {

                    }
                })

            }

            //添加点击事件
            $(function () {
                $(".movieDiv").click(function () {
                    let $name = $(this).children().eq(1).text();
                    $.ajax({
                        url: "http://api.ksgin.online/Programme/QueryProgrammeByName/" + $name,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {

                            $(".movieMessageClass").remove();
                            $(".bodyDiv").append(
                                '<div class="movieMessageClass">'

                                + '<div class="movieMessageClassPlayBill"><img src=""/>'
                                + '</div>'

                                + '<div class="movieMessageProgrammeProfile">'
                                + '<P>电影简介：</P>'
                                + '<P>' + res.data.programmeProfile + '</P>'
                                + '</div>'

                                + '<div class="movieMessage">'
                                + '<ul>'
                                + '<li id="movieId">' + "电影Id:" + res.data.programmeId + '</li>'
                                + '<li>' + "电影名:" + res.data.programmeName + '</li>'
                                + '<li>' + "电影时长:" + res.data.programmeDruation + '</li>'
                                + '<li>' + "类型:" + res.data.programmeTags + '</li>'

                                + '</ul>'

                                + '</div>'

                                + '<div class="movieMessageBtn">'
                                + '<button onclick="userMessageClassBtn()">确定</button>'
                                + '<button onclick="deleteMovie()">删除</button>'
                                + '</div>'
                                + '</div>'
                            );

                            $.ajax({
                                type: "GET",
                                url: " http://api.ksgin.online/Programme/SelectPlayBill/"+res.data.programmeId,
                                xhrFields: {withCredentials: true},
                                success: function (rests) {

                                    let $src = "http://pic.ksgin.online/"+rests.data;

                                    $(".movieMessageClassPlayBill").find("img").attr("src",$src);

                                },
                                error: function (err) {
                                    // alert("上传文件出现错误！");
                                    // console.log(err);
                                }
                            });


                            $("#hideDiv").css("display", "block");
                            $(".movieMessageClass").css("display", "block");
                        }
                    });
                });
            });
        }
    });
}


//删除电影
function deleteMovie() {

    let $i = $(".movieMessage").children().eq(0).children().eq(0).text();

    let id = $i.split(":")[1];
    let cfd = confirm("确定删除？");
    if (cfd == true) {
        console.log(id);
        $.ajax({
            url: "http://api.ksgin.online/Programme/DeleteProgramme/" + id,
            type: "DELETE",
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log(res.msg);
                updateMovieTable();
                alert("删除成功!");
                userMessageClassBtn();
                return true;
            },
            error: function () {
                alert("false");
                return false;
            }
        });
    }
}


//查询电影按钮
function queryMovieByBtn() {

    let $name = $("#queryMovieByName").val();
    let $id = $("#queryMovieById").val();
    let $select = $(".selectMovie").val();


    if ($name == "" && $id == "") {

        $.ajax({
            url: "http://api.ksgin.online/Programme/SelectProgrammeBytags/" + $select,
            type: "GET",
            xhrFields: {withCredentials: true},
            success: function (res) {
                $(".queryMovieBody").children().remove();
                queryMovieByTag(res.data);

                return true;
            }
        })
    }

    if ($select != "无选项" && $name != "" && $id == "") {
        $.ajax({
            url: "http://api.ksgin.online/Programme/QueryProgrammeByName/" + $name,
            type: "GET",
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log(res.data);

                $(function () {
                    $.ajax({
                        url: "http://api.ksgin.online/Programme/QueryProgrammeByName/" + $name,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {
                            $(".movieMessageClass").remove();
                            console.log($name);
                            $(".bodyDiv").append(
                                '<div class="movieMessageClass">'

                                + '<div class="movieMessageClassPlayBill">'
                                + '</div>'

                                + '<div class="movieMessageProgrammeProfile">'
                                + '<P>电影简介：</P>'
                                + '<P>' + res.data.programmeProfile + '</P>'
                                + '</div>'

                                + '<div class="movieMessage">'
                                + '<ul>'
                                + '<li id="movieId">' + "电影Id:" + res.data.programmeId + '</li>'
                                + '<li>' + "电影名:" + res.data.programmeName + '</li>'
                                + '<li>' + "电影时长:" + res.data.programmeDruation + '</li>'
                                + '<li>' + "类型:" + res.data.programmeTags + '</li>'

                                + '</ul>'

                                + '</div>'

                                + '<div class="movieMessageBtn">'
                                + '<button onclick="userMessageClassBtn()">确定</button>'
                                + '<button onclick="deleteMovie()">删除</button>'
                                + '</div>'
                                + '</div>'
                            );

                            $("#hideDiv").css("display", "block");
                            $(".movieMessageClass").css("display", "block");
                        }
                    });
                });
            }
        })
    }

    if ($select != "无选项" && $name == "" && $id != "") {
        $.ajax({
            url: "http://api.ksgin.online/Programme/QueryProgrammeById/" + $id,
            type: "GET",
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log(res.data);

                $(function () {
                    $.ajax({
                        url: "http://api.ksgin.online/Programme/QueryProgrammeById/" + $id,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {

                            $(".bodyDiv").append(
                                '<div class="movieMessageClass">'

                                + '<div class="movieMessageClassPlayBill">'
                                + '</div>'

                                + '<div class="movieMessageProgrammeProfile">'
                                + '<P>电影简介：</P>'
                                + '<P>' + res.data.programmeProfile + '</P>'
                                + '</div>'

                                + '<div class="movieMessage">'
                                + '<ul>'
                                + '<li id="movieId">' + "电影Id:" + res.data.programmeId + '</li>'
                                + '<li>' + "电影名:" + res.data.programmeName + '</li>'
                                + '<li>' + "电影时长:" + res.data.programmeDruation + '</li>'
                                + '<li>' + "类型:" + res.data.programmeTags + '</li>'

                                + '</ul>'

                                + '</div>'

                                + '<div class="movieMessageBtn">'
                                + '<button onclick="userMessageClassBtn()">确定</button>'
                                + '<button onclick="deleteMovie()">删除</button>'
                                + '</div>'
                                + '</div>'
                            );

                            $("#hideDiv").css("display", "block");
                            $(".movieMessageClass").css("display", "block");
                        }
                    });
                });
            }
        })
    }

    if ($select != "无选项" && $name == "" && $id != "") {
    }

}


//通过标签查询
function queryMovieByTag(data) {

    for (let i = 0; i < data.length; i++) {
        $(".queryMovieBody").append(
            '<div class="movieDiv">'
            +'<img src=""/>'
            + '<p>'
            + data[i].programmeName + '</p></div>'
        );

        let movie = $(".movieDiv");

        for(let i = 0;i<data.length;i++) {

            console.log(data[i].programmeName);

            console.log(data.length);

            $.ajax({
                type: "GET",
                url: " http://api.ksgin.online/Programme/QueryProgrammeByName/" + data[i].programmeName,
                xhrFields: {withCredentials: true},
                success: function (res) {

                    console.log(res.data.programmeId);
                    $.ajax({
                        type: "GET",
                        url: " http://api.ksgin.online/Programme/SelectPlayBill/" + res.data.programmeId,
                        xhrFields: {withCredentials: true},
                        success: function (res) {

                            let $src = "http://pic.ksgin.online/" + res.data;

                            console.log($src);

                            movie.eq(i).find("img").attr("src", $src);

                            console.log( movie.eq(i).find("img").attr("src"));



                        },
                        error: function (err) {
                            // alert("上传文件出现错误！");
                            // console.log(err);
                        }
                    });

                },
                error: function (err) {

                }
            });
        }




        //添加点击事件
        $(function () {
            $(".movieDiv").click(function () {
                let $name = $(this).children().eq(1).text();
                $.ajax({
                    url: "http://api.ksgin.online/Programme/QueryProgrammeByName/" + $name,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function (res) {


                        $(".bodyDiv").append(
                            '<div class="movieMessageClass">'

                            + '<div class="movieMessageClassPlayBill">'
                            + '</div>'

                            + '<div class="movieMessageProgrammeProfile">'
                            + '<P>电影简介：</P>'
                            + '<P>' + res.data.programmeProfile + '</P>'
                            + '</div>'

                            + '<div class="movieMessage">'
                            + '<ul>'
                            + '<li id="movieId">' + "电影Id:" + res.data.programmeId + '</li>'
                            + '<li>' + "电影名:" + res.data.programmeName + '</li>'
                            + '<li>' + "电影时长:" + res.data.programmeDruation + '</li>'
                            + '<li>' + "类型:" + res.data.programmeTags + '</li>'

                            + '</ul>'

                            + '</div>'

                            + '<div class="movieMessageBtn">'
                            + '<button onclick="userMessageClassBtn()">确定</button>'
                            + '<button onclick="deleteMovie()">删除</button>'
                            + '</div>'
                            + '</div>'
                        );

                        $("#hideDiv").css("display", "block");
                        $(".movieMessageClass").css("display", "block");
                    }
                });
            });
        });
    }
}


//添加上映电影
function addMovie(i) {
    if (i == 5) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">添加电影</span>'
            + '<span class="cancelAddUserBtn">'
            + '<button onclick="cancelBtn()" >取消</button>'
            + '</span>'
            + '<span class="confirmAddUserBtn">'
            + '<button id="addMovieBtn" onclick="addMovieBtn()" >确认</button>'
            + '</span>'
            + '</div>'

            + '<div class="addMovieBody">'


            + '<div class="addMoviePicture">'
            +'<img  src=""/>'

            + '<div class="addFile">'
            + '<input   onchange="billChange()" type="file"  id="avatar">'
            + '</div>'
            + '</div>'


            + '<div class="addMovieMessage">'

            + '<div class="addMovieInput">'
            + '<p>电影名称:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addMovieInput">'
            + '<p>电影时长:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            + '<div class="addMovieInput">'
            + '<p>类型:</p>' + '<input type="text">' + '<br/>'
            + '</div>'

            // +'<div class="addMovieInput">'
            // +'<p>类型:</p>' +'<input id="tagsInput" type="text">'+ '<select id="tagsSelect" type="text"><option></option></select>' + '<br/>'
            // + '</div>'

            + '<div class="addMovieInputText">'
            + '<p>内容简介:</p>' + '<textarea id="textProfile" style="width: 100%;height: 100%"/>'
            + '</div>'

            + '</div>'
            + '</div>'
        )

    }
}


//本地改变上传的海报
function billChange() {
    //修改上传的海报
    let inputFile = document.getElementById("avatar");
    if(inputFile.value != ""){
        let src =  URL.createObjectURL(inputFile.files[0]);

        $(".addMoviePicture").find("img").attr("src",src);
        console.log(src);
    }
}


//添加电影按钮
function addMovieBtn() {

    let $form = $(".addMovieInput").find("input");
    let name = $form.eq(0).val();
    let duration = $form.eq(1).val();
    let tags = $form.eq(2).val();
    let profile = document.getElementById("textProfile").value;

    if(name !=""){
        $.ajax({
            type: "POST",
            url: "http://api.ksgin.online/Programme/CreateProgramme" ,
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            data: JSON.stringify({
                "programmeName":name,
                "duration": duration,
                "tags": tags,
                "profile": profile
            }),
            success: function (message) {
                console.log(message);


                //上传图片ajax
                $.ajax({
                    url:"http://api.ksgin.online/Programme",
                    type:"GET",
                    xhrFields: {withCredentials: true},
                    success:function (res) {
                        let num = res.data.length-1;
                        let $id = res.data[num].programmeId;

                        //上传海报
                        let fileUpload = $("#avatar").get(0);
                        let files = fileUpload.files;

                        let data = new FormData();

                        for (var i = 0; i < files.length; i++) {
                            data.append(files[i].name, files[i]);
                        }


                        $.ajax({
                            type: "POST",
                            url: "http://api.ksgin.online/Programme/UploadPlayBill/"+$id ,
                            contentType: false,
                            processData: false,
                            data: data,
                            success: function (message) {
                                console.log(message);
                            },
                            error: function (err) {
                                alert("上传文件出现错误！");
                                console.log(err);
                            }
                        });

                    }
                });
                alert("成功!");
                updateMovieTable();
            },
            error: function (err) {
                alert("上传出错！");
                console.log(err);
            }
        });
    }

}


//清除Movie选项按钮
function cancelBtn() {
    let $input = $(".addMovieInput").find("input");
    $(".addMovieInput").find("textarea").val("");
    $input.val("");
}



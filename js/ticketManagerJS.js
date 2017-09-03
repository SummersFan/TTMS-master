/**
 * Created by 哈哈哈 on 2017/6/6.
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
            xhrFields: {withCredentials: true},
            success: function (res) {
                if (res.msg != "successful") {
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

    //添加下拉信息
    $(function () {
        $(".person").mouseenter(function () {
            $(".personNav").slideDown(1);
        });

        $(".personNav ").mouseleave(function () {
            $(".personNav").slideUp(1);
        })
    });

    //
    $(function () {
        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            xhrFields: {withCredentials: true},
            data: JSON.stringify(account),
            success: function (res) {
                let perosn2 = res.data;
                $(".person").text(perosn2.userName);
                if (res.data.userLevel == "剧院经理") {
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

//用户信息面板隐藏
function userMessageClassBtn() {
    $("#hideDiv").css("display", "none");
    $(".seatMessage").css("display", "none");
    $(".theaterMessageClass").css("display", "none");

}

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
        '<div class="TMToolChildNav">' + "影厅管理" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "影厅信息" + '</div>'
        + '<div class="TMToolChildNav">' + "演出计划管理" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "查询演出计划" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "添加演出计划" + '</div>'
        + '<div class="TMToolChildNav">' + "售务管理" + '</div>'
        + '<div class="TMToolChild" style="display: none">' + "售票信息" + '</div>'
    );

    $(".toolNav").children().eq(0).css({
        "border-top-left-radius": "10px",
        "border-top-right-radius": "10px"
    });

    $(".toolNav").children().eq(6).css({
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
        querySelfTheater(i);
        addCreateGood(i);
        queryProgramme(i);
        ticketMessage(i);
        // queryTheater(i);
        // queryMovie(i);
        // addMovie(i);
    }

    //修改面板状态
    for (let i = 0; i < $(".TMToolChild").length; i++) {
        $(".TMToolChild").eq(i).click(function () {

            $(".choiceBody").eq(i).siblings().css("display", "none");
            $(".choiceBody").eq(i).css("display", "block");
        });
    }

    slide();
}


function queryUsers(i) {
    $(".messageBody").children().eq(i).siblings().css("display", "none");
}

//下拉函数
function slide() {
    $(".TMToolChildNav").eq(0).click(function () {
        if ($(".TMToolChild").eq(0).css("display") == "none") {
            $(".TMToolChild").eq(0).slideDown("slow");
        } else {
            $(".TMToolChild").eq(0).slideUp("slow");
        }
    })

    $(".TMToolChildNav").eq(1).click(function () {
        if ($(".TMToolChild").eq(1).css("display") == "none") {
            $(".TMToolChild").eq(1).slideDown("slow");
            $(".TMToolChild").eq(2).slideDown("slow");
        } else {
            $(".TMToolChild").eq(1).slideUp("slow");
            $(".TMToolChild").eq(2).slideUp("slow");
        }
    })
    $(".TMToolChildNav").eq(2).click(function () {
        if ($(".TMToolChild").eq(3).css("display") == "none") {
            $(".TMToolChild").eq(3).slideDown("slow");
        } else {
            $(".TMToolChild").eq(3).slideUp("slow");
        }
    })
}

//查询影厅面板
function querySelfTheater(i) {
    if (i == 0) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询影厅</span>'
            + '<span class="queryUserInput">'
            + '<button class="queryUserBtn" onclick="">查询</button> '
            + '<input id="querySeatR" type="text" placeholder="座位行数">'
            + '<input id="querySeatC" type="text" placeholder="座位列数">'
            + '</span>'
            + '</div>'
            + '<div class="queryTheaterBody">'
            + '<div class="theaterScreen"></div>'
            + '<div class="SeatBody"></div>'
            + '</div>'
        );

        updateSeat();//建立座位
    }
}

//通过行和列筛选座位
function querySeatByRC() {

    let row = $("#querySeatR").val();
    let col = $("#querySeatC").val();



    $.ajax({
        url: "http://api.ksgin.online/Seat/QuerySeat/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {
            $(".bodyDiv").append(
                '<div class="seatMessage">'
                + '<div class="seatMessageTitle">'
                + '<ul>'
                + '<li>' + "座位Id:" + res.data.seatId + '</li>'
                + '<li>' + "所属影厅:" + res.data.theaterId + '</li>'
                + '<li>' + "状态:" + res.data.status + '</li>'
                + '<li>' + "行:" + res.data.seatRowNumber + '</li>'
                + '<li>' + "列:" + res.data.seatColNumber + '</li>'
                + '</ul>'
                + '</div>'

                + '<div class="seatMessageBtn">'
                + '<button onclick="userMessageClassBtn()" class="seatMessageBtnConfirm">确定</button>'
                + '<button onclick="fixSeat()" class="seatMessageBtnConfirm">报修/取消</button>'
                + '</div> '
                + '</div>'
            )

            $("#hideDiv").css("display", "block");
            $(".seatMessage").css("display", "block");
        }

    })
}


//更新座位面板座位
function updateSeat() {


    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id

    $(".SeatBody").children().remove();

    $.ajax({
        url: "http://api.ksgin.online/Theater/QueryTheater/" + theaterId,
        type: "GET",
        xhrFields: {withCredentials: true},
        success: function (res) {
            let row = res.data.theaterSeatRowsCount;
            let col = res.data.theaterSeatColsCount;

            $.ajax({
                url: "http://api.ksgin.online/Seat/SelectSeat/" + theaterId,
                type: "GET",
                xhrFields: {withCredentials: true},
                success: function (rest) {

                    for (let i = 0; i < rest.data.length; i++) {

                        if (i % col == 0) {
                            $(".SeatBody").append(
                                '<br/>'
                            )
                        }

                        $(".SeatBody").append(
                            '<div class="seatDiv">'
                            + '<img'
                            + ' src="../img/seat/座位已选择.gif"><div class="seatMessageIn">'
                            + "id:" + rest.data[i].seatId + ";"
                            + "<br/>"
                            + rest.data[i].seatRowNumber + "行"
                            + rest.data[i].seatColNumber + "列"
                            + '</div>'
                            + '</div>'
                        );

                        if (rest.data[i].seatRowNumber >= row) {
                            $(".seatMessageIn").eq(i).css({
                                "top": "-50%"
                            })
                        }

                        if (rest.data[i].seatColNumber >= col) {
                            $(".seatMessageIn").eq(i).css({
                                "left": "-50%"
                            })
                        }

                        if (rest.data[i].status == true) {
                            $(".seatDiv").eq(i).find("img").attr("src", "../img/seat/座位已选择.gif");
                        } else {
                            $(".seatDiv").eq(i).find("img").attr("src", "../img/seat/座位故障.gif");
                        }
                    }

                    let $width = 100 / (col + 1) + "%";
                    let $ml = 100 / (row + 2) / col + "%";


                    $(".seatDiv").css("width", $width);

                    $(".seatDiv").css("margin-left", $ml);

                    $(function () {
                        $(".seatDiv").find("img").mouseenter(function () {
                            $(this).parent().find(".seatMessageIn").css("display", "block");

                        });

                        $(".seatDiv").find("img").mouseleave(function () {
                            $(this).parent().find(".seatMessageIn").css("display", "none");

                        })
                    });

                    clickOfSeat(); //添加点击事件

                },

                error: function () {
                    console.log(false);
                    return false;
                }
            })


        }
    })
}


//给座位添加点击事件
function clickOfSeat() {
    $(".seatDiv").find("img").click(function () {

        $(".seatMessage").remove();
        let text = $(this).parent().children().eq(1).text();
        let text2 = text.split(";")[0];
        let id = text2.split(":")[1];

        $.ajax({
            url: "http://api.ksgin.online/Seat/QuerySeat/" + id,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                $(".bodyDiv").append(
                    '<div class="seatMessage">'
                    + '<div class="seatMessageTitle">'
                    + '<ul>'
                    + '<li>' + "座位Id:" + res.data.seatId + '</li>'
                    + '<li>' + "所属影厅:" + res.data.theaterId + '</li>'
                    + '<li>' + "状态:" + res.data.status + '</li>'
                    + '<li>' + "行:" + res.data.seatRowNumber + '</li>'
                    + '<li>' + "列:" + res.data.seatColNumber + '</li>'
                    + '</ul>'
                    + '</div>'

                    + '<div class="seatMessageBtn">'
                    + '<button onclick="userMessageClassBtn()" class="seatMessageBtnConfirm">确定</button>'
                    + '<button onclick="fixSeat()" class="seatMessageBtnConfirm">报修/取消</button>'
                    + '</div> '
                    + '</div>'
                )

                $("#hideDiv").css("display", "block");
                $(".seatMessage").css("display", "block");
            }

        })
    })
}


//座位报修
function fixSeat() {
    let text = $(".seatMessageTitle").find("ul").children().eq(0).text();
    let id = text.split(":")[1];

    let text2 = $(".seatMessageTitle").find("ul").children().eq(2).text();
    status = text2.split(":")[1];
    console.log(status);

    if (status == "true") {
        let cfd = confirm("确定报修？");
        if (cfd == true) {
            $.ajax({
                url: "http://api.ksgin.online/Seat/UpdateSeatStatus",
                type: "PATCH",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},
                data: JSON.stringify(
                    {
                        "seatId": id,
                        "status": false
                    }
                ),
                success: function (res) {
                    $(".seatMessageTitle").find("ul").children().eq(2).text("状态:false");
                    updateSeat();
                    userMessageClassBtn();
                    console.log(res.msg);
                },
                error: function () {
                    console.log(false);
                    return false;
                }
            })
        }
    } else {
        let cfd2 = confirm("确定取消报修？");
        if (cfd2 == true) {
            $.ajax({
                url: "http://api.ksgin.online/Seat/UpdateSeatStatus",
                type: "PATCH",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},
                data: JSON.stringify(
                    {
                        "seatId": id,
                        "status": true
                    }
                ),
                success: function (res) {
                    $(".seatMessageTitle").find("ul").children().eq(2).text("状态:true");
                    updateSeat();
                    userMessageClassBtn();
                    console.log(res.msg);
                },
                error: function () {
                    console.log(false);
                    return false;
                }
            })
        }
    }

}


//添加演出计划面板
function addCreateGood(i) {
    if (i == 2) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">添加演出计划</span>'
            + '<span class="cancelAddUserBtn">'
            + '<button onclick="cancelBtn()" >取消</button>'
            + '</span>'
            + '<span class="confirmAddUserBtn">'
            + '<button onclick="addGood()" >确认</button>'
            + '</span>'
            + '</div>'
            + '<div class="addUserBody">'

            + '<div class="addUserInput">'
            + '<p>上映电影:</p>'
            + '<select class="select1">'
            + '</select>'
            + '<br/>'
            + '</div>'


            + '<div class="addUserInput">'
            + '<p>上映场次:</p>'
            + '<select class="select1">'
            + '<option value="早一"><span>7:00</span></option>'
            + '<option value="早二"><span>10:00</span></option>'
            + '<option value="午一"><span>13:00</span></option>'
            + '<option value="午二"><span>16:00</span></option>'
            + '<option value="晚一"><span>19:00</span></option>'
            + '<option value="晚二"><span>21:00</span></option>'
            + '</select>'
            + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>上映日期:</p>' + '<input type="date">' + '<br/>'
            + '</div>'

            + '<div class="addUserInput">'
            + '<p>票价:</p>' + '<input type="number"  style="width: 15%">' + '<br/>'
            + '</div>'

            + '</div>'
        );

        $.ajax({
            url: "http://api.ksgin.online/Programme",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},

            success: function (res) {
                for (let i = 0; i < res.data.length; i++) {
                    $(".select1").eq(0).append(
                        '<option value=""><span>' + res.data[i].programmeName + '</span></option>'
                    );
                }

                for (let i = 0; i < res.data.length; i++) {
                    $(".select1").eq(0).children().eq(i).attr("value", res.data[i].programmeId);
                }
            }
        })

    }
}

//点击添加按钮
function addGood() {

    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[0];

    let tmp3 = tmp2.split("=")[1];

    let account = tmp3;

    let $addForm = $(".addUserInput");
    let $form = $addForm.find("input");
    let date = $form.eq(0).val();
    let price = $form.eq(1).val();

    let programme = $addForm.find("select").eq(0).val();
    let performance = $addForm.find("select").eq(1).val();

    if (date == '' || price == '' || programme == '' || performance == '') {
        alert("输入有空");
        return false;
    }


    $.ajax({
        url: QueryUserByAccountAPI(account),
        type: "GET",
        xhrFields: {withCredentials: true},
        success: function (res) {
            let theater = res.data.userTheaterId;
            $.ajax({
                url: "http://api.ksgin.online/Good/CreateGood",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},

                data: JSON.stringify(
                    {
                        "programmeId": programme,
                        "theaterId": theater,
                        "performance": performance,
                        "playDate": date,
                        "price": price
                    }
                ),

                success: function (rest) {
                    console.log(rest.msg);
                    if (rest.msg == "the theater is busy") {
                        alert("场次已经排满");
                        return false;
                    }

                    updateProgramme();
                    alert("添加成功！");

                },

                error: function () {

                    return false;
                }
            })
        },
        error: function () {
            console.log(false);
            return false;
        }
    });
}


//查询演出计划
function queryProgramme(i) {
    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id
    if (i == 1) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询演出计划</span>'
            + '<span class="queryProgrammeInput">'
            + '<button class="queryUserBtn" onclick="updateProgramme()">返回</button> '
            + '<button class="queryUserBtn" onclick="SelectGoodByProgramme()">查询</button> '
            + '<select class="select2"><option></option></select>'
            + '<span>场次：</span>'
            + '<input type="date">'
            + '<span>日期：</span>'
            + '<select class="select2">' + '<option></option>'
            + '</select>'
            + '<span>内容：</span>'

            + '</span>'
            + '</div>'
            + '<div class="queryGoodBody">'
            + '</div>'
        );


        $.ajax({
            url: "http://api.ksgin.online/Good/SelectGood/",
            type: "PATCH",

            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({

                "theaterId": theaterId

            }),
            xhrFields: {withCredentials: true},

            success: function (res) {

                $(".select2").eq(0).append(
                    '<option value=""><span>' + "7:00" + '</span></option>'
                );
                $(".select2").eq(0).append(
                    '<option value=""><span>' + "10:00" + '</span></option>'
                );
                $(".select2").eq(0).append(
                    '<option value=""><span>' + "13:00" + '</span></option>'
                );
                $(".select2").eq(0).append(
                    '<option value=""><span>' + "16:00" + '</span></option>'
                );
                $(".select2").eq(0).append(
                    '<option value=""><span>' + "19:00" + '</span></option>'
                );
                $(".select2").eq(0).append(
                    '<option value=""><span>' + "21:00" + '</span></option>'
                );


                $(".select2").eq(0).children().eq(1).attr("value", "早一");
                $(".select2").eq(0).children().eq(2).attr("value", "早二");

                $(".select2").eq(0).children().eq(3).attr("value", "午一");

                $(".select2").eq(0).children().eq(4).attr("value", "午二");

                $(".select2").eq(0).children().eq(5).attr("value", "晚一");

                $(".select2").eq(0).children().eq(6).attr("value", "晚二");
            }
        });


        $.ajax({
            url: "http://api.ksgin.online/Programme",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},

            success: function (res) {

                for (let i = 0; i < res.data.length; i++) {
                    $(".select2").eq(1).append(
                        '<option value=""><span>' + res.data[i].programmeName + '</span></option>'
                    );
                }

                for (let i = 0; i < res.data.length; i++) {
                    $(".select2").eq(1).children().eq(i + 1).attr("value", res.data[i].programmeId);
                }
            }
        });

        updateProgramme();
    }
}

///更新演出计划
function updateProgramme() {
    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id

    $(".TheaterTable").remove();

    $.ajax({
        url: "http://api.ksgin.online/Good/SelectGood",
        type: "PATCH",
        data: JSON.stringify({
            "theaterId": theaterId
        }),
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {
            let $data = res.data;
            $(".queryGoodBody").append(
                '<table id="ProgrammeTable" class="TheaterTable" width="400">'
                + '<tr>'
                + '<th>' + "演出计划Id" + '</th>'
                + '<th>' + "电影名称" + '</th>'
                + '<th>' + "场次" + '</th>'
                + '<th>' + "上映时间" + '</th>'
                + '<th>' + "票价" + '</th>'
                + '</tr>'
                + '</table>'
            );
            for (let i = 0; i < $data.length; i++) {

                let performance;
                switch ($data[i].performance) {
                    case "早一":
                        performance = "7:00";
                        break;
                    case "早二":
                        performance = "10:00";
                        break;
                    case "午一":
                        performance = "13:00";
                        break;
                    case "午二":
                        performance = "16:00";
                        break;
                    case "晚一":
                        performance = "19:00";
                        break;
                    case "晚二":
                        performance = "21:00";
                        break;
                }


                $.ajax({
                    url: "http://api.ksgin.online/Programme/QueryProgrammeById/" + $data[i].programmeId,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    async:false,
                    success: function (ress) {
                        $(".TheaterTable").append(
                            '<tr class="trrTheater" ><td>' + $data[i].goodId + '</td><td>' + ress.data.programmeName + '</td><td>'
                            + performance + '</td><td>' + $data[i].playDate
                            + '</td><td>' + $data[i].price + '</td></tr>'
                        );
                    }
                });
                // $(".TheaterTable").append(
                //     '<tr class="trrTheater" ><td>' + $data[i].goodId + '</td><td>' + $data[i].programmeId + '</td><td>'
                //     + performance + '</td><td>' + $data[i].playDate
                //     + '</td><td>' + $data[i].price + '</td></tr>'
                // );
            }



            changeTheaterMessage();


            $(".bodyDiv").append(
                '<div class="theaterMessageClass">'
                + '<div class="theaterMessageClassBody">'
                + '</div>'
                + '</div>'
            );

            //点击进行操作
            $(function () {
                $(".trrTheater").click(function () {
                    let $id = $(this).children().eq(0).text();
                    console.log(1);
                    $.ajax({
                        url: "http://api.ksgin.online/Good/QueryGood/" + $id,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {
                            console.log(res.msg);
                            if (res.msg == "successful") {
                                queryProgrammeById(res.data);
                                return true;
                            }
                        }
                    });
                });
            });
        }
    });
}


//演出计划详细操作
function queryProgrammeById(res) {

    $(".theaterMessageClass").remove();
    $.ajax({
        url: "http://api.ksgin.online/Good/QueryGood/" + res.goodId,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (rest) {
            $(".bodyDiv").append(
                '<div class="theaterMessageClass">'
                + '<div class="theaterMessageClassBody">'
                + '<ul>'
                + '<li>' + "ID:" + res.goodId + '</li>'
                + '</ul>'
                + '</div>'
                + '<div class="userMessageClassBtnDiv">'
                + '<button onclick="userMessageClassBtn()">确定</button>'
                + '<button onclick="deleteProgramme()">删除</button>'
                + '</div>'
                + '</div>'
            );

            $("#hideDiv").css("display", "block");
            $(".theaterMessageClass").css("display", "block");

            return true;

        },
        error: function () {
            alert("false");
            return false;
        }
    });
}


//改变影厅表格颜色
function changeTheaterMessage() {
    let $cool = $("#ProgrammeTable").children().children();
    for (let i = 1; i < $cool.length; i++) {
        if (i % 2 == 0) {
            $cool.eq(i).children().css("background-color", "white");
        } else {
            $cool.eq(i).children().css("background-color", "#9d9d9d");
        }
    }
}


//删除演出计划
function deleteProgramme() {
    let $i = $(".theaterMessageClassBody").children().eq(0).children().eq(0).text();
    let id = $i.split(":")[1];

    console.log(id);
    let cfd = confirm("确定删除？");

    if (cfd == true) {
        $.ajax({
            url: "http://api.ksgin.online/Good/DeleteGood/" + id,
            type: "DELETE",
            xhrFields: {withCredentials: true},
            success: function (res) {
                updateProgramme();
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

//根据标签筛选演出计划
function SelectGoodByProgramme() {

    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id

    let performance = $(".queryProgrammeInput").find(".select2").eq(0).val();
    let programmeName = $(".queryProgrammeInput").find(".select2").eq(1).val();
    let date = $(".queryProgrammeInput").find("input").val();

    console.log(performance);
    console.log(programmeName);
    console.log(date);

    if (performance == "") {
        performance = null;
    }
    if (programmeName == "") {
        programmeName = 0;
    }
    if (date == "") {
        date = null;
    }

    $.ajax({
        url: "http://api.ksgin.online/Good/SelectGood",
        type: "PATCH",
        data: JSON.stringify({
            "programmeId": programmeName,
            "theaterId": theaterId,
            "performance": performance,
            "playDate": date
        }),
        xhrFields: {withCredentials: true},
        contentType: "application/json; charset=utf-8",
        success: function (res) {

            console.log(res.msg);

            $(".TheaterTable").remove();
            let $data = res.data;

            $(".queryGoodBody").append(
                '<table id="ProgrammeTable" class="TheaterTable" width="400">'
                + '<tr>'
                + '<th>' + "演出计划Id" + '</th>'
                + '<th>' + "电影名称" + '</th>'
                + '<th>' + "场次" + '</th>'
                + '<th>' + "上映时间" + '</th>'
                + '<th>' + "票价" + '</th>'
                + '</tr>'
                + '</table>'
            );


            for (let i = 0; i < $data.length; i++) {
                $(".TheaterTable").append(
                    '<tr class="trrTheater" ><td>' + $data[i].goodId + '</td><td>' + $data[i].programmeId + '</td><td>'
                    + $data[i].performance + '</td><td>' + $data[i].playDate
                    + '</td><td>' + $data[i].price + '</td></tr>'
                );
            }

            changeTheaterMessage();


            $(".bodyDiv").append(
                '<div class="theaterMessageClass">'
                + '<div class="theaterMessageClassBody">'
                + '</div>'
                + '</div>'
            );

            //点击进行操作
            $(function () {
                $(".trrTheater").click(function () {
                    let $id = $(this).children().eq(0).text();
                    console.log(1);
                    $.ajax({
                        url: "http://api.ksgin.online/Good/QueryGood/" + $id,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {
                            console.log(res.msg);
                            if (res.msg == "successful") {
                                queryProgrammeById(res.data);
                                return true;
                            }
                        }
                    });
                });
            });
        },
        error: function () {
            alert("false");
            return false;
        }
    });
}

//售票信息
function ticketMessage(i) {

    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[0];

    let tmp3 = tmp2.split("=")[1];

    let account = tmp3;


    $.ajax({
        url: "http://api.ksgin.online/User/QueryUserByAccount/" + account,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {

            let theaterId = res.data.userTheaterId;

            if (i == 3) {
                $(".choiceBody").eq(i).append(
                    '<div class="personMessageTitle">'
                    + '<span class="span-titA"></span>'
                    + '<span class="span-titB">查询订单信息</span>'
                    + '<span id="queryOrderInput" class="queryProgrammeInput">'

                    + '<button class="queryUserBtn" onclick="updateTicket()">返回</button>'
                    + '<button class="queryUserBtn" onclick="queryByCondition()">查询</button>'

                    + '<select class="select3"><option value=""></option>'
                    + '</select>'
                    + '<span>姓名：</span>'

                    + '<input type="date">'
                    + '<span>日期：</span>'
                    + '<select class="select3">'
                    + '</select>'
                    + '<span>类型：</span>'
                    + '</span>'
                    + '</div>'
                    + '<div class="queryOrderBody">'
                    + '</div>'
                );


                $.ajax({
                    url: "http://api.ksgin.online/Order/SelectOrder",
                    type: "PATCH",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},

                    data: JSON.stringify({
                        "theaterId": theaterId,
                        "type": 1
                    }),

                    success: function (res) {
                        $.ajax({
                            url: "http://api.ksgin.online/User/SelectUser/" + theaterId,
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            xhrFields: {withCredentials: true},
                            success: function (rest) {


                                $(".select3").eq(1).append(
                                    '<option value="0"><span>' + "全部" + '</span></option>'
                                );
                                $(".select3").eq(1).append(
                                    '<option value="1"><span>' + "售票" + '</span></option>'
                                );
                                $(".select3").eq(1).append(
                                    '<option value="-1"><span>' + "退票" + '</span></option>'
                                );

                                for (let i = 0; i < rest.data.length; i++) {

                                    if (rest.data[i].userLevel == "售票员") {
                                        $(".select3").eq(0).append(
                                            '<option><span>' + rest.data[i].userName + '</span></option>'
                                        );

                                        let j = $(".select3").eq(0).find("option").length;

                                        $(".select3").eq(0).find("option").eq(j-1).attr("value", rest.data[i].userId);
                                    }
                                }

                                updateTicket();
                            }
                        });


                    }
                });

            }
        }
    });
}


//更新订单按钮
function updateTicket() {

    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let tmp4 = tmp1.split("&")[0];

    let account = tmp4.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id
    console.log(account);





    $("#OrderTable").remove();

    $.ajax({
        url: "http://api.ksgin.online/Order/SelectOrder",
        type: "PATCH",
        data: JSON.stringify({
            "theaterId": theaterId,
            "type": 0,
        }),
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {


            let $data = res.data;
            let type;

            $(".queryOrderBody").append(
                '<table id="OrderTable" class="TheaterTable" width="400">'
                + '<tr>'
                + '<th>' + "电影" + '</th>'
                + '<th>' + "上映时间" + '</th>'
                + '<th>' + "售票时间" + '</th>'
                + '<th>' + "票价" + '</th>'
                + '<th>' + "影厅" + '</th>'
                + '<th>' + "座位" + '</th>'
                + '<th>' + "订单类型" + '</th>'
                + '<th>' + "售票员" + '</th>'
                + '</tr>'
                + '</table>'
            );

            for (let i = 0; i < $data.length; i++) {

                $.ajax({
                    url: "http://api.ksgin.online/Ticket/QueryTicket/" + $data[i].ticketId, //获得电影名
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function (rest) {


                        $.ajax({
                            url: "http://api.ksgin.online/User/QueryUserById/" + $data[i].userId, //获得员工姓名
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            xhrFields: {withCredentials: true},
                            success: function (restt) {
                                if ($data[i].type == 1) {
                                    type = "售票";
                                } else {
                                    type = "退票"
                                }

                                $("#OrderTable").append(
                                    '<tr class="trrTicket"><td>' + rest.data.name + '</td><td>' + rest.data.date.substring(0, 10) + '</td><td>'
                                    + $data[i].dateTime.substring(0, 10) + '</td><td>' + rest.data.price
                                    + '</td><td>' + rest.data.theaterName + '</td><td>' + rest.data.seatRowNumber + "行" + rest.data.seatColNumber + "列"
                                    + '</td><td>' + type+ '</td><td>' + restt.data.userName
                                    + '</td></tr>'
                                );
                            }
                        })


                    }
                });
            }

        }
    })
}



//按条件筛选
function queryByCondition() {

    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let tmp4 = tmp1.split("&")[0];

    let account = tmp4.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id

    let name = $("#queryOrderInput").find(".select3").eq(0).val();
    let date = $("#queryOrderInput").find("input").val();
    let type = $("#queryOrderInput").find(".select3").eq(1).val();

    if(type == "全部"){
        type = 0;
    }
    if(date == ""){
        date = null;
    }
    if(name == ""){
        userId = 0;
    }

    console.log(type);
    console.log(date);
    console.log(name);
    console.log(theaterId);
    $("#OrderTable").remove();

    $.ajax({
        url: "http://api.ksgin.online/Order/SelectOrder",
        type: "PATCH",
        data: JSON.stringify({
            "theaterId": theaterId,
            "userId": name,
            "tradeDate": date,
            "type": type
        }),
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {

            console.log(res.msg);

            let $data = res.data;
            let type ;


            $(".queryOrderBody").append(
                '<table id="OrderTable" class="TheaterTable" width="400">'
                + '<tr>'
                + '<th>' + "电影" + '</th>'
                + '<th>' + "上映时间" + '</th>'
                + '<th>' + "交易时间" + '</th>'
                + '<th>' + "票价" + '</th>'
                + '<th>' + "影厅" + '</th>'
                + '<th>' + "座位" + '</th>'
                + '<th>' + "订单类型" + '</th>'
                + '<th>' + "售票员" + '</th>'
                + '</tr>'
                + '</table>'
            );

            for (let i = 0; i < $data.length; i++) {
                $.ajax({
                    url: "http://api.ksgin.online/Ticket/QueryTicket/" + $data[i].ticketId, //获得电影名
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    success: function (rest) {

                        // console.log(rest.msg);
                        if($data[i].type === 1){
                            type = "售票";
                        }else{
                            type = "退票"
                        }

                        $("#OrderTable").append(
                            '<tr class="trrTicket"><td>' + rest.data.name + '</td><td>' + rest.data.date.substring(0, 10) + '</td><td>'
                            + $data[i].dateTime.substring(0,19)+ '</td><td>' + rest.data.price
                            + '</td><td>' + rest.data.theaterName + '</td><td>' +rest.data.seatRowNumber+ "行" +rest.data.seatColNumber +"列"
                            +'</td><td>' + type
                            +'</td></tr>'
                        );

                    }
                });
            }

        }
    })
}


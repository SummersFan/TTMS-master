/**
 * Created by 哈哈哈 on 2017/6/8.
 */
let urls = "../html/ticketHTML.html?";
let url = location.href;
let tmp1 = url.split("?")[1];
let tmp2 = tmp1.split("&")[0];
let tmp4 = tmp2.split("=")[1];
let tmp5 = tmp1.split("&")[1];
let theaterId = tmp5.split("=")[1];
let tmp6 = tmp1.split("&")[2];
let tmp7 = tmp6.split("=")[1];
let account = tmp4;
let userId = tmp7;

window.onload = function () {
    let url = location.href;
    let tmp1 = url.split("?")[1];
    let tmp2 = tmp1.split("&")[0];
    let tmp4 = tmp2.split("=")[1];
    let tmp5 = tmp1.split("&")[1];
    let theaterId = tmp5.split("=")[1];
    let tmp6 = tmp1.split("&")[2];
    let tmp7 = tmp6.split("=")[1];
    let account = tmp4;


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


    $(function () {
        $.ajax({
            url: QueryUserByAccountAPI(account),
            type: "GET",
            xhrFields: {withCredentials: true},
            data: JSON.stringify(account),
            success: function (res) {
                let perosn2 = res.data;
                $(".person").text(perosn2.userName);
                if (res.data.userLevel == "售票员") {
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
    userId = $("input").eq(0).val();

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
        '<div class="toolChild">' + "演出计划" + '</div>'
        + '<div class="toolChild">' + "票务信息" + '</div>'
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
    for (let i = 0; i < $(".toolChild").length; i++) {

        $(".messageBody").append(
            '<div class="choiceBody"></div>'
        )
    }


    //根据选项卡修改面板内容
    for (let i = 0; i < $(".toolChild").length; i++) {
        ProgrammeBody(i);
        ticketSeller(i);
        // queryMovie(i);
        // addMovie(i);
    }

    //修改面板状态
    for (let i = 0; i < $(".toolChild").length; i++) {
        $(".toolChild").eq(i).click(function () {
            $(".choiceBody").eq(i).siblings().css("display", "none");
            $(".choiceBody").eq(i).css("display", "block");
        });
    }
}

function queryUsers(i) {
    $(".messageBody").children().eq(i).siblings().css("display", "none");
}

function clickBtn() {
    $(".toolChild").eq(0).click();
}

//演出计划面板
function ProgrammeBody(i) {
    if (i == 0) {

        $(".choiceBody").eq(i).append(
            '<div id="GoodTitle" class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询演出计划</span>'
            + '<span class="queryProgrammeInput">'
            + '<button class="queryUserBtn" onclick="updateProgramme()">返回</button> '
            + '<button class="queryUserBtn" onclick="queryGoodBySelect()">查询</button> '
            + '<select class="select2"><option></option></select>'
            + '<span>场次：</span>'
            + '<input type="date">'
            + '<span>日期：</span>'
            + '<select class="select2">' + '<option></option>'
            + '</select>'
            + '<span>内容：</span>'
            + '</span>'
            + '</div>'
            + '<div class="queryMovieBody">'
            + '</div>'
        );

        $.ajax({
            url: "http://api.ksgin.online/Good/SelectGood",
            type: "PATCH",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            data: JSON.stringify({
                "theaterId": theaterId,
            }),
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
        updateProgramme()
    }
}

///更新演出计划
function updateProgramme() {
    let url = location.href;
    let tmp1 = url.split("?")[1];

    let tmp2 = tmp1.split("&")[1];

    let tmp3 = tmp2.split("=")[1];

    let theaterId = tmp3;  //获得影厅Id

    if ($(".queryMovieBody").children().length != 0) {
        $(".queryMovieBody").children().remove();
    }

    $.ajax({
        url: "http://api.ksgin.online/Good/SelectGood",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "theaterId": theaterId,
        }),
        xhrFields: {withCredentials: true},
        success: function (res) {

            for (let i = 0; i < res.data.length; i++) {
                $.ajax({
                    url: "http://api.ksgin.online/Programme/QueryProgrammeById/" + res.data[i].programmeId,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    async: false,
                    success: function (res1) {

                        let performance;

                        switch (res.data[i].performance) {
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

                        $(".queryMovieBody").append(
                            '<div class="movieDivSell">'
                            + '<img src=""/>'
                            + '<p style="display: none">' + res.data[i].goodId +
                            '</p>'
                            + '<p>' + res1.data.programmeName + '</p><p>' + res.data[i].playDate.substring(0, 10) + " " + performance + '</p></div>'
                        )
                    }

                });
            }


            let movie = $(".movieDivSell");

            for (let i = 0; i < res.data.length; i++) {
                $.ajax({
                    type: "GET",
                    url: " http://api.ksgin.online/Programme/SelectPlayBill/" + res.data[i].programmeId,
                    xhrFields: {withCredentials: true},
                    success: function (rests) {
                        let $src = "http://pic.ksgin.online/" + rests.data;


                        movie.eq(i).find("img").attr("src", $src);

                    },
                    error: function (err) {
                        // alert("上传文件出现错误！");
                        // console.log(err);
                    }
                });

            }

            //添加点击事件
            $(function () {
                $(".movieDivSell").find("img").click(function () {

                    let $id = $(this).parent().children().eq(1).text();
                    $.ajax({
                        url: "http://api.ksgin.online/Good/QueryGood/" + $id,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {

                            ticketManager(res);

                        }
                    });
                });
            });
        }
    });
}

//查询演出计划
function queryGoodBySelect() {
    let $data = $("#GoodTitle").find("input").val();
    let programme = $(".select2").eq(1).val();
    let profile = $(".select2").eq(0).val();


    //日期不为空其它为空
    $(".queryMovieBody").children().remove();


    if ($data == "") {
        $data = null;
    }

    if (programme == "") {
        programme = 0;
    }
    if (profile == "") {
        profile = null;
    }

    $.ajax({
        url: "http://api.ksgin.online/Good/SelectGood",
        type: "PATCH",
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "theaterId": theaterId,
            "programmeId": programme,
            "performance": profile,
            "playDate": $data
        }),
        success: function (res) {

            for (let i = 0; i < res.data.length; i++) {
                $.ajax({
                    url: "http://api.ksgin.online/Programme/QueryProgrammeById/" + res.data[i].programmeId,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    xhrFields: {withCredentials: true},
                    async: false,
                    success: function (res1) {

                        let performance;

                        switch (res.data[i].performance) {
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

                        $(".queryMovieBody").append(
                            '<div class="movieDivSell">'
                            + '<img src=""/>'
                            + '<p style="display: none">' + res.data[i].goodId +
                            '</p>'
                            + '<p>' + res1.data.programmeName + '</p><p>' + res.data[i].playDate.substring(0, 10) + " " + performance + '</p></div>'
                        )
                    }

                });
            }


            let movie = $(".movieDivSell");

            for (let i = 0; i < res.data.length; i++) {
                $.ajax({
                    type: "GET",
                    url: " http://api.ksgin.online/Programme/SelectPlayBill/" + res.data[i].programmeId,
                    xhrFields: {withCredentials: true},
                    success: function (rests) {
                        let $src = "http://pic.ksgin.online/" + rests.data;


                        movie.eq(i).find("img").attr("src", $src);

                    },
                    error: function (err) {
                        // alert("上传文件出现错误！");
                        // console.log(err);
                    }
                });

            }

            //添加点击事件
            $(function () {
                $(".movieDivSell").find("img").click(function () {

                    let $id = $(this).parent().children().eq(1).text();
                    $.ajax({
                        url: "http://api.ksgin.online/Good/QueryGood/" + $id,
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        xhrFields: {withCredentials: true},
                        success: function (res) {

                            ticketManager(res);

                        }
                    });
                });
            });

            return true
        }
    });


}


//票务管理面板
function ticketManager(res) {

    $(".sellTicket").remove();

    $(".messageBody").append(
        '<div class="sellTicket">'
        + '<div class="personMessageTitle">'
        + '<span class="span-titA"></span>'
        + '<span class="span-titB">票务管理</span>'
        + '<span class="queryUserInput">'
        + '<button class="queryUserBtn" onclick="clickBtn()">返回</button>'
        + '<button class="queryUserBtn" onclick="submitOrderBtn()">提交订单</button>'
        + '</span>'
        + '</div>'

        + '<div class="sellTicketBody">'

        + '<div class="sellTicketLeft"></div>'

        + '<div class="sellTicketRight">'
        + '<div class="theaterScreen"></div>'

        + '<div class="hiddenScroll">'
        + '<div class="SeatBody"></div>'
        + '</div>'

        + '</div>'

        + '</div>'
        + '</div>'
    );

    addProgrammeTicket(res);
    updateSeat(res);
}

//给售票添加演出计划信息
function addProgrammeTicket(res) {

    $.ajax({
        url: "http://api.ksgin.online/Programme/SelectPlayBill/" + res.data.programmeId,
        type: "GET",
        xhrFields: {withCredentials: true},
        success: function (rest) {


            let $src = "http://pic.ksgin.online/" + rest.data;

            $(".sellTicketLeft").append(
                '<div class="programmeSell"><img/></div>'
            );


            $(".programmeSell").find("img").attr("src", $src);


            $.ajax({
                url: "http://api.ksgin.online/Programme/QueryProgrammeById/" + res.data.programmeId,
                type: "GET",
                xhrFields: {withCredentials: true},
                success: function (rest1) {

                    $(".programmeSell").append(
                        '<p>' + res.data.goodId + '</p>'
                        + '<p>' + rest1.data.programmeName + '</p>'
                        + '<p>' + "时长:" + rest1.data.programmeDruation + '</p>'
                        + '<p>' + "类型:" + rest1.data.programmeTags + '</p>'
                        + '<p>' + "票价:" + res.data.price + '</p>'
                    );

                }
            })
        }
    });
}

//通过计划信息添加演出场次
function updateSeat(resParent) {
    $(".SeatBody").children().remove();
    $.ajax({
        url: "http://api.ksgin.online/Theater/QueryTheater/" + theaterId,
        type: "GET",
        xhrFields: {withCredentials: true},
        success: function (res) {

            let row = res.data.theaterSeatRowsCount;
            let col = res.data.theaterSeatColsCount;
            let goodId = resParent.data.goodId;

            $.ajax({
                url: "http://api.ksgin.online/Ticket/SelectTicket/" + goodId,
                type: "GET",
                xhrFields: {withCredentials: true},
                success: function (rest) {
                    $(".SeatBody").append(
                        '<div class="explainTicket">'
                        + '<div ><img src="../img/seat/座位未选择.gif"></div><div >未选择 </div>'
                        + '<div ><img src="../img/seat/座位故障.gif"></div><div > 故障</div>'
                        + '<div ><img src="../img/seat/座位已选择.gif"></div><div > 已选择</div>'
                        + '<div ><img src="../img/seat/座位已售.gif"></div><div> 已售</div>'
                        + '</div>'
                    )


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
                            + '<p style="display:none ">' + rest.data[i].id + '</p>'
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


                        if (rest.data[i].status == 1) {
                            $(".seatDiv").eq(i).find("img").attr("src", "../img/seat/座位未选择.gif");
                        } else if (rest.data[i].status == 2) {
                            $(".seatDiv").eq(i).find("img").attr("src", "../img/seat/座位故障.gif");
                        } else if (rest.data[i].status == 0) {
                            $(".seatDiv").eq(i).find("img").attr("src", "../img/seat/座位已售.gif");
                        }

                        if (sessionStorage.getItem(rest.data[i].id) == 1) {
                            $(".seatDiv").eq(i).find("img").attr("src", "../img/seat/座位已选择.gif");
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

//添加点击座位操作
function clickOfSeat() {

    $(".seatDiv").find("img").click(function () {

        if ($(this).attr("src") == "../img/seat/座位未选择.gif") {
            $(this).attr("src", "../img/seat/座位已选择.gif");
            let id = $(this).parent().find(".seatMessageIn").find("p").text();
            sessionStorage.setItem(id, 1);

        } else if ($(this).attr("src") == "../img/seat/座位已选择.gif") {
            $(this).attr("src", "../img/seat/座位未选择.gif");

        } else if ($(this).attr("src") == "../img/seat/座位已售.gif") {
            let cfn = confirm("是否退票");
            if (cfn == true) {
                let id = $(this).parent().find("p").text();

                ReturnedTicketBtn(id);
                $(this).attr("src", "../img/seat/座位未选择.gif");
            }
        }

    })
}


//退票操作
function ReturnedTicketBtn(id) {
    $.ajax({
        url: "http://api.ksgin.online/Ticket/ReturnedTicket/" + id + "&" + userId,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        asnyc: false,
        xhrFields: {withCredentials: true},
        success: function (res) {
            console.log(res.msg);
            alert("退票成功");
        }
    })
}


//确认提交订单按钮
function submitOrderBtn() {
    sessionStorage.clear();
    let $img = $(".seatDiv").find("img");

    let priceText = $(".programmeSell").find("p").eq(4).text().split(":")[1];
    let price = parseInt(priceText);
    let money = 0;


    for (let i = 0; i < $img.length; i++) {

        if ($img.eq(i).attr("src") == "../img/seat/座位已选择.gif") {

            let id = $img.eq(i).parent().find("p").text();

            money += price;
            urls += "&id="+id;

            sessionStorage.setItem("sellTicket"+id,id);

            $.ajax({
                url: "http://api.ksgin.online/Ticket/SellTicket/" + id,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},
                success: function (res) {
                    console.log(res.msg);
                }
            })
        }
    }


    let cfd = confirm("订单已提交，总价钱为：" + money + "元。\n" + "是否完成支付?");

    if (cfd == true) {
        payBtn();
    }
}


//支付按钮
function payBtn() {
    let $img = $(".seatDiv").find("img");

    for (let i = 0; i < $img.length; i++) {

        if ($img.eq(i).attr("src") == "../img/seat/座位已选择.gif") {

            let id = $img.eq(i).parent().find("p").text();

            console.log(id);

            $.ajax({
                url: "http://api.ksgin.online/Ticket/PayTicket/" + id + "&" + userId,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                xhrFields: {withCredentials: true},
                success: function (res) {
                    console.log(res.msg);

                    $img.eq(i).attr("src", "../img/seat/座位已售.gif")
                }
            })
        }
    }
    alert("支付成功");
    window.open(urls);
}
//定时刷新售票面板
// window.setInterval(show,20000);

function show() {

    let id = $(".programmeSell").find("p").eq(0).text();

    if (id != "") {
        console.log(id);
        $.ajax({
            url: "http://api.ksgin.online/Good/QueryGood/" + id,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                updateSeat(res);
            }
        });
    }
}


//个人票务信息
function ticketSeller(i) {
    if (i == 1) {
        $(".choiceBody").eq(i).append(
            '<div class="personMessageTitle">'
            + '<span class="span-titA"></span>'
            + '<span class="span-titB">查询订单信息</span>'
            + '<span id="queryOrderInput" class="queryProgrammeInput">'
            + '<button class="queryUserBtn" onclick="updateTicket()">返回</button>'
            + '<button class="queryUserBtn" onclick="queryByCondition()">查询</button>'

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
                "userId": userId,
                "type": 1
            }),

            success: function (res) {
                console.log(res.msg);
                $(".select3").eq(0).append(
                    '<option value="0"><span>' + "全部" + '</span></option>'
                );
                $(".select3").eq(0).append(
                    '<option value="1"><span>' + "售票" + '</span></option>'
                );
                $(".select3").eq(0).append(
                    '<option value="-1"><span>' + "退票" + '</span></option>'
                );

                updateTicket();
            }
        });
    }
}

//更新订单按钮
function updateTicket() {
    $("#OrderTable").remove();
    $.ajax({
        url: "http://api.ksgin.online/Order/SelectOrder",
        type: "PATCH",
        data: JSON.stringify({
            "theaterId": theaterId,
            "userId": userId,
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
                        if ($data[i].type === 1) {
                            type = "售票";
                        } else {
                            type = "退票"
                        }

                        $("#OrderTable").append(
                            '<tr class="trrTicket"><td>' + rest.data.name + '</td><td>' + rest.data.date.substring(0, 10) + '</td><td>'
                            + $data[i].dateTime.substring(0, 19) + '</td><td>' + rest.data.price
                            + '</td><td>' + rest.data.theaterName + '</td><td>' + rest.data.seatRowNumber + "行" + rest.data.seatColNumber + "列"
                            + '</td><td>' + type
                            + '</td></tr>'
                        );

                    }
                });
            }
        }
    })
}


//按条件筛选
function queryByCondition() {

    let type = $("#queryOrderInput").find(".select3").eq(0).val();
    let date = $("#queryOrderInput").find("input").val();


    if (type == "全部") {
        type = 0;
    }
    if (date == "") {
        date = null;
    }


    $("#OrderTable").remove();

    $.ajax({
        url: "http://api.ksgin.online/Order/SelectOrder",
        type: "PATCH",
        data: JSON.stringify({
            "theaterId": theaterId,
            "userId": userId,
            "tradeDate": date,
            "type": type
        }),
        contentType: "application/json; charset=utf-8",
        xhrFields: {withCredentials: true},
        success: function (res) {

            console.log(res.msg);

            let $data = res.data;
            let type;


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
                        if ($data[i].type === 1) {
                            type = "售票";
                        } else {
                            type = "退票"
                        }

                        $("#OrderTable").append(
                            '<tr class="trrTicket"><td>' + rest.data.name + '</td><td>' + rest.data.date.substring(0, 10) + '</td><td>'
                            + $data[i].dateTime.substring(0, 19) + '</td><td>' + rest.data.price
                            + '</td><td>' + rest.data.theaterName + '</td><td>' + rest.data.seatRowNumber + "行" + rest.data.seatColNumber + "列"
                            + '</td><td>' + type
                            + '</td></tr>'
                        );

                    }
                });
            }
        }
    })
}


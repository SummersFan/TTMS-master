/**
 * Created by CainSummer on 2017/6/11.
 */


let url = location.href;

window.onload = function () {

    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        $.ajax({
            url: "http://api.ksgin.online/Ticket/QueryTicket/" + value,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            xhrFields: {withCredentials: true},
            success: function (res) {
                console.log(res.msg);

                $("body").append(
                    '<br/>'
                    + '<div class="ticketDiv" >'

                    + '<div class="ticketTop">'
                    + '<div class="imgDiv"><img src="../img/xiyou2.jpg"></div><div class="ticketTitle">西游大剧院</div> '
                    + '</div> '

                    + '<div class="ticketBottom">'

                    + '<div class="ticketMessage">' + '<div class="ticketMessageTheater"><p>影厅：</p>' + res.data.theaterName + '</div>'

                    + '<div class="ticketMessageTime">' + '<p>座位:</p>' + res.data.seatRowNumber + "行" + res.data.seatColNumber + "座"
                    + '</div> '
                        +'</div>'
                    + '<div class="ticketMessageName"><span>电影名:</span>' + res.data.name + "<br/>"
                    + '<span>时长:</span>' + res.data.duration + "<br/>"
                    + '<span>类型:</span>' + res.data.tage + "<br/>"
                    + '<span>上映时间:</span>' + res.data.date.substring(0,10) + "<br/>"
                    + '</div>'

                    +'<div class="ticketMessage"></div>'
                    + '</div>'

                    + '</div> '

                    + '</div>'
                    + '<br/>'
                )
            }
        })


    }

    sessionStorage.clear();
};
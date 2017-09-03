/**
 * Created by CainSummer on 2017/5/22.
 */
// 登陆模块

let LoginUser =
        {
            "account": "",
            "password": "",
            "verCode":""
        };

let num;


let person = {
    "userId": "",
    "userName": "",
    "userAccount": "",
    "userPassword": "",
    "userCreateTime": "",
    "userLastSignInTime": "",
    "userLevel": "",
    "userSex": "",
    "userAvatar": null,
    "userTel": "",
    "userTheaterId": -1
};

function findUser(Account, PassWord, user) {

    for (let i = 0; i < user.length; i++) {
        if (Account === user[i].userAccount && PassWord === user[i].userPassword) {
            return true;
        }
    }

    return false;
}


function changePersion(user) {
    person.userId = user.userId;
    person.userName = user.userName;
    person.userAccount = user.userAccount;

}


// function signUserFuc(user) {
//     let Account = $("#signUserAccount").val();
//     let Password = $("#signUserPassword").val();
//     let IC = $("#identifyingCodeInput").val();
//
//     if (IC != 2907) {
//         alert("验证码错误！");
//         return false;
//     }
//
//     if (findUser(Account, Password, user.data) == true) {
//         console.log(true);
//
//         //页面跳转
//         person.userName = user
//
//     } else {
//         alert("用户名或者密码错误！");
//         return false;
//     }
// }

function changeVerCode() {

    let $src = "";

    $.ajax({
        url: "http://api.ksgin.online/Home/VerCode",
        type:"GET",
        xhrFields: { withCredentials: true },
        crossDomain: true,
        async:false,
        success : function (res) {
            $src = "data:img/png;base64," + res.base64;
          $("#verCodeImg").attr('src',$src);
        }
    });
}


window.onload = function () {
    changeVerCode();
};



//登陆判断
function signUserBtn(rest) {

    let Account = $("#signUserAccount").val();
    let Password = $("#signUserPassword").val();
    let verCode = $("#identifyingCodeInput").val();


    LoginUser.account = Account;
    LoginUser.password = Password;
    LoginUser.verCode = verCode;


    let aa = $("#signForm").serialize();

    $(function () {

        $.ajax({
            url: LoginAPI(),
            type: "PATCH",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            xhrFields: { withCredentials: true },
            crossDomain: true,
            data: JSON.stringify(
                LoginUser
            ),
            success: function (res) {

                console.log(res);

                if(res.msg=="wrong verCode"){
                    alert("验证码错误！");
                    changeVerCode();
                    return false;
                }

                if (res.msg == "successful") {
                    let parm1=Account;
                    let parm2=Password;

                    $.ajax({
                        url:"http://api.ksgin.online/User/QueryUserByAccount/"+Account,
                        xhrFields: { withCredentials: true },
                        type:"GET",
                        success:function (res) {

                            let parm3 = res.data.userTheaterId;
                            let parm4 = res.data.userId;

                            console.log(parm3);

                            if(res.data.userLevel == "系统管理员"){
                                let myurl="html/frameHTML.html"+"?"+"account="+parm1;
                                window.location.assign(myurl);
                                return true;
                            }

                            if(res.data.userLevel== "剧院经理"){
                                let myurl="html/ticketManagerHTML.html"+"?"+"account="+parm1+"&"+"userTheaterId"+"="+parm3;
                                window.location.assign(myurl);
                                return true;
                            }

                            if(res.data.userLevel == "售票员"){

                                let myurl="html/ticketSeller.html"+"?"+"account="+parm1+"&"+"userTheaterId"+"="+parm3+"&"+"userId"+"="+parm4;
                                console.log(myurl);
                                window.location.assign(myurl);

                            }


                        }
                    });


                    // console.log(xhr.getResponseHeader("Cookie"));

                } else {
                    alert("用户名或密码错误！");
                    return false;
                }
            },
            error: function () {
                alert("false");
                return false;
            }
        });
    })
}
//frame框架



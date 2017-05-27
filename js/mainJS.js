/**
 * Created by CainSummer on 2017/5/22.
 */
// 登陆模块

let LoginUser =
        {
            "account": "",
            "password": ""

        };


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

function signUserBtn() {
    // signAPI();

    let Account = $("#signUserAccount").val();
    let Password = $("#signUserPassword").val();
    let IC = $("#identifyingCodeInput").val();

    if (IC != 2907) {
        alert("验证码错误！");
        return false;
    }

    LoginUser.account = Account;
    LoginUser.password = Password;

    let aa = $("#signForm").serialize();

    $(function () {
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236

=======
>>>>>>> fixedBy YuFan
        $.ajax({
            url: LoginAPI(),
            type: "PATCH",
            contentType: "application/json; charset=utf-8",
            datatype: "jsonp",
            data: JSON.stringify(
                LoginUser
            ),
            success: function (res) {
<<<<<<< ac420c2ff627a312ea118d56c3938fafc1046236
                alert(res.msg);
=======
>>>>>>> fixedBy YuFan
                if (res.msg == "successful") {
                    let parm1=Account;
                    let parm2=Password;
                    let myurl="html/frameHTML.html"+"?"+"account="+parm1;
                    window.location.assign(myurl);
                } else {
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



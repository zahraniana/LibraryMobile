function init() {
 document.addEventListener("deviceready", deviceReady, true);
 delete init;
}

function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("click");
    if (u != '' && p != '') {

        $.ajax({
            url: 'http://staff.kfupm.edu.sa/library/zahrani/SharePointWebService.asmx/AuthenticateUser',
            data: { userName: u, password: p },
            dataType: "xml",
            type: 'GET',
            success: function (res) {
                var myXML = res.responseText;
                // This is the part xml2Json comes in.
                var JSONConvertedXML = $.xml2json(myXML);
                alert(JSONConvertedXML);
                if (JSONConvertedXML == true) {
                    window.localStorage["username"] = u;
                    window.localStorage["password"] = p;
                    navigator.notification.alert("Your login suceeded");
                    // $.mobile.changePage("some.html");
                } else {
                    navigator.notification.alert("Your login failed", function () { });
                }
                $("#submitButton").removeAttr("disabled");
                $.mobile.hidePageLoadingMsg();
            }
        });
    }
    return false;
}

function deviceReady() {
    $("#loginForm").on("submit", handleLogin);
}
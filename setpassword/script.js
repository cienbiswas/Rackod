// -------------------------------------------
// SETPASSWORD - JS - Script
// @author: Moritz Mitterdorfer
// @date: 2019-09-23
// @version: 1.0
// -------------------------------------------

_setpassword = () => {

    let data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        password2: document.getElementById("password2").value
    }

    if(data.username && data.username != "") {
        if(data.password && data.password2 && data.password == data.password2) {
            
            // send data to API endpoint
            let api = "https://rackod.com/course/API/endpoints/verify.php?username=" + data.username + "&password=" + data.password;
            let req = new XMLHttpRequest();
            req.responseType = 'json';
            req.open('GET', api, true);
            req.onload = () => {
                let res = req.response;
                if(res.status == "200") {
                    $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-success\" role=\"alert\">" +
                        "Username successfully set" +
                    "</div></div>");
                    window.location = "../login";
                } else {
                    $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                        "Username does not exist or password has already been set!" +
                    "</div></div>");
                }

            }
            req.send(null);

        } else {
            $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                "Your passwords do not match!" +
            "</div></div>");
        }
    } else {
        $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                "Type in your username!" +
            "</div></div>");
    }

}
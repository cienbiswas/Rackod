// -------------------------------------------
// LOGIN - JS - Script
// @author: Moritz Mitterdorfer
// @date: 2019-09-23
// @version: 1.0
// -------------------------------------------

// when button login is clicked
function login()  {

    // check if username is not ""
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if(username === "") {
        $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
        "Type in your username!" +
      "</div></div>");
    } else {

        // make API call
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', 'https://rackod.com/course/API/endpoints/login.php?username=' + username + '&password=' + password, true);
        req.onload = () => {
            let res = req.response;
            
            if(res.status === "200") {
                // user successfully logged in

                // set cookie
                $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-success\" role=\"alert\">" +
                "Successfully logged in" +
              "</div></div>");

                let sessionToken = res.credentials.sessionToken;
                let username = res.user.Username;
                Cookies.set('username', username);
                Cookies.set('sessionToken', sessionToken);

                window.location = "../";
            }

            else if(res.status === "403") {
                $('#message').html("<br><div class=\"container p-1\"><div class=\"alert alert-danger\" role=\"alert\">" +
                    "Username or password is not correct!" +
                "</div></div>");
            }

        }
        req.send(null);
    }
}
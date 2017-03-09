// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    template7Pages: true,
    precompileTemplates: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

/* @TODO FizzQuizzAWS credentials */
// Setup your FizzQuizzAWS applicationId and API key
var applicationId = 'xxx';
var restApiKey = 'yyy';


// Funcion to handle Cancel button on Login page
$$('#cancel-login').on('click', function() {
    // Clear field values
    $$('#user_name_input').val('');
    $$('#user_pass_input').val('');
});

$$('.view').addClass('theme-red layout-light');





var base_url = "http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/laravel";


function noNet(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success(JSON.parse(xhr.responseText));
                }
            } else {
                window.location.replace("nonet.html");
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

noNet(base_url + '/json.php',
    function(data) {
        for (i = 0; i < data.length; i++) {
            //document.getElementById("result1").innerHTML += '<li> ' + data[i]['name'] + '</li>';
            console.log(data[i]['name']);
        }
    }
);
// END connection to server


// START checking if user is logged
function check_storage() {

    if (localStorage['userlogin']) {
        //  $ionicModal.fromTemplateUrl('templates/login.html');
        //	window.location.replace("main.html");

        $('.login-button, .register-button').hide();
        $('.logout-button').show();
        $('.right').show();
        $('#welcomenav').removeClass('cached');

        console.log('logged');
    } else {
        console.log('err');
        //window.location.replace("index.html");mainView.router.load({
      /*  mainView.router.load({
            template: Template7.templates.guestTemplate,*/
            /*  context: {
                name: username
              }*/
      /*  });*/
        $('.login-button, .register-button').show();
        $('.logout-button').hide();
          $('.right').hide();

    }

}
check_storage();

// END checking if user is logged




// START login
function signin() {
    myApp.showIndicator();
    var user_name_input = $('#user_name_input')
        .val();
    var user_pass_input = $('#user_pass_input')
        .val();

    var username = user_name_input
    var password = user_pass_input;

    $.post(base_url + '/loginuser', {
            //username: user_name_input,
            //password: user_pass_input
            username,
            password
        })

        .done(function(data) {
            if (data == 0) {
                myApp.hideIndicator();
                //  if (!username || !password){
                myApp.alert('Username and Password incorrect');
                return;
                //}


                /*  $('#login_username_error')
                      .show();
                  $('#login_password_error')
                      .show();*/
            } else if (data == 1) {

              mainView.router.load({
                  template: Template7.templates.welcomeTemplate,
                  context: {
                        name: username
                  }
              });
              $('.login-button, .register-button').hide();
              $('.logout-button').show();
              $('.navbar-inner.right').show();
              $('#welcomenav.navbar-inner').removeClass('cached');
                $('#loginnav.navbar-inner').addClass('cached');
                myApp.hideIndicator();

                localStorage.setItem("userlogin", user_name_input);
                get_Quiz_History();
                localStorage.setItem("userQuizRecord", get_Quiz_History);
                localStorage.setItem("userData", data);

                console.log("get_Quiz_History")
                console.log('Response body: ' + data);

                // Will pass context with retrieved user name
                // to welcome page. Redirect to welcome page
                mainView.router.load({
                    template: Template7.templates.welcomeTemplate,
                    context: {
                        name: username
                    }
                });



                //	window.location.href = "main.html";

            }
        });
}
// END login


$(function() {
    var user = localStorage.getItem('userlogin');

    /*if (userlogin != 'blank') {
     window.location.replace("main.html");
     }

     */

    $.getJSON(base_url + '/get_user_details/' + user, function(result) {

        $.each(result, function(i, field) {
            // $("#output").append("<tr><td>Username:  "+ field.username + " </td></tr><tr><td>Password: "+ field.password + "</td></tr>");
            //  $('#userid').val(field.id);
            $('#username')
                .val(field.username);
            $('#password')
                .val(field.password);
            $('#firstname')
                .val(field.fname);
            $('#lastname')
                .val(field.lname);
            $('#email')
                .val(field.email);
            $('#division')
                .val(field.division);
            $('#unit')
                .val(field.aunit);
            $('#area')
                .val(field.area);
            $('#avatar')
                .val(field.avatar);

            if ($('#avatar')
                .val() == "" || $('#avatar')
                .val() == null) {
                var profile_photo = base_url + '/upload/files/' + 'daenerys.png';
            } else {
                var profile_photo = base_url + '/upload/files/' + field.avatar;
            }

            //var profile_photo =  base_url + '/upload/files/' + field.avatar;
            // $('#avatar').html('<div class="avatar" style="background-image: url("+ profile_photo +")');
            $('#avatar')
                .css('background-image', 'url(' + profile_photo + ')');
            $("#avatar")
                .empty();
            //for profile
            $('#userfirstname, .profile-firstname')
                .text(field.fname);
            $('#userusername, .profile-id')
                .text(field.username);
            $('#userlastname, .profile-lastname')
                .text(field.lname);
            $('#useremail, .profile-email')
                .text(field.email);
            $('#userdivision, .profile-division')
                .text(field.division);
            $('#userunit, .profile-unit')
                .text(field.aunit);
            $('#userarea, .profile-area')
                .text(field.area);
            $('#avatar, .profile-avatar')
                .text(field.avatar);

            //$('#user_id').text(field.id);
            $('#user_name')
                .text(field.username);
            $('#user_username')
                .text(field.username);
            $('#user_password')
                .text(field.password);
            $('#user_division')
                .text(field.division);
            $('#user_aunit')
                .text(field.aunit);
            $('#user_firstname')
                .text(field.fname);
            $('#user_lastname')
                .text(field.lname);
            $('#user_email')
                .text(field.email);
            $('#user_privilege')
                .text(field.privilege);

            console.log('ID:', field.id);
            console.log('User Name:', field.username);

            console.log('Password:', field.password);
            console.log(field.fname);
            console.log(field.lname);
            console.log(field.email);
            console.log(field.division);
            console.log(field.aunit);
            console.log(field.area);
            console.log(field.avatar);

            localStorage.setItem('user_id', field.id);
            localStorage.setItem('user_division', field.division);
            localStorage.setItem('user_area', field.area);
            localStorage.setItem('user_aunit', field.aunit);
            // console.log(field.lang);
            // get_Quiz_History();

            var myDivision = localStorage.getItem("user_division");
            var str = myDivision.replace(/\s/g, '');
            console.log('My Division is:', str);
            localStorage.setItem('str', str);
            //console.log("fizzquizz" + str + ".html");
            var fizzquizz = "fizzquizz" + str + ".html";
            localStorage.setItem('fizzquizz', fizzquizz);
            console.log("My FizzQuizz is:", fizzquizz);

            var quizlink = localStorage.getItem('fizzquizz');

            $('#getStarted2')
                .on('click', function(e) {
                    e.preventDefault();
                    // var checkLQuiz = localStorage.getItem('fizzquizz');

                    // window.location.replace(fizzquizz);
                    //  window.location.replace('fizzquizzData.html');
                    console.log('Confirm my FizzQuizz link:', fizzquizz);

                });

        });
    });
});

function myProfile() {
    var user = localStorage.getItem('userlogin');
    //loaderSpinMini();

    myApp.showIndicator();
    $.getJSON(base_url + '/get_user_details/' + user, function(result) {

        $.each(result, function(i, field) {
            // $("#output").append("<tr><td>Username:  "+ field.username + " </td></tr><tr><td>Password: "+ field.password + "</td></tr>");
            //  $('#userid').val(field.id);
            $('#username')
                .val(field.username);
            $('#password')
                .val(field.password);
            $('#firstname')
                .val(field.fname);
            $('#lastname')
                .val(field.lname);
            $('#email')
                .val(field.email);
            $('#division')
                .val(field.division);
            $('#unit')
                .val(field.aunit);
            $('#area')
                .val(field.area);
            $('#avatar').val(field.avatar);

            if ($('#avatar').val() == "" || $('#avatar').val() == null) {
                var profile_photo = base_url + '/upload/files/' + 'daenerys.png';
            } else {
                var profile_photo = base_url + '/upload/files/' + field.avatar;
            }

            //var profile_photo =  base_url + '/upload/files/' + field.avatar;
            // $('#avatar').html('<div class="avatar" style="background-image: url("+ profile_photo +")');
            $('#avatar').css('background-image', 'url(' + profile_photo + ')');
            $("#avatar").empty();
            //for profile
            $('#userfirstname')
                .text(field.fname);
            $('#userusername')
                .text(field.username);
            $('#userlastname')
                .text(field.lname);
            $('#useremail')
                .text(field.email);
            $('#userdivision')
                .text(field.division);
            $('#userunit')
                .text(field.aunit);
            $('#userarea')
                .text(field.area);
            $('#avatar').text(field.avatar);


            //$('#user_id').text(field.id);
            $('#user_name')
                .text(field.username);
            $('#user_username')
                .text(field.username);
            $('#user_password')
                .text(field.password);
            $('#user_division')
                .text(field.division);
            $('#user_aunit')
                .text(field.aunit);
            $('#user_firstname')
                .text(field.fname);
            $('#user_lastname')
                .text(field.lname);
            $('#user_email')
                .text(field.email);
            $('#user_privilege')
                .text(field.privilege);

            console.log('ID:', field.id);
            console.log('User Name:', field.username);

            console.log('Password:', field.password);
            console.log(field.fname);
            console.log(field.lname);
            console.log(field.email);
            console.log(field.division);
            console.log(field.aunit);
            console.log(field.area);
            console.log(field.avatar);

        });
    });
}

function update_cancel() {
    $('#profileContent')
        .show();
    $('#editmyProfile')
        .hide();
}

function update_user() {
    myApp.showIndicator();
    // var id = $('#user_id').val();
    var username = $('#username')
        .val();
    var password = $('#password')
        .val();
    var fname = $('#firstname')
        .val();
    var lname = $('#lastname')
        .val();
    var user_email = $('#email')
        .val();
    var division = $('#division')
        .val();
    var aunit = $('#unit')
        .val();
    var area = $('#area')
        .val();
    // var privilege = $('#user_privilege').val();

    $.post(base_url + '/update/user', {
            username: username,
            password: password,
            fname: fname,
            lname: lname,
            user_email: user_email
        })

        // $.post(base_url + '/update/user', {username: username, password: password})
        .done(function(data) {
            if (data == 0) {
                myApp.hideIndicator();
                $('#update_0')
                    .show();

            } else if (data == 1) {
                myApp.hideIndicator();
                $('#update_1')
                    .show();

                $('.profile-content')
                    .show();
                $('#editmyProfile')
                    .hide();
                //$('#user_id').text(id);

                /*$('#user_name').text(username);*/
                $('#user_password')
                    .text(password);
                $('#user_firstname')
                    .text(fname);
                $('#user_lastname')
                    .text(lname);
                $('#user_division')
                    .text(division);
                $('#user_email')
                    .text(user_email);

                //  window.location.reload();
            }
        });

}

function edittheProfile() {

    //alert('profile');
    $('#profileContent').hide();
    $('#editmyProfile').show();

}

function showImageLoader() {
   $('#capturePhoto').show();
      imageProfile();

  /*  mainView.router.load({
        template: Template7.templates.capturePhotoTemplate,
        context: {
            //  name: username
        }
    });
    imageProfile();*/
}

function canceluploadImage(){
  $('#capturePhoto').hide();
}

function imageProfile() {
    //http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/laraveladmin/uploadpicc
    $(document).ready(function() {

        $('#user_iddddddd').val(localStorage.getItem('user_id'));

        var options = {
            // target: '#upload_loading',
            beforeSubmit: showRequest(),
            // correctOrientation: true,
            success: showResponse()
        };
        $('#myForms').ajaxForm(options);




    function showRequest(formData, jqForm, options) {
        var queryString = $.param(formData);
        myApp.showIndicator();
        console.log(formData);
    }

    function showResponse(responseText, statusText, xhr, $form) {
        myApp.showIndicator();
        // $('#loader-mini').show();
        console.log(statusText);
        console.log(responseText);
        if (statusText == 'success') {
            // $('#page_loader_cb').fadeOut(100);

            $('#upload_input').val('');

            //  $('#upload_input').val('');
            console.log('upload complete');
            myApp.alert('Upload complete');
            //   $('#loader-mini').hide();
            /*$('#smallImage').val('');
             $('#largeImage').val('');*/
            if (responseText == '0') {
                console.log('Error or file not supported! required format :png,gif,jpeg sie: less than 3mb');
            } else {
                console.log('Upload success!');
                //   navigator.notification.alert('Process complete');
                myApp.alert('Process complete');
                $('#capturePhoto').hide();
                window.location.reload();

            }
        }
    }

      });

}


$(function() {


    $("#aunit").change(function() {

        var $dropdown = $(this);

        $.getJSON("json/data.json", function(data) {

            var key = $dropdown.val();
            var vals = [];

            switch (key) {
                case 'west':
                    vals = data.west.split(",");
                    break;
                case 'central':
                    vals = data.central.split(",");
                    break;
                case 'east':
                    vals = data.east.split(",");
                    break;
                case 'base':
                    vals = ['Please choose from above'];
            }

            var $jsontwo = $("#reg_area");
            $jsontwo.empty();
            $.each(vals, function(index, value) {
                $jsontwo.append("<option>" + value + "</option>");
            });

        });
    });

});


function log_out() {
    localStorage.removeItem('userlogin');
    //  window.location.replace("index.html");
    window.localStorage.clear();


    mainView.router.load({
        template: Template7.templates.guestTemplate
        //  context: {
        //name: username
        //}
    })

}

function get_Quiz_History() {
    $('#output')
        .empty();
    var user_id = localStorage.getItem('user_id');
    $('#output')
        .html('<th colspan="4" style="padding: 0 5px; background: silver;"><h5>Stats</h5></th>');
    $.getJSON(base_url + '/get_user_quiz_history/' + user_id, function(results) {

        //$.each(result, function ( i, field ) {
        $.each(results, function(i, fields) {

            $("#output")
                .append("<tr><td><label>Set</label></td><td> " + fields.datefrom + " </td><td><label>Score</label></td><td>" + fields.score_bottle + "</td></tr>");

            $("#output2")
                .append("<li> " + fields.datefrom + " </li>");

            var checkLQuiz = $("#output2 li:nth-child(1)")
                .text();
            console.log("checkLQuiz", checkLQuiz);
            localStorage.setItem('checkLQuiz', checkLQuiz);

        });
    })
}
/******************************************/



/*
// Funcion to handle Submit button on Login page
$$('#submmit-login').on('click', function () {

    var username = $$('#user_name_input').val();
    var password = $$('#user_pass_input').val();

    console.log('Submit clicked');
    console.log('username: ' +username);
    console.log('password: ' +password);

    var query = base_url+'/loginuser?username='+username+'&password='+password;
    myApp.showIndicator();

    // Using Ajax for communication with Parse backend
    // Note mandatory headers with credentials required
    // by Parse. HTTP communication responses are handled
    // in success / error callbacks
	$$.ajax({
		url: query,
	//	headers: {"X-Parse-Application-Id":applicationId,"X-Parse-REST-API-Key":restApiKey},
  //  header: {"Access-Control-Allow-Origin: *"},
	    type: "GET",
	    // if successful response received (http 2xx)
	    success: function(data, textStatus ){

	    	// We have received response and can hide activity indicator
	   		myApp.hideIndicator();

	   		data = JSON.parse(data);
	   		if (!data.username) {return}

	   		var username = data.username;

			// Will pass context with retrieved user name
			// to welcome page. Redirect to welcome page
			mainView.router.load({
				template: Template7.templates.welcomeTemplate,
				context: {
					name: username
				}
			});
	    },
	    error: function(xhr, textStatus, errorThrown){
	    	// We have received response and can hide activity indicator
	    myApp.hideIndicator();
			myApp.alert('Login was unsuccessful, please verify username and password and try again');

			$$('#user_name_input').val('');
			$$('#user_pass_input').val('');
	    }
	});
}); */



// Function to handle Submit button on Register page
//$$('#submmit-register').on('click', function () {
//myApp.showIndicator();



// START Register
function register() {

    myApp.showIndicator();


    var username = $('#reg_username').val();
    var password = $('#reg_password').val();
    var fname = $('#reg_fname').val();
    var lname = $('#reg_lastname').val();
    var email = $('#reg_email').val();
    var division = $('#division').val();
    var aunit = $('#aunit').val();
    var area = $('#reg_area').val();
    var lang = $('#reg_lang').val();


    if (username == '' || password == '' || fname == '' || lname == '') {

        if (username == '') {
            $('#reg_username_err').show();
        }
        if (password == '') {
            $('#reg_password_err').show();
        }
        if (fname == '') {
            $('#reg_fname_err').show();
        }
        if (lname == '') {
            $('#reg_lastname_err').show();
        }
        if (email == '') {
            $('#reg_email_err').show();
        }
        if (division == '') {
            $('#reg_division_err').show();
        }
        if (aunit == '') {
            $('#reg_aunit_err').show();
        }
        if (area == '') {
            $('#reg_area_err').show();
        }
        if (lang == '') {
            $('#reg_lang_err').show();
        }
        console.log('err empty field');
        myApp.hideIndicator();
        myApp.alert('Fields should not be empty.');
    } else {


        $.post(base_url + '/register/user', {
                username: username,
                password: password,
                fname: fname,
                lname: lname,
                email: email,
                division: division,
                aunit: aunit,
                area: area,
                lang: lang
            })
            .done(function(data) {
                if (data == 0) {
                    if (username == '') {
                        $('#reg_username_err').show();
                    }
                    if (password == '') {
                        $('#reg_password_err').show();
                    }
                    if (fname == '') {
                        $('#reg_fname_err').show();
                    }
                    if (lname == '') {
                        $('#reg_lastname_err').show();
                    }
                    if (email == '') {
                        $('#reg_email_err').show();
                    }
                    if (division == '') {
                        $('#division_err').show();
                    }
                    if (aunit == '') {
                        $('#aunit_err').show();
                    }
                    if (area == '') {
                        $('#reg_area_err').show();
                    }
                    if (lang == '') {
                        $('#reg_lang_err').show();
                    }
                    myApp.hideIndicator();
                    myApp.alert('Fields should not be empty.');
                    console.log('err empty field');
                } else if (data == 1) {
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    localStorage.setItem("email", email);
                    localStorage.setItem("fname", fname);
                    localStorage.setItem("lname", lname);
                    localStorage.setItem("userlogin", username);
                    localStorage.setItem("division", division);
                    localStorage.setItem("aunit", aunit);
                    localStorage.setItem("area", area);
                    localStorage.setItem("lang", lang);
                    myApp.hideIndicator();


                } else {
                    myApp.hideIndicator();
                    myApp.alert(data + 'User Name is already taken.');
                    $('#reg_username').val('');
                    console.log('err');
                    return;
                    //  alert(data);

                }
            });



    }



}



// END Register

/*  var username = $$('#register-username').val();
    var email = $$('#register-email').val();
    var password = $$('#register-password').val();

    console.log('Submit clicked');
    console.log('username: ' +username+ 'and password: '+password+ 'and email: '+email);

    if (!username || !password || !email){
    	myApp.alert('Please fill in all Registration form fields');
    	return;
    }

   	// Methods to handle speciffic HTTP response codes
	var success201 = function(data, textStatus, jqXHR) {

		// We have received response and can hide activity indicator
	   	myApp.hideIndicator();

	   	console.log('Response body: '+data);

		// Will pass context with retrieved user name
		// to welcome page. Redirect to welcome page

	};

	var notsuccess = function(data, textStatus, jqXHR) {
		// We have received response and can hide activity indicator
	    myApp.hideIndicator();
		myApp.alert('Login was unsuccessful, please try again');
	};

    var query = 'https://api.FizzQuizzAWS/1/users';
    var postdata = {};
    postdata.username = username;
    postdata.password = password;
    postdata.email = email;

    myApp.showIndicator();*/

// Using Ajax for communication with Parse backend
// Note mandatory headers with credentials required
// by Parse. HTTP communication responses are handled
// based on HTTP response codes
/*	$$.ajax({
		url: query,
		headers: {"X-Parse-Application-Id":applicationId,"X-Parse-REST-API-Key":restApiKey},
	    type: "POST",
	    contentType: "application/json",
	    data: JSON.stringify(postdata),

	    statusCode: {
	    	201: success201,
	    	400: notsuccess,
	    	500: notsuccess
	    }
	});*/

//});

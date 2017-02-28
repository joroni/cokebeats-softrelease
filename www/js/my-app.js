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
    dynamicNavbar: false,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

/* @TODO FizzQuizzAWS credentials */
// Setup your FizzQuizzAWS applicationId and API key
var applicationId = 'xxx';
var restApiKey = 'yyy';
var alertTitle = 'Coke Beats';

// Funcion to handle Cancel button on Login page
$$('#cancel-login').on('click', function() {
    // Clear field values
    $$('.user_name_input').val('');
    $$('.user_pass_input').val('');
});

$$('.view').addClass('theme-red layout-light');



$$('.open-login, .login-screen').on('click', function () {
  myApp.loginScreen();
});

var base_url = "http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/laravel";
var base_wp_url = "http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/wordpress";


function noNet(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success(JSON.parse(xhr.responseText));
                }
            } else {
              /*  window.location.replace("nonet.html");*/
              myApp.alert("You're Offline", alertTitle);
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

function initApp(){
	myProfile();
	check_storage();
	//postCached();
	getPosts();

}



// START checking if user is logged
function check_storage() {

    if (localStorage['userlogin']) {
        //  $ionicModal.fromTemplateUrl('templates/login.html');
        //	window.location.replace("main.html");
        $('.login-button, .register-button').hide();
        $('.logout-button').show();
		$('.left a').show();
		$('.right').show();
		$('.notlogged.toolbar').hide();
        console.log('logged');
		mainView.router.load({
                    template: Template7.templates.welcomeTemplate,
                    context: {
                     //   name: username
                    }
                });

		getPosts();
		//postCached();
    } else {
        console.log('logged out');
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
		      $('.notlogged.toolbar').show();
 		   myApp.loginScreen();
    }

}
check_storage();

// END checking if user is logged




// START login
function signin() {
    myApp.showIndicator();
    var user_name_input = $('.user_name_input').val();
    var user_pass_input = $('.user_pass_input').val();

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
				$('.notlogged.toolbar').show();
                //  if (!username || !password){
                myApp.alert('Username and Password incorrect', alertTitle);
                return;
                //}


                /*  $('#login_username_error')
                      .show();
                  $('#login_password_error')
                      .show();*/
            } else if (data == 1) {

                myApp.hideIndicator();
				$('.notlogged.toolbar').hide();
                localStorage.setItem("userlogin", user_name_input);
               // get_Quiz_History();
               // localStorage.setItem("userQuizRecord", get_Quiz_History);
                localStorage.setItem("userData", data);

               // console.log("get_Quiz_History")
              //  console.log('Response body: ' + data);

                // Will pass context with retrieved user name
                // to welcome page. Redirect to welcome page



               initApp();
               mainView.router.load({
                    template: Template7.templates.welcomeTemplate,
                    context: {
                      //  name: username
                    }
                });

				//mainView.router.loadPage('#welcome');
				$$('.left a').hide();
				$$('.right a').show();
				$('.login-screen').removeClass('modal-in');
				$('.login-screen').addClass('modal-out');

				$('.login-screen').hide();

				getPosts();

                //	window.location.href = "main.html";


            }
        });
}
// END login

/*
$(function() {
    var user = localStorage.getItem('userlogin');


    $.getJSON(base_url + '/get_user_details/' + user, function(result) {

        $.each(result, function(i, field) {
            $('.userid').val(field.username);
            $('#username').val(field.username);
            $('#password').val(field.password);
            $('#firstname').val(field.fname);
            $('#lastname').val(field.lname);
            $('#email').val(field.email);
           $('#avatar').val(field.avatar);

            if ($('#avatar, #avatar2,  .profile-image')
                .val() == "" || $('#avatar, #avatar2, .profile-image')
                .val() == null) {
                var profile_photo = base_url + '/app/views/public/upload/files/' + 'photo.png';
            } else {
                var profile_photo = base_url + '/app/views/public/upload/files/' + field.avatar;
            }

            //var profile_photo =  base_url + '/upload/files/' + field.avatar;
            // $('#avatar').html('<div class="avatar" style="background-image: url("+ profile_photo +")');
            $('#avatar,  #avatar2, .profile-image').css('background-image', 'url(' + profile_photo + ')');
            $('#avatar,  #avatar2, .profile-image').css('background-size', 'contain');
            $('#avatar,  #avatar2, .profile-image').css('background-position', 'center center');


            $('#userfirstname, .profile-firstname').text(field.fname);
            $('#userusername, .profile-id').text(field.username);
            $('#userlastname, .profile-lastname').text(field.lname);
            $('#useremail, .profile-email').text(field.email);

            $('#user_name').text(field.username);
            $('#user_username').text(field.username);
            $('#user_password').text(field.password);

            $('#user_firstname').text(field.fname);
            $('#user_lastname').text(field.lname);
            $('#user_email').text(field.email);
            $('#user_privilege').text(field.privilege);

            console.log('ID:', field.id);
            console.log('User Name:', field.username);

            console.log('Password:', field.password);
            console.log(field.fname);
            console.log(field.lname);
            console.log(field.email);


            localStorage.setItem('user_id', field.id);


			localStorage.setItem('myusername', field.username);
			localStorage.setItem('myfirstname', field.fname);
			localStorage.setItem('mylastname', field.lname);
			localStorage.setItem('mypassword', field.password);
			localStorage.setItem('myemail', field.email);



			var appusername = localStorage.getItem('myusername');
			var appfirstname = localStorage.getItem('myfirstname');
			var applastname =localStorage.getItem('mylastname');
			var apppassword =localStorage.getItem('mypassword');
			var appemail =localStorage.getItem('myemail');
			$('.appusername').text(appusername);
			$('.appfirstname').text(appfirstname);
			$('.applastname').text(applastname);
			$('.apppassword').text(apppassword);
			$('.appemail').text(appemail);
        });
    });
});*/

function myProfile() {
   var user = localStorage.getItem('userlogin');


    $.getJSON(base_url + '/get_user_details/' + user, function(result) {

        $.each(result, function(i, field) {
            $('.userid').val(field.username);
            $('#username').val(field.username);
            $('#password').val(field.password);
            $('#firstname').val(field.fname);
            $('#lastname').val(field.lname);
            $('#email').val(field.email);
           $('#avatar').val(field.avatar);

            if ($('#avatar, #avatar2,  .profile-image')
                .val() == "" || $('#avatar, #avatar2, .profile-image')
                .val() == null) {
                var profile_photo = base_url + '/app/views/public/upload/files/' + 'photo.png';
            } else {
                var profile_photo = base_url + '/app/views/public/upload/files/' + field.avatar;
            }

            //var profile_photo =  base_url + '/upload/files/' + field.avatar;
            // $('#avatar').html('<div class="avatar" style="background-image: url("+ profile_photo +")');
            $('#avatar,  #avatar2, .profile-image').css('background-image', 'url(' + profile_photo + ')');
            $('#avatar,  #avatar2, .profile-image').css('background-size', 'contain');
            $('#avatar,  #avatar2, .profile-image').css('background-position', 'center center');


            $('#userfirstname, .profile-firstname').text(field.fname);
            $('#userusername, .profile-id').text(field.username);
            $('#userlastname, .profile-lastname').text(field.lname);
            $('#useremail, .profile-email').text(field.email);

            $('#user_name').text(field.username);
            $('#user_username').text(field.username);
            $('#user_password').text(field.password);

            $('#user_firstname').text(field.fname);
            $('#user_lastname').text(field.lname);
            $('#user_email').text(field.email);
            $('#user_privilege').text(field.privilege);

            console.log('ID:', field.id);
            console.log('User Name:', field.username);

            console.log('Password:', field.password);
            console.log(field.fname);
            console.log(field.lname);
            console.log(field.email);


            localStorage.setItem('user_id', field.id);


			localStorage.setItem('myusername', field.username);
			localStorage.setItem('myfirstname', field.fname);
			localStorage.setItem('mylastname', field.lname);
			localStorage.setItem('mypassword', field.password);
			localStorage.setItem('myemail', field.email);



			var appusername = localStorage.getItem('myusername');
			var appfirstname = localStorage.getItem('myfirstname');
			var applastname =localStorage.getItem('mylastname');
			var apppassword =localStorage.getItem('mypassword');
			var appemail =localStorage.getItem('myemail');
			$('.appusername').text(appusername);
			$('.appfirstname').text(appfirstname);
			$('.applastname').text(applastname);
			$('.apppassword').text(apppassword);
			$('.appemail').text(appemail);


        });
    });
}

myProfile();
function update_cancel() {
  // $('#profileContent').show();
   // $('#editmyProfile').hide();
}

function update_user() {
    myApp.showIndicator();
    // var id = $('#user_id').val();
    var username = $('.userid').val();
    var password = $('#password').val();
    var fname = $('#firstname').val();
    var lname = $('#lastname').val();
    var user_email = $('#email').val();

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
				myApp.alert('Updates not saved', alertTitle);
                //$('#update_0').show();

            } else if (data == 1) {



                $('#user_name').text(username);
                $('#user_password').text(password);
                $('#user_firstname').text(fname);
                $('#user_lastname').text(lname);
            	$('#user_email').text(user_email);

                //  window.location.reload();
				mainView.router.load({
                    template: Template7.templates.welcomeTemplate,
                    context: {
                     //   name: username
                    }
                });
				myApp.hideIndicator();
				myApp.alert('Updates Successful', alertTitle);
				initApp();
            }
        });

}

function postCached() {
	var postData = localStorage.getItem('tempPostData');
			var jsonObj = $.parseJSON(postData);
			console.log(jsonObj);

			$.each(jsonObj.posts, function(i, field){
  	        	var title=(field.title).slice(0,5);
                var frompost_id=field.id;
				var content=field.content;
				var date=field.date;
				var modified=field.modified;
				var thumbnail=field.thumbnail;
				$("#output").append('<div class="item col-50">'+
										'<a class="blog-links" id="'+frompost_id+'"  href="'+base_wp_url+'"/single/post/"'+frompost_id+'">'+
											'<div class="thumb media-object-thumb" style="background: url('+thumbnail+') #ddd;">'+
												'<div class="media-title-inner">'+title+'</div>'+
											'</div>'+
										'</a>'+
									'</div>');



			});

			 myApp.hideIndicator();


}

function getPostssss() {
  		myApp.showIndicator();
  		var url= base_wp_url+"/?json=get_recent_posts";
  		$.getJSON(url,function(result){
			console.log(result);
			localStorage.setItem('tempPostData', JSON.stringify(result));
			var postData = localStorage.getItem('tempPostData');
			var jsonObj = $.parseJSON(postData);
			console.log(jsonObj);
		//	var postData = localStorage.getItem('tempPostData');
			//var array = JSON.parse(postData);
			$.each(jsonObj.posts, function(i, field){
  	        	var title=(field.title).slice(0,5);
                var frompost_id=field.id;
				var content=field.content;
				var date=field.date;
				var thumbnail=field.thumbnail;

			$("#output").append('<div class="item col-50">'+
										//'<a class="blog-link" id="'+frompost_id+'" href="#single">'+
                    '<a class="blog-link" id="'+frompost_id+'"  href="'+base_wp_url+'"/single/post/"'+frompost_id+'">'+
										//'<a class="blog-link open-popup" data-popup=".popup-single" id="'+frompost_id+'" href="#">'+
											'<div class="thumb media-object-thumb" style="background: url('+thumbnail+') #ddd;">'+
												'<div class="media-title-inner">'+title+'</div>'+
											'</div>'+
										'</a>'+
									'</div>');



  	        });

			 myApp.hideIndicator();
      	});


}


			$('a.blog-link').on('click', function(){
        //myApp.showIndicator();

          $('.view').append('<div class="col-25 col-dark">'+
                'White<br>'+
                '<span style="width:42px; height:42px" class="preloader preloader-white"></span>'+
              '</div>'+
            '</div>')
      });






function getPosts() {
  		myApp.showIndicator();
  		var url= base_wp_url+"/?json=get_recent_posts";
  		$.getJSON(url,function(result){
			console.log(result);
			localStorage.setItem('tempPostData', JSON.stringify(result));
			var postData = localStorage.getItem('tempPostData');
			var jsonObj = $.parseJSON(postData);
			console.log(jsonObj);
		//	var postData = localStorage.getItem('tempPostData');
			//var array = JSON.parse(postData);
			$.each(jsonObj.posts, function(i, field){
  	        	var title=(field.title).slice(0,5);
                var frompost_id=field.id;
				var content=field.content;
				var date=field.date;
				var thumbnail=field.thumbnail;

			$("#output").append('<div class="item col-50">'+
      '<a class="blog-links" id="'+frompost_id+'"  href="'+base_url+'/single/post/'+frompost_id+'">'+
									//	'<a class="blog-link" id="'+frompost_id+'" href="#single">'+
										//'<a class="blog-link open-popup" data-popup=".popup-single" id="'+frompost_id+'" href="#">'+
											'<div class="thumb media-object-thumb" style="background: url('+thumbnail+') #ddd;">'+
												'<div class="media-title-inner">'+title+'</div>'+
											'</div>'+
										'</a>'+
									'</div>');



  	        });

			 myApp.hideIndicator();
      	});


}

/*
function getPostContent() {

  	myApp.showIndicator();
  		var blogPostID = $(this).attr('id');
		var url= base_wp_url+"/?json=get_post&post_id="+blogPostID;


  			$.getJSON(url,function(result){
			//console.log(result);

			localStorage.setItem('tempPostContentData', JSON.stringify(result));
			var postData = localStorage.getItem('tempPostContentData');
			var jsonContentObj = $.parseJSON(postData);
			//var jsonContentObj = postData;
			console.log(jsonContentObj);
			//$("#blogcontent").append('<div>'+jsonContentObj[0].content+'</div>');
			var table = '<table><thead><tr><th>Title</th></tr><tr><th>Content</th></tr></thead><tbody>';
			 $.each(result, function() {

		 table += '<tr><td>' + this['title'] + '</td></tr><tr><td>' + this['content'] + '</td></tr>';
    });

		 table += '</tbody></table>';
    	document.getElementById("datalist").innerHTML = table;





			//$("#blogcontent").html(jsonContentObj.posts.content);

  	       /* $.each(jsonContentObj.posts, function(i, field){
  	        	var title=field.title;
                var id=field.id;
				var content=field.content;
				var date=field.date;
				var thumbnail=field.thumbnail;
				console.log(title);



				$("#blogcontent").append('<div>'+postData+'</div>');

				//<div class='blogposts' id='"+id+'">'+content+"</div>");

  	        });

			 myApp.hideIndicator();
      	});


}
  */


function homeLink() {
 mainView.router.load({
      template: Template7.templates.welcomeTemplate,
     context: {
     //     name: username
      }
  });

 initApp();
 //postCached();
 getPosts();
}
function edittheProfile() {

    //alert('profile');
  //  $('#profileContent').hide();
//    $('#editmyProfile').show();

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
    //http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/laravel/uploadpicc
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
              //  window.location.reload();

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
	myApp.loginScreen();

   // mainView.router.load({
     //   template: Template7.templates.guestTemplate
        //  context: {
        //name: username
        //}
   // })

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

    var username = $$('.user_name_input').val();
    var password = $$('.user_pass_input').val();

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

			$$('.user_name_input').val('');
			$$('.user_pass_input').val('');
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
  /*  var division = $('#division').val();
    var aunit = $('#aunit').val();
    var area = $('#reg_area').val();
    var lang = $('#reg_lang').val();*/


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
      /*  if (division == '') {
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
        }*/
        console.log('err empty field');
        myApp.hideIndicator();
        myApp.alert('Fields should not be empty.');
    } else {


        $.post(base_url + '/register/user', {
                username: username,
                password: password,
                fname: fname,
                lname: lname,
                email: email
              /*  division: division,
                aunit: aunit,
                area: area,
                lang: lang*/
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
                /*    if (division == '') {
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
                    }*/
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
                  /*  localStorage.setItem("division", division);
                    localStorage.setItem("aunit", aunit);
                    localStorage.setItem("area", area);
                    localStorage.setItem("lang", lang);*/
                    myApp.hideIndicator();
					initApp();


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

var openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: 'http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/wordpress/wp-content/uploads/2017/02/Feature-Image-1-300x300.png',
            w: 300,
            h: 300
        },
        {
          src: 'http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/wordpress/wp-content/uploads/2016/09/June-Feature-Photo.jpg',
            w: 1200,
            h: 800
        }
    ];

    // define options (if needed)
    var options = {
             // history & focus options are disabled on CodePen
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0

    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

//openPhotoSwipe();

//document.getElementById('btn').onclick = openPhotoSwipe;



  /**
   * END PHOTOSWIPE
   ***********************************/

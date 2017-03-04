

	/* RAYMUND CUSTOM SCRIPT. Intended for tracking user count */

	function formatAMPM(date) { // This is to display 12 hour format like you asked
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}





	var myDate = new Date();
	var myMonth = myDate.getMonth()+1;
	var displayDate = myDate.getFullYear() + '-' + myMonth + '-' +myDate.getDate() ;
	//var displayDate = myMonth + '-' +myDate.getDate()+ '-' +myDate.getFullYear();
	//var displayDate = myDate.getFullYear() + '-' +myMonth + '-' +myDate.getDate();
	var displayTime = formatAMPM(myDate);
	console.log(displayDate);
	console.log(displayTime);


	var base_url = 'http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/laraveladmin';
	var today = new Date();
	var temp_date = new Date();
	//today = today.format("yyyy-mm-dd");
	var date_joined_cb = displayDate;
	var time_joined_cb = displayTime;

	var temp_data = localStorage.getItem('Authentication-coke-beats-Authentication-coke-beats');
	var num_access  = 1;


	var data = temp_data;
	console.log(data);
	var obj = jQuery.parseJSON( data );
	//alert( obj.user_login );
	var CB_username = ( obj.user_login );



	console.log('Date Joined: ', date_joined_cb);
	localStorage.setItem('Coke-Beats-info', CB_username + ':' + date_joined_cb);




	function post_score_new() {

		var tempval = 1;
		$('#track_username').val(CB_username);
		$('#track_date').val(date_joined_cb);
		$('#track_click').val(num_access);
		$("#score_bottle").val(time_joined_cb);
		$("#divisions").val(tempval);
		$("#area").val(tempval);
		$("#aunit").val(tempval);

		var user_id = $("#track_username").val();
		var datefrom = $("#track_date").val();
		var attempts = $("#track_click").val();

		var score_bottle = $("#score_bottle").val();
		var divisions = $("#divisions").val();
		var area = $("#area").val();
		var aunit = $("#aunit").val();


		console.log("Attempts", attempts);


		$.get(base_url + "/app_tracker/update/" + user_id + "/" + datefrom + "/" + area + "/" + divisions + "/" + aunit + "/" + score_bottle, function ( data ) {





		});




	}


	$('.item, .media-object-thumb').on('click', function () {
		post_score_new();
		num_access ++;



		var user_id = $("#track_username").val();
		var datefrom = $("#track_date").val();
		var attempts = $("#track_click").val();

		var score_bottle = $("#score_bottle").val();


		var divisions = $("#divisions").val();
		var area = $("#area").val();
		var aunit = $("#aunit").val();


		localStorage.setItem('num_access', num_access);

		console.log('Clicks: ', homeScreen);

	});
	var homeScreen =  localStorage.getItem('num_access');


	if (localStorage['Coke-Beats-info']) {

		localStorage.setItem('Coke-Beats-info', CB_username +':'+ date_joined_cb);
		console.log('Logged In');
	}
	else {
		  window.location.replace('index.html#login-page');
	}


	// RAYMUND CUSTOM

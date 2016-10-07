define( [ 'jquery', 'core/theme-app', 'core/modules/authentication' ], function( $, App, Auth ) {

	/**
	 * User authentication theme module example that implements a "Simple login/logout form" 
	 * displayed under the topbar of app's theme.
	 * 
	 * When the user clicks the "Login" button, a minimalist login form comes up.
	 * When the user has logged in, a "Log out" button appears, and user connection 
	 * state info is displayed next to it, along with a link to the user page.
	 * 
	 * Login/logout are handled with the WP-AppKit Authentication API.
	 */

	/**
	 * Define HTML for our login form wrapper, insert it into DOM just after the feedback <div>,
	 * then memorize a jQuery reference to it.
	 */
	//$( '<div class="clearfix"><div class="clearfix" id="user-info"></div></div>' ).insertAfter( '#app-title' );
	$( '<div class="clearfix" id="user-info" style="display: block;></div>' ).insertAfter( '#app-title' );
	//$( '<div class="clearfix" id="user-info2" style="display: none;"></div>' ).insertAfter( '#app-title' );
	/*$( '<div id="user-info" class="popover popover-menu modal-in" style="display: block; top: 370px !important; left: 18px;">'
		+'<div class="popover-angle on-bottom" style="left: 200px;"></div>'
		+'<div class="popover-inner">'
		+'<div class="list-block">'
		+'<ul>'

		+'<li id="user-info"><a href="panels.html" class="list-button item-link">Side Panels</a></li>'
		+'<li><a href="list-view.html" class="list-button item-link">List View</a></li>'
		+'<li><a href="index.html" id="logout" class="list-button item-link">Logout</a></li>'
		+'</ul>'
		+'</div>'
		+'</div>'
		+'</div>' ).insertAfter( '#popDiv' );*/





/*************** 1 ****************/

var $user_info = $('#user-info');


    /**
	 * Function that handles the login/logout form display depending on
	 * whether the user is logged in or not.
	 */
	var update_login_info = function() {

		var current_user = Auth.getCurrentUser();

		if ( current_user ) {
			//User logged in : display user info and logout button :
			$user_info.html( '<li><a href="#user-page" id="user_' + 'current_user.id' + '">'+ current_user.login +'</a></li><li> <button type="button" class="btn btn-danger btn-block" id="logout"><i class="fa small fa-power-off"  id="logout"></i></button></li>');
		} else {
			//User not logged in : display the login button :
			$user_info.html( '<li>No user connected <button type="button" class="btn btn-info" id="login">Log in</button></li>' );
		}

	};


	/**
	 * Update the login/logout display as soon as the theme is loaded,
	 * so that it displays correctly according user connection state
	 */
	update_login_info();

	/**
	 * Update the login/logout display at user login and logout
	 */
	App.on( 'info', function( info ) {
		switch( info.event ) {
			case 'auth:user-login':
			case 'auth:user-logout':
				update_login_info();
				break;
		}
	} );
	
	/**
	 * Make the login form appear when clicking the "Log in" button
	 */
	$( $user_info ).on( 'click', '#login', function( e ) {
		e.preventDefault();
		$user_info.html( 
			'<input id="userlogin" placeholder="Login" type="text" >' +
			'<input id="userpass" placeholder="Password" type="password" >' +
			'<button type="button" class="btn btn-info" id="go-login">Log in</button>'
		);
	} );
	
	/**
	 * Log the user in when submiting the login form
	 */
	$( $user_info ).on( 'click', '#go-login', function( e ) {
		e.preventDefault();
		Auth.logUserIn( 
			$('#userlogin').val(), 
			$('#userpass').val(),
			$('#user-info').hide()

		);
	} );
	
	/**
	 * Log the user out when clicking the "Log out" button
	 */
	$( $user_info ).on( 'click', '#logout', function( e ) {
		e.preventDefault();
		Auth.logUserOut();

	} );





} );





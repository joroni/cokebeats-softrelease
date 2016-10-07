<?php
/*
* @Author 		PickPlugins
* Copyright: 	2015 PickPlugins.com
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 




add_action( 'user_profile_action_profile_header', 'user_profile_action_profile_header', 10 );


add_action( 'user_profile_action_profile_header', 'user_profile_action_profile_navs', 10 );

add_action( 'user_profile_action_profile_sidebar', 'user_profile_action_profile_sidebar', 10 );


if ( ! function_exists( 'user_profile_action_profile_header' ) ) {

	
	function user_profile_action_profile_header() {
				
		require_once( up_paratheme_plugin_dir. 'templates/profile-header.php');
	}
	
	
}











if ( ! function_exists( 'user_profile_action_profile_navs' ) ) {

	
	function user_profile_action_profile_navs() {
				
		require_once( up_paratheme_plugin_dir. 'templates/profile-navs.php');
	}
	
	
}


if ( ! function_exists( 'user_profile_action_profile_sidebar' ) ) {

	
	function user_profile_action_profile_sidebar() {
				
		require_once( up_paratheme_plugin_dir. 'templates/profile-sidebar.php');
	}
	
	
}




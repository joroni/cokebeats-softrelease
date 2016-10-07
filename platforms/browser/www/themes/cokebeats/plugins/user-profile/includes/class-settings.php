<?php




if ( ! defined('ABSPATH')) exit; // if direct access 



class class_user_profile_settings{

	public function __construct(){
		
		add_action('admin_menu', array( $this, 'user_profile_menu_init' ));
		
		}


	
	public function settings(){
		include('menu/settings.php');	
	}
	public function help(){
		include('menu/help.php');	
	}	
	

	
	
	
	public function user_profile_menu_init() {
		
		
		add_menu_page(__('user_profile','user_profile'), __('User Profile','user_profile'), 'manage_options', 'user_profile_settings', array( $this, 'settings' ));
		add_submenu_page('user_profile', __('Help',user_profile_textdomain), __('Help',user_profile_textdomain), 'manage_options', 'help', array( $this, 'help' ));	
		
		
	
	}



	
}
	
new class_user_profile_settings();
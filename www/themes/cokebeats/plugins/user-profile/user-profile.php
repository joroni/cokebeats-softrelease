<?php
/*
Plugin Name: User Profile
Plugin URI: 
Description: Creating unlimited user profile field.
Version: 1.5.0
Author: pickplugins
Author URI: http://pickplugins.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 





class UserProfile{
	
	function __construct(){
		
		
	define('up_paratheme_plugin_url', WP_PLUGIN_URL . '/' . plugin_basename( dirname(__FILE__) ) . '/' );
	define('up_paratheme_plugin_dir', plugin_dir_path( __FILE__ ) );
	define('up_paratheme_wp_url', 'http://wordpress.org/plugins/user-profile/' );
	define('up_paratheme_pro_url', '' );
	define('up_paratheme_demo_url', '' );
	define('up_paratheme_conatct_url', 'http://pickplugins.com/contact' );
	define('up_paratheme_plugin_name', 'User Profile' );
	define('up_paratheme_share_url', 'http://wordpress.org/plugins/user-profile/' );
	define('user_profile_textdomain', 'user-profile' );
	
	require_once( plugin_dir_path( __FILE__ ) . 'includes/class-functions.php');	
	
	require_once( plugin_dir_path( __FILE__ ) . 'includes/functions.php');
	require_once( plugin_dir_path( __FILE__ ) . 'includes/shortcodes.php');
	require_once( plugin_dir_path( __FILE__ ) . 'includes/class-settings.php');	
	require_once( plugin_dir_path( __FILE__ ) . 'includes/shortcodes/shortcodes-user-profile.php');
	
	require_once( plugin_dir_path( __FILE__ ) . 'templates/profile-hooks.php');	
	
	//Themes php files
	//require_once( plugin_dir_path( __FILE__ ) . 'themes/flat/index.php');
		
	
	
	require_once( plugin_dir_path( __FILE__ ) . 'themes/follower-post-list/flat/index.php');


	add_action( 'wp_enqueue_scripts', array( $this, 'scirpts_frontend' ) );
	add_action( 'admin_enqueue_scripts', array( $this, 'scirpts_admin' ) );	
	add_action( 'admin_enqueue_scripts', 'wp_enqueue_media' );

	register_activation_hook(__FILE__, array( $this, 'activation' ));
		
	}
	
	
	function scirpts_frontend(){
		
		wp_enqueue_script('jquery');
		wp_enqueue_script('user_profile_js', plugins_url( '/assets/front/js/scripts.js' , __FILE__ ) , array( 'jquery' ));	
		wp_localize_script('user_profile_js', 'user_profile_ajax', array( 'user_profile_ajaxurl' => admin_url( 'admin-ajax.php')));
		
		wp_enqueue_style('font-awesome', up_paratheme_plugin_url.'assets/front/css/font-awesome.css');		
		wp_enqueue_style('user_profile_style', up_paratheme_plugin_url.'css/style.css');
		wp_enqueue_style('user_profile-style-profile', up_paratheme_plugin_url.'assets/front/css/user-profile.css');	
		
		// Style for themes
		//wp_enqueue_style('user_profile-style-flat', up_paratheme_plugin_url.'themes/flat/style.css');
		
			
		
		}
	
	
	function scirpts_admin(){
		
		wp_enqueue_script('jquery');
		wp_enqueue_script('user_profile_js', plugins_url( '/assets/admin/js/scripts.js' , __FILE__ ) , array( 'jquery' ));	
		wp_localize_script('user_profile_js', 'user_profile_ajax', array( 'user_profile_ajaxurl' => admin_url( 'admin-ajax.php')));
		wp_enqueue_style('font-awesome', up_paratheme_plugin_url.'assets/front/css/font-awesome.css');		
		wp_enqueue_style('user_profile_style', up_paratheme_plugin_url.'assets/admin/css/style.css');
		
		// ParaAdmin
		wp_enqueue_style('ParaAdmin', up_paratheme_plugin_url.'assets/admin/ParaAdmin/css/ParaAdmin.css');	
		wp_enqueue_script('ParaAdmin', plugins_url( 'assets/admin/ParaAdmin/js/ParaAdmin.js' , __FILE__ ) , array( 'jquery' ));	
		
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'user_profile_color_picker', plugins_url('/assets/admin/js/color-picker.js', __FILE__ ), array( 'wp-color-picker' ), false, true );

		
		}	
	
	
	
	
	
	function activation(){
		
		
		$up_paratheme_version= "1.5";
		update_option('up_paratheme_version', $up_paratheme_version); //update plugin version.
		
		$up_paratheme_customer_type= "free"; //customer_type "free"
		update_option('up_paratheme_customer_type', $up_paratheme_customer_type); //update plugin version.



		global $wpdb;
		
        $sql = "CREATE TABLE IF NOT EXISTS " . $wpdb->prefix . "up_paratheme_follow"
                 ."( UNIQUE KEY id (id),
					id int(100) NOT NULL AUTO_INCREMENT,
					author_id	INT( 255 )	NOT NULL,
					follower_id	INT( 255 ) NOT NULL,
					follow	VARCHAR( 255 ) NOT NULL					
					)";
		$wpdb->query($sql);
		
		
		
		
		do_action('user_profile_activation');
		
		
		}
	
}

new UserProfile();








function up_paratheme_init_scripts()
	{




		
	}
add_action("init","up_paratheme_init_scripts");










//add_action('admin_menu', 'up_paratheme_menu_init');


	
function up_paratheme_menu_help(){
	include('up-paratheme-help.php');	
}

function up_paratheme_menu_settings(){
	include('up-paratheme-settings.php');	
}

function up_paratheme_menu_init()
	{
		add_menu_page(__('up-paratheme','up-paratheme'), __('User Profile','author_box'), 'manage_options', 'up_paratheme_menu_settings', 'up_paratheme_menu_settings');


		add_submenu_page('up_paratheme_menu_settings', __('Help & Upgrade','menu-up_paratheme'), __('Help & Upgrade','menu-up_paratheme'), 'manage_options', 'up_paratheme_menu_help', 'up_paratheme_menu_help');

	}





?>
<?php

/*
* @Author 		pickplugins
* Copyright: 	2015 pickplugins
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 

class class_user_profile_shortcodes_user_profile{
	
    public function __construct(){
		

		add_shortcode( 'user_profile', array( $this, 'user_profile_display' ) );	
			
			

   		}

		
	public function user_profile_display($atts, $content = null ) {
			$atts = shortcode_atts(
				array(
					//'category' => '',
											
					), $atts);
					
			//$category = $atts['category'];
			$html = '';
	
			$author = get_queried_object();
			$author_id = $author->ID;
	
	
		
			$facebook = get_the_author_meta( 'facebook', $author_id );
			$twitter = get_the_author_meta( 'twitter', $author_id );		
			$google_plus = get_the_author_meta( 'google-plus', $author_id );	
			$pinterest = get_the_author_meta( 'pinterest', $author_id );		
			$linkedin = get_the_author_meta( 'linkedin', $author_id );		
			$gender = get_the_author_meta( 'gender', $author_id );
			$display_name = get_the_author_meta( 'display_name', $author_id );		
			$first_name = get_the_author_meta( 'first_name', $author_id );		
			$last_name = get_the_author_meta( 'last_name', $author_id );		

			
			
			ob_start();
			
			?>
            <div class="user-profile">
            <?php
			
			do_action('user_profile_action_profile_header');
			do_action('user_profile_action_profile_navs');	
			
			
			?>
            </div>
            <?php
			
			return ob_get_clean();
			
			
			
/*

		
			$html = '';
			
			$html .= '<div class="user-profile">';
			
			$html .= '<div class="cover-area">';
			if(!empty($profile_cover))
				{
				$html .= '<div class="cover" style="background:url('.$profile_cover.') no-repeat scroll 0 0 rgba(0, 0, 0, 0);"></div>';	
				}
			else
				{
				$html .= '<div class="cover" style="background:url('.up_paratheme_plugin_url.'css/cover.png'.') repeat scroll 0 0 rgba(0, 0, 0, 0);"></div>';	
				}
				
			
			if(!empty($profile_img))
				{
				$html .= '<div class="profile-img-area" ><img class="profile-img"  src="'.$profile_img.'" /></div>'; 
				}
			else
				{
				$html .= '<div class="profile-img-area" ><img class="profile-img"  src="'.up_paratheme_plugin_url.'css/avatar.png" /></div>'; 
				}
			
			
			$html .= '</div>'; // end cover-area
			$html .= '<div class="tabs-area">
				<div class="nav-container">
					<ul class="author-tab-nav">
						<li nav="1" class="nav1 active">Post</li>
						<li nav="2" class="nav2">Comments</li>
						<li nav="3" class="nav3">About</li>
	
	
	
	
					</ul> <!-- tab-nav end -->
				</div>
				
				
				<div class="profile-info">'.up_paratheme_author_profile_info($author_id).'</div>
				<div class="box-container">
					<ul class="author-tab-box">
						<li style="display: block;" class="box1 tab-box ">'.up_paratheme_author_post_list($author_id).'</li>
						<li style="display: none;" class="box2 tab-box">'.up_paratheme_author_comment_list($author_id).'</li>
						<li style="display: none;" class="box3 tab-box">'.up_paratheme_post_author_about($author_id).'
	</li>
					</ul>
				</div>
				<div class="clear"> </div>
			
			</div>';		
			
			
			
			$html .= '</div>'; // end 
				
		
	
			
			return $html;

*/			

	}
		
	
			
			
}
	
new class_user_profile_shortcodes_user_profile();
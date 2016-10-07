<?php

if ( ! defined('ABSPATH')) exit; // if direct access 

function up_paratheme_ap_theme_flat($author_id)
	{
		
		$facebook = get_the_author_meta( 'facebook', $author_id );
		$twitter = get_the_author_meta( 'twitter', $author_id );		
		$google_plus = get_the_author_meta( 'google-plus', $author_id );	
		$pinterest = get_the_author_meta( 'pinterest', $author_id );		
		$linkedin = get_the_author_meta( 'linkedin', $author_id );		
		$gender = get_the_author_meta( 'gender', $author_id );
		$display_name = get_the_author_meta( 'display_name', $author_id );		
		$first_name = get_the_author_meta( 'first_name', $author_id );		
		$last_name = get_the_author_meta( 'last_name', $author_id );		
		$profile_img = get_the_author_meta( 'profile_img', $author_id );		
		$profile_cover = get_the_author_meta( 'profile_cover', $author_id );
		


		if ( wp_is_mobile() ) {
			
				$ismobile = "mobile";
			}
		else
			{
				$ismobile = "";
			}

			
		$html = '';
		
		$html .= '<div class="up-author-profile flat '.$ismobile.'">';
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
		
		
		
		$html .= '</div>'; // end up-author-profile
		

		return $html;

		
		
	}
<?php
/*
* @Author 		PickPlugins
* Copyright: 	2015 PickPlugins.com
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 

	$author = get_queried_object();
	$author_id = $author->ID;

	$class_user_profile_function = new class_user_profile_function();
	
	$sidebar_sections = $class_user_profile_function->sidebar_sections();

	//var_dump($profile_navs);
?>



<?php


	foreach($sidebar_sections as $sction_key=>$sction){
		
		echo '<div class="section '.$sction_key.'">';
		echo '<div class="section-title">'.$sction['title'].'</div>';
		echo '<div class="section-content">'.$sction['html'].'</div>';		
		
		
		echo '</div>';
		
		}
















		


		
/*

		$author = get_queried_object();
		$author_id = $author->ID;
	
		$user_url = get_the_author_meta( 'user_url', $author_id );		
		$company = get_the_author_meta( 'company', $author_id );			
		$position = get_the_author_meta( 'position', $author_id );
		$gender = get_the_author_meta( 'gender', $author_id );		
				
		
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
		$country = get_the_author_meta( 'country', $author_id );		
		
		$html = '';


		if ( is_user_logged_in() ) 
			{
				$follower_id = get_current_user_id();
			}
		else
			{
				$follower_id = '';
			}
		
		global $wpdb;
		$table = $wpdb->prefix . "up_paratheme_follow";
		$result = $wpdb->get_results("SELECT * FROM $table WHERE author_id = '$author_id' AND follower_id = '$follower_id'", ARRAY_A);
		
		$already_insert = $wpdb->num_rows;
		
		if($already_insert>0)
			{
				$follow_status = 'following';
				$follow_text = 'Following';				
			}
		else
			{
				$follow_status = '';
				$follow_text = 'Follow';		
			}
		
		$follower_count = $wpdb->get_var($wpdb->prepare( "SELECT COUNT(id) FROM ".$table." WHERE author_id = '%s'", $author_id) );
		
		$html .= '<div class="meta follow">
					<div authorid="'.$author_id.'" class="author-follow '.$follow_status.'">'.$follow_text.'</div>
					<span class="author-follow-count"> '.$follower_count.' '.__('Follower','user_profile').' </span>
				</div>';	
		
		$html .= '<div  class="meta "><div class="follower-mgs"> </div><div class="follower-list">'.up_paratheme_follower_list($author_id).'</div></div>';			





		if(!empty($company))
		$html .= '<div class="meta "><i class="fa fa-university"></i> '.ucfirst($position).' at '.ucfirst($company).'</div>	';
		
		if(!empty($country))
		$html .= '<div class="meta "><i class="fa fa-globe"></i> '.ucfirst($country).'</div>';
		
		if(!empty($user_url))
		$html .= '<div class="meta "><i class="fa fa-link"></i> <a href="'.$user_url.'">'.$user_url.'</a></div>';



		
		echo $html;
		

*/
		
		
?>




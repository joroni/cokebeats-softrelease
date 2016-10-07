<?php




if ( ! defined('ABSPATH')) exit; // if direct access 



function up_paratheme_query_single_field($atts) {
		$atts = shortcode_atts(
			array(
				'id' => "",  //Author ID
				'meta_key' => "",
				'icon' => "",
				), $atts);


			$author_id = $atts['id'];
			$meta_key = $atts['meta_key'];
			$icon = $atts['icon'];
			
			
			$html = '';
			if($meta_key=="user_pass")
				{
					$html .= 'This field is restricted.';
				}
			else
				{
					if(!empty($icon))
						{
							$html .= '<i class="fa fa-'.$icon.'"></i>  ';
						}
					
					$html .= get_the_author_meta( $meta_key, $author_id );
				}
			
			
			
			
			echo $html;	
							
							





}

add_shortcode('up_single', 'up_paratheme_query_single_field');

function up_paratheme_author_profile($atts) {
		$atts = shortcode_atts(
			array(
				'id' => "", //author id
				'themes' => "flat", //author id				

				), $atts);


			$author_id = $atts['id'];
			$themes = $atts['themes'];

			$html = '';

			if($themes== "flat")
				{
					$html.= up_paratheme_ap_theme_flat($author_id);
				}
			

			return $html;



		}

add_shortcode('up_author_profile', 'up_paratheme_author_profile');


function up_paratheme_follower_post_feed($atts) 
{
	$atts = shortcode_atts(
		array(
			'id' => "4", //author id
			'themes' => "flat", //author id				

		), $atts);

	$author_id = $atts['id'];
	$themes = $atts['themes'];

	$html = '';

	global $wpdb;
	if ( is_user_logged_in() ) $follower_id = get_current_user_id();
	else $follower_id = '';

	$table = $wpdb->prefix . "up_paratheme_follow";
	$result = $wpdb->get_results($wpdb->prepare("SELECT * FROM $table WHERE follower_id = %d", $follower_id));

	foreach( $result as $rt )
		if($themes== "flat") $html.= up_paratheme_follower_post_feed_theme_flat($rt->author_id);

	return $html;
}

add_shortcode('up_follower_post_feed', 'up_paratheme_follower_post_feed');

















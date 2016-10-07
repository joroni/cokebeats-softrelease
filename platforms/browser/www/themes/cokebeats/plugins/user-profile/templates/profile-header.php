<?php
/*
* @Author 		PickPlugins
* Copyright: 	2015 PickPlugins.com
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 

	$author = get_queried_object();
	$author_id = $author->ID;

	$profile_img = get_the_author_meta( 'profile_img', $author_id );		
	$profile_cover = get_the_author_meta( 'profile_cover', $author_id );
	$display_name = get_the_author_meta( 'display_name', $author_id );


	if(empty($profile_cover)){
		$profile_cover = up_paratheme_plugin_url.'assets/front/img/cover.png';
		}
	
	if(empty($profile_img)){
		$profile_img = up_paratheme_plugin_url.'assets/front/img/avatar.png';
		}

?>

<div class="profile-header">
	<div class="cover">
    <img src="<?php echo $profile_cover; ?>" />
    </div>
    
	<div class="thumb">
    <img src="<?php echo $profile_img; ?>" />
    </div>  
      
	<div class="author-name"><?php echo $display_name; ?></div>
</div>
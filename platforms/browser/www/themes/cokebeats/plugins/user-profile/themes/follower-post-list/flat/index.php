<?php

if ( ! defined('ABSPATH')) exit; // if direct access 

function up_paratheme_follower_post_feed_theme_flat($author_id)
	{	
		if ( wp_is_mobile() ) $ismobile = "mobile";
		else $ismobile = "";
			
		$html = '';
		
		$html .= 	'<div class="up-author-profile flat '.$ismobile.'">
						<div class="tabs-area">'.up_paratheme_author_post_list($author_id).'</div>
					</div>'; 
		
		return $html;
	}
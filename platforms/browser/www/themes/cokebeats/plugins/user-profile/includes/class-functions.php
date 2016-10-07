<?php




if ( ! defined('ABSPATH')) exit; // if direct access 


class class_user_profile_function{
	
	
	
	
	
	function sidebar_sections(){
		
		$sections = array(
						'follow'=>array(
										'title'=>'Follow',
										'html'=> $this->author_follow(),
										
										),
										
										
						'works'=>array(
										'title'=>'Works',
										'html'=> $this->author_works(),
										
										),
										


						'social'=>array(
										'title'=>'Social',
										'html'=> $this->author_social(),
										
										),

																			
					
				
					); 
		
		
			$sections = apply_filters('user_profile_filter_profile_sidebar_sections', $sections);
		
			return $sections;
		
		}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function profile_navs(){
		
		$navs = array(
						'post'=>array(
										'title'=>'Post',
										'html'=>$this->author_post_list(),
										
										),
										
										
						'comments'=>array(
										'title'=>'Comments',
										'html'=>$this->author_comment_list(),
										
										),
										
						'about'=>array(
										'title'=>'About',
										'html'=>$this->author_about(),
										
										),																			
										
										
										
				
					); 
			$navs = apply_filters('user_profile_filter_profile_navs', $navs);
			
			return $navs;
		
		}
	
	
	function author_social(){
		
		$author = get_queried_object();
		$author_id = $author->ID;
		

		$facebook = get_the_author_meta( 'facebook', $author_id );
		$twitter = get_the_author_meta( 'twitter', $author_id );		
		$google_plus = get_the_author_meta( 'google-plus', $author_id );	
		$pinterest = get_the_author_meta( 'pinterest', $author_id );		
		$linkedin = get_the_author_meta( 'linkedin', $author_id );	
		
		$html_social = '';
		
		$html_social.='<div class="author-social">';
		
		if(!empty($facebook))
		$html_social.='<a class="social facebook" href="'.$facebook.'" ><i class="fa fa-facebook"></i></a>';	
		
		if(!empty($twitter))
		$html_social.='<a class="social twitter" href="'.$twitter.'" ><i class="fa fa-twitter"></i></a>';		
		
		if(!empty($twitter))
		$html_social.='<a class="social google-plus" href="'.$twitter.'" ><i class="fa fa-google-plus-official"></i></a>';		
			
		if(!empty($pinterest))
		$html_social.='<a class="social twitter" href="'.$pinterest.'" ><i class="fa fa-pinterest"></i></a>';			
			
		if(!empty($linkedin))
		$html_social.='<a class="social linkedin" href="'.$linkedin.'" ><i class="fa fa-linkedin"></i></a>';			
		
		
		$html_social.='</div>';	
		
		$social = apply_filters('user_profile_filter_profile_social', $html_social);
		
		return $social;
			
		
		}
	
	
	function author_follow(){
		
		$html ='';
		
		$author = get_queried_object();
		$author_id = $author->ID;
		
		
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
		
		$html .= '<div  class="meta "><div class="follower-mgs"> </div><div class="follower-list">'.$this->author_follower_list($author_id).'</div></div>';			

		return $html;
		
		}
		
		
		
		
	function author_follower_list($author_id){
		
		
		if ( is_user_logged_in() ) 
			{
				$follower_id = get_current_user_id();
			}
	
		global $wpdb;
		$table = $wpdb->prefix . "up_paratheme_follow";
		$entries = $wpdb->get_results("SELECT * FROM $table WHERE author_id = '$author_id' ORDER BY id DESC LIMIT 10");
		
		$already_insert = $wpdb->num_rows;
		
		$html ='';

		foreach( $entries as $entry )
			{
				$follower_id = $entry->follower_id;
				
				$html .= '<div class="follower follower-'.$follower_id.'">';
				$html .= get_avatar( $follower_id, 32 );;				
				
				$html .= '</div>';
			}
		
		return $html;
		
		
		}	
		
		
		
		
	function author_works(){
		
		$author = get_queried_object();
		$author_id = $author->ID;
		
		$user_url = get_the_author_meta( 'user_url', $author_id );		
		$company = get_the_author_meta( 'company', $author_id );			
		$position = get_the_author_meta( 'position', $author_id );
		$gender = get_the_author_meta( 'gender', $author_id );	
		$country = get_the_author_meta( 'country', $author_id );	
		$gender = get_the_author_meta( 'gender', $author_id );
		
		$html = '';
		
		if(!empty($company))
		$html .= '<div class="meta "><i class="fa fa-university"></i> '.ucfirst($position).' at '.ucfirst($company).'</div>	';
		
		if(!empty($country))
		$html .= '<div class="meta "><i class="fa fa-globe"></i> '.ucfirst($country).'</div>';
		
		if(!empty($user_url))
		$html .= '<div class="meta "><i class="fa fa-link"></i> <a href="'.$user_url.'">'.$user_url.'</a></div>';
		
		return $html;
		
		}		
		
		
		
	function author_about(){
		
		$author = get_queried_object();
		$author_id = $author->ID;
		ob_start();
		//var_dump($author_id);
		?>
        <div class="author-about">
        <?php
       	echo get_the_author_meta( 'description', $author_id );
		?>
        </div>
        <?php
		return ob_get_clean();
		
		} 
	
	
	
	function author_comment_list(){
		
		$author = get_queried_object();
		$author_id = $author->ID;
		ob_start();
		//var_dump($author_id);
		
		$args = array(
			'user_id' => $author_id, // use user_id
		
		);
		
		
		$comments = get_comments($args);
		
		
		?>
        <div class="comment-list">
        <?php
		if(!empty($comments))
			{
				foreach($comments as $comment) :
					
					//var_dump($comment);
					
					echo '<div class="comment">';

					echo '<span class="comment_author">'.$comment->comment_author.'</span> ';
					echo '<span class="">'.__('Commented on','').'</span> ';	
					echo '<a class="post-link" href="'.get_permalink($comment->comment_post_ID).'">'.get_the_title($comment->comment_post_ID).'</a> ';	
					
					$comment_date = new DateTime($comment->comment_date);
					$comment_date = $comment_date->format('M d, Y');
									
					echo '<span class="date">'.$comment_date.'</span>';				
					echo '<div class="comment_content"><i class="fa fa-comments-o"></i> '.$comment->comment_content.'</div>';
	
					
					echo '</div>';
					
					
				endforeach;
		
			}
		else
			{
					echo '<div class="comment">';
					echo '<div class="author-comment">No Comment Found</div>';
					echo '</div>';	
				
			}
		?>
        </div>
        <?php
		return ob_get_clean();
		
		} 	
	
	
	
	function author_post_list(){
		
		$author = get_queried_object();
		$author_id = $author->ID;
		
		

		$posts_per_page = get_option('posts_per_page');
		
		global $wp_query;
		$wp_query = new WP_Query(
			array (
				'post_type' => 'post',
				'orderby' => 'date',
				'order' => 'DESC',
				'posts_per_page' => $posts_per_page,
				'author' => $author_id,
				
			) );
				
		$html = '';
		$html.= '<div class="author-post-list" >';
		
		if ( $wp_query->have_posts() ) :
		while ( $wp_query->have_posts() ) : $wp_query->the_post();
		
		//global $product;

		//$featured = get_post_meta( get_the_ID(), '_featured', true );
		
		
		
		
		$post_thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()),'full' );
		
		$post_thumb_url = $post_thumb['0'];

		
		
		$html.= '<div class="author-post" >';
			
	
				
		$html.= '<a class="post-title" href="'.get_permalink().'">'.get_the_title().'</a>
		<div class="post-content">'.wp_trim_words( get_the_content() , 30, '<a class="read-more" href="'. get_permalink() .'">Read More</a>' ).'</div>';

		if(!empty($post_thumb_url)){
			$html.= '<div class="post-thumb"><a href="'.get_permalink().'"><img src="'.$post_thumb_url.'" /></a></div>';
			}
		
		
		$html.= '</div>';
		
		endwhile;
		
		//wp_reset_query();
		

		
		endif;
		

			
		$html .= '</div>';	
		
		return $html;
		
		}
	

	
	
	}
	

new class_user_profile_function();
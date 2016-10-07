<?php




if ( ! defined('ABSPATH')) exit; // if direct access 




add_filter( 'template_include', 'user_profile_author_template', 99 );

function user_profile_author_template( $template ) {

	if ( is_author()  ) {
		
		get_header();
		

		$author_html =  do_shortcode( '[user_profile]' ); 
		echo $author_html;
		
		//include(up_paratheme_plugin_dir.'templates/author.php');
		
		get_footer();
		
		}
	else{
			return $template;
		}

	
}










function up_paratheme_author_profile_info($author_id)
	{
		
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
		$html .= '<ul class="author-info-list">';
		
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
		
		$html .= '<li>
					<div authorid="'.$author_id.'" class="author-follow '.$follow_status.'">'.$follow_text.'</div>
					<span class="author-follow-count"> '.$follower_count.' '.__('Total folowers.','user_profile').' </span>
				</li>';	
		
		$html .= '<li><div class="follower-mgs"> </div><div class="follower-list">'.up_paratheme_follower_list($author_id).'</div></li>';			
		

		if(!empty($display_name))
		$html .= '<li><i class="fa fa-user"></i>'.ucfirst($display_name).'</li>';
		
		if(!empty($company))
		$html .= '<li><i class="fa fa-university"></i>'.ucfirst($position).' at '.ucfirst($company).'</li>	';
		
		if(!empty($country))
		$html .= '<li><i class="fa fa-globe"></i>'.ucfirst($country).'</li>';
		
		if(!empty($user_url))
		$html .= '<li><i class="fa fa-link"></i><a href="'.$user_url.'">'.$user_url.'</a></li>';


		$html .= '</ul>';		
		$html .= '';
		
		
		
		return $html;
		
		}




function up_paratheme_post_author_about($author_id)
	{
		
		$description  = get_the_author_meta( 'description', $author_id );
		
		$html = '';
		$html .= '<div class="author-about">';
		if(!empty($description))
			{
				$html .= '<div class="description">'.$description.'</div>';
			}
		else
			{
				$html .= '<div class="description">This user hasn\'t filled description yet.</div>';
			}
				
		$html .= '</div>';
		
		
		
		return $html;
		
		}







function up_paratheme_author_comment_list($author_id)
	{
		
		
		$profile_img = get_the_author_meta( 'profile_img', $author_id );
		$display_name = get_the_author_meta( 'display_name', $author_id );			
		
		
		$html = '';
		$html .= '<div class="comment-list">';
		
		
		$args = array(
			'user_id' => $author_id, // use user_id
		
		);
		
		
		$comments = get_comments($args);
		
		if(!empty($comments))
			{
				foreach($comments as $comment) :
					
					$html .= '<div class="comment">';
					if(!empty($profile_img))
						{
						$html .= '<div class="author-thumb"><img src="'.$profile_img.'" /></div>';
						}
					else
						{
						$html .= '<div class="author-thumb"><img src="'.up_paratheme_plugin_url.'css/avatar.png" /></div>';
						}
					
					$html .= '<div class="author-name">'.$comment->comment_author.'</div>';
					$html .= '<div class="author-comment">'.$comment->comment_content.'</div>';
	
					
					$html .= '</div>';
					
					
				endforeach;
		
			}
		else
			{
					$html .= '<div class="comment">';
					$html .= '<div class="author-comment">No Comment Found</div>';
					$html .= '</div>';	
				
			}
			

		
		$html .= '</div>';
		
		
		
		return $html;
	}







function up_paratheme_author_post_list($author_id)
	{
		
		
		
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
		
		global $product;

		$featured = get_post_meta( get_the_ID(), '_featured', true );
		
		
		
		
		$post_thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()),'full' );
		
		$post_thumb_url = $post_thumb['0'];

		
		
		$html.= '<div class="author-post" >';
			
		if($featured=="yes")
			{
			$html.= '<div class="featured"></div>';
			}
				
		
				
				
				
				
		$html.= '<div class="post-title"><a href="'.get_permalink().'"><i class="fa fa-file-text-o"></i>
'.get_the_title().'</a></div>
		<div class="post-content">'.wp_trim_words( get_the_content() , 30, '<a class="read-more" href="'. get_permalink() .'">Read More</a>' ).'</div>';

		if(!empty($post_thumb_url))
		$html.= '<div class="post-thumb"><a href="'.get_permalink().'"><img src="'.$post_thumb_url.'" /></a></div>
		

			</div>';
		
		endwhile;
		
		wp_reset_query();
		
		else :
		
		$html.= '<div class="author-post" >';

		$html.= '<div class="post-title"><a href="'.get_permalink().'"><i class="fa fa-file-text-o"></i>
No Post Found</a></div>
		<div class="post-content">No post found for this user.</div>

			</div>';	
		
		endif;
		

			
		$html .= '</div>';		
				
		return $html;	
				
				
				
	}
		
		
		
		

function up_paratheme_add_new_field()
	{


		$up_paratheme_input_fields_meta = get_option( 'up_paratheme_input_fields_meta' );
		
		if(empty($up_paratheme_input_fields_meta))
			{
				$up_paratheme_input_fields_meta = array();
			}
			
		$up_paratheme_input_fields_icon = get_option( 'up_paratheme_input_fields_icon' );
		
		if(empty($up_paratheme_input_fields_icon))
			{
				$up_paratheme_input_fields_icon = array();
			}
		$up_paratheme_input_fields_lable = get_option( 'up_paratheme_input_fields_lable' );
		
		if(empty($up_paratheme_input_fields_lable))
			{
				$up_paratheme_input_fields_lable = array();
			}
		
		$up_paratheme_input_fields_type = get_option( 'up_paratheme_input_fields_type' );
		
		if(empty($up_paratheme_input_fields_type))
			{
				$up_paratheme_input_fields_type = array();
			}
		
		$up_paratheme_input_fields_tooltip = get_option( 'up_paratheme_input_fields_tooltip' );
		
		if(empty($up_paratheme_input_fields_tooltip))
			{
				$up_paratheme_input_fields_tooltip = array();
			}
		

		
		$meta  = array($_POST["meta"] => $_POST["meta"]);
		$icon  = array($_POST["meta"] => $_POST["icon"]);
		$lable  = array($_POST["meta"] => $_POST["lable"]);
		$type  = array($_POST["meta"] => $_POST["type"]);
		$tooltip  = array($_POST["meta"] => $_POST["tooltip"]);


		$up_paratheme_input_fields_meta = array_merge( $up_paratheme_input_fields_meta, $meta );
		$up_paratheme_input_fields_icon =  array_merge( $up_paratheme_input_fields_icon, $icon );
		$up_paratheme_input_fields_lable =  array_merge( $up_paratheme_input_fields_lable, $lable );
		$up_paratheme_input_fields_type =  array_merge( $up_paratheme_input_fields_type, $type );
		$up_paratheme_input_fields_tooltip =  array_merge( $up_paratheme_input_fields_tooltip, $tooltip );


		
		update_option('up_paratheme_input_fields_meta', $up_paratheme_input_fields_meta);
		update_option('up_paratheme_input_fields_icon', $up_paratheme_input_fields_icon);
		update_option('up_paratheme_input_fields_lable', $up_paratheme_input_fields_lable);
		update_option('up_paratheme_input_fields_type', $up_paratheme_input_fields_type);
		update_option('up_paratheme_input_fields_tooltip', $up_paratheme_input_fields_tooltip);


		
		
		die();
	}

add_action('wp_ajax_up_paratheme_add_new_field', 'up_paratheme_add_new_field');
add_action('wp_ajax_nopriv_up_paratheme_add_new_field', 'up_paratheme_add_new_field');






function up_paratheme_reset()
	{
		
		$up_paratheme_input_fields_meta = array("company"=>"company","position"=>"position","gender"=>"gender","profile_img"=>"profile_img","profile_cover"=>"profile_cover","country"=>"country","facebook"=>"facebook","twitter"=>"twitter","google-plus"=>"google-plus","pinterest"=>"pinterest","linkedin"=>"linkedin");
	

		$up_paratheme_input_fields_lable = array("company"=>"Company","position"=>"Position","gender"=>"Gender","profile_img"=>"Profile Image","profile_cover"=>"Profile Cover","country"=>"Country","facebook"=>"Facebook","twitter"=>"Twitter","google-plus"=>"Google Plus","pinterest"=>"Pinterest","linkedin"=>"Linkedin",);
		
			
		$up_paratheme_input_fields_type = array("company"=>"text","position"=>"text","gender"=>"text","profile_img"=>"file","profile_cover"=>"file","country"=>"text","facebook"=>"text","twitter"=>"text","google-plus"=>"text","pinterest"=>"text","linkedin"=>"text",);
				
		$up_paratheme_input_fields_icon = array("company"=>"university","position"=>"bookmark","gender"=>"user","profile_img"=>"image","profile_cover"=>"image","country"=>"map-marker","facebook"=>"facebook","twitter"=>"twitter","google-plus"=>"google-plus","pinterest"=>"pinterest","linkedin"=>"linkedin",);
			

		$up_paratheme_input_fields_tooltip = array(
			"company"=>"Input field for Company",
			"position"=>"Input field for Position",
			"gender"=>"Input field for Gender",
			"profile_img"=>"Input field for Profile Image",
			"profile_cover"=>"Input field for Profile Cover",
			"country"=>"Input field for Country",
			"facebook"=>"Input field for Facebook",
			"twitter"=>"Input field for Twitter",
			"google-plus"=>"Input field for Google Plus",
			"pinterest"=>"Input field for  Pinterest",
			"linkedin"=>"Input field for linkedin",
			);
		
		
		
		update_option('up_paratheme_input_fields_meta', $up_paratheme_input_fields_meta);
		update_option('up_paratheme_input_fields_icon', $up_paratheme_input_fields_icon);
		update_option('up_paratheme_input_fields_lable', $up_paratheme_input_fields_lable);
		update_option('up_paratheme_input_fields_type', $up_paratheme_input_fields_type);
		update_option('up_paratheme_input_fields_tooltip', $up_paratheme_input_fields_tooltip);
		
	
		
		die();
	}

add_action('wp_ajax_up_paratheme_reset', 'up_paratheme_reset');
add_action('wp_ajax_nopriv_up_paratheme_reset', 'up_paratheme_reset');



function up_paratheme_delete_field()
	{

		$meta = $_POST["meta"];
		
		$up_paratheme_input_fields_meta = get_option( 'up_paratheme_input_fields_meta' );
		$up_paratheme_input_fields_icon = get_option( 'up_paratheme_input_fields_icon' );
		$up_paratheme_input_fields_lable = get_option( 'up_paratheme_input_fields_lable' );
		$up_paratheme_input_fields_type = get_option( 'up_paratheme_input_fields_type' );
		$up_paratheme_input_fields_tooltip = get_option( 'up_paratheme_input_fields_tooltip' );


		unset($up_paratheme_input_fields_meta[$meta]);
		unset($up_paratheme_input_fields_icon[$meta]);
		unset($up_paratheme_input_fields_lable[$meta]);
		unset($up_paratheme_input_fields_type[$meta]);
		unset($up_paratheme_input_fields_tooltip[$meta]);
		
		
		update_option('up_paratheme_input_fields_meta', $up_paratheme_input_fields_meta);
		update_option('up_paratheme_input_fields_icon', $up_paratheme_input_fields_icon);
		update_option('up_paratheme_input_fields_lable', $up_paratheme_input_fields_lable);
		update_option('up_paratheme_input_fields_type', $up_paratheme_input_fields_type);
		update_option('up_paratheme_input_fields_tooltip', $up_paratheme_input_fields_tooltip);
		

		
		die();
	}

add_action('wp_ajax_up_paratheme_delete_field', 'up_paratheme_delete_field');
add_action('wp_ajax_nopriv_up_paratheme_delete_field', 'up_paratheme_delete_field');




add_action( 'show_user_profile', 'up_paratheme_extra_fields' );
add_action( 'edit_user_profile', 'up_paratheme_extra_fields' );

function up_paratheme_extra_fields( $user )
	{
    ?>
        <h3>Extra Profile Fields(By User Profile Plugin)</h3>

        <table class="form-table">
        
       
		<?php
		
		$up_paratheme_input_fields_meta = get_option( 'up_paratheme_input_fields_meta' );
		$up_paratheme_input_fields_lable = get_option( 'up_paratheme_input_fields_lable' );		
		$up_paratheme_input_fields_type = get_option( 'up_paratheme_input_fields_type' );
		$up_paratheme_input_fields_tooltip = get_option( 'up_paratheme_input_fields_tooltip' );		
		

		
		if(empty($up_paratheme_input_fields_meta))
			{
				$up_paratheme_input_fields_meta = array("company"=>"company","position"=>"position","gender"=>"gender","profile_img"=>"profile_img","profile_cover"=>"profile_cover","country"=>"country","facebook"=>"facebook","twitter"=>"twitter","google-plus"=>"google-plus","pinterest"=>"pinterest","linkedin"=>"linkedin");
			}

		if(empty($up_paratheme_input_fields_lable))
			{
				$up_paratheme_input_fields_lable = array("company"=>"Company","position"=>"Position","gender"=>"Gender","profile_img"=>"Profile Image","profile_cover"=>"Profile Cover","country"=>"Country","facebook"=>"Facebook","twitter"=>"Twitter","google-plus"=>"Google Plus","pinterest"=>"Pinterest","linkedin"=>"Linkedin",);
			}

		if(empty($up_paratheme_input_fields_type))
			{
				$up_paratheme_input_fields_type = array("company"=>"text","position"=>"text","gender"=>"text","profile_img"=>"file","profile_cover"=>"file","country"=>"text","facebook"=>"text","twitter"=>"text","google-plus"=>"text","pinterest"=>"text","linkedin"=>"text",);
			}


		if(empty($up_paratheme_input_fields_tooltip))
			{
				$up_paratheme_input_fields_tooltip = array(
					"company"=>"Input field for Company",
					"position"=>"Input field for Position",
					"gender"=>"Input field for Gender",
					"profile_img"=>"Input field for Profile Image",
					"profile_cover"=>"Input field for Profile Cover",
					"country"=>"Input field for Country",
					"facebook"=>"Input field for Facebook",
					"twitter"=>"Input field for Twitter",
					"google-plus"=>"Input field for Google Plus",
					"pinterest"=>"Input field for  Pinterest",
					"linkedin"=>"Input field for linkedin",
					);
			}




		
            foreach ($up_paratheme_input_fields_meta as $value) {
                if(!empty($value))
                    {
                        ?>
                    <tr>                    
                	<th><label for="<?php echo $value; ?>"><?php echo $up_paratheme_input_fields_lable[$value]; ?></label></th>
                	<td>
                    <?php
                    	
						if($up_paratheme_input_fields_type[$value]== 'textarea')
							{
							?>
                            <textarea cols="30" rows="5" name="<?php echo $value; ?>" ><?php echo esc_attr(get_the_author_meta( $value, $user->ID )); ?></textarea>
                            <?php
							
							}
						else if($up_paratheme_input_fields_type[$value]== 'file')
							{
							?>
                            <input required type="text" size='40' id="upload_image<?php echo $value; ?>" name="<?php echo $value; ?>" value="<?php echo esc_attr(get_the_author_meta( $value, $user->ID )); ?>" />
                            <input id="upload_image_button<?php echo $value; ?>" class="up_paratheme_upload_button button" type="button" value="Upload Image" />
                            
                            
                            <script>
								jQuery(document).ready(function($){
	
									var custom_uploader; 
								 
									jQuery('#upload_image_button<?php echo $value; ?>').click(function(e) {
	
										e.preventDefault();
								 
										//If the uploader object has already been created, reopen the dialog
										if (custom_uploader) {
											custom_uploader.open();
											return;
										}
								
										//Extend the wp.media object
										custom_uploader = wp.media.frames.file_frame = wp.media({
											title: 'Choose Image',
											button: {
												text: 'Choose Image'
											},
											multiple: false
										});
								
										//When a file is selected, grab the URL and set it as the text field's value
										custom_uploader.on('select', function() {
											attachment = custom_uploader.state().get('selection').first().toJSON();
											jQuery('#upload_image<?php echo $value; ?>').val(attachment.url);
										});
								 
										//Open the uploader dialog
										custom_uploader.open();
								 
									});
									
									
								})
							</script>
                            

							
							
							
							
							
							
							
							<?php
							
							}							
							
							
						else
							{
							?>
                            <input type="text" name="<?php echo $value; ?>" value="<?php echo esc_attr(get_the_author_meta( $value, $user->ID )); ?>" class="regular-text" />
                            <?php
							
							}
					
					?>


                    </td>
                    </tr>
                        <?php
                    
                    }
        
              
              
            }
        
        ?>
        


        </table>
    <?php
}




add_action( 'personal_options_update', 'save_up_paratheme_extra_fields' );
add_action( 'edit_user_profile_update', 'save_up_paratheme_extra_fields' );

function save_up_paratheme_extra_fields( $user_id ){
	
	//update_user_meta( $user_id, 'title', sanitize_text_field( $_POST['title'] ) );
	
	//var_dump($_POST);
	
	
	$up_paratheme_input_fields_meta = get_option( 'up_paratheme_input_fields_meta' );
		
	//var_dump($up_paratheme_input_fields_meta);
		
		
	foreach ($up_paratheme_input_fields_meta as $value) {
		if(!empty($value))
			{
				update_user_meta( $user_id,$value, sanitize_text_field( $_POST[$value] ) );
			
			}
		}
	

}









function up_paratheme_update_follow($postid)
	{
		$authorid = (int)$_POST['authorid'];
		$author_info = get_userdata( $authorid );
		$html = array();
		
		global $wpdb;
		$table = $wpdb->prefix . "up_paratheme_follow";
		
		if ( is_user_logged_in() ) 
			{
				$follower_id = get_current_user_id();
				
				if($authorid == $follower_id)
					{
						$html['self_follow'] = '<i class="fa fa-exclamation-circle"></i> You cant follow yourself.';
					}
				else
					{
						
						
						$result = $wpdb->get_results("SELECT * FROM $table WHERE author_id = '$authorid' AND follower_id = '$follower_id'", ARRAY_A);
						
						$already_insert = $wpdb->num_rows;
		
						if($already_insert > 0 )
							{
									
								$wpdb->delete( $table, array( 'author_id' => $authorid, 'follower_id' => $follower_id), array( '%d','%d' ) );
								//$wpdb->query("UPDATE $table SET followed = '$followed' WHERE author_id = '$authorid' AND follower_id = '$follower_id'");
								
								
								
								$html['unfollow_success'] = 'You are not following <strong>'. $author_info->user_login.'</strong>';
								$html['follow_class'] = 'follow_no';
								$html['follower_id'] = $follower_id;
		
							}
						else
							{
								$wpdb->query( $wpdb->prepare("INSERT INTO $table 
															( id, author_id, follower_id, follow)
													VALUES	( %d, %d, %d, %s )",
													array	( '', $authorid, $follower_id, 'yes')
															));
															
								$html['follow_success'] = 'Thanks for following <strong>'.$author_info->user_login.'</strong>';
								$html['follow_class'] = 'follow_yes';
								
								$html['follower_html'] = '<div class="follower follower-'.$follower_id.'">'.get_avatar( $follower_id, 32 ).'</div>';
		
							}
							
					}
			}
		else
			{
				$html['login_error'] = 'Please login first.';
			}

			
		$display_name = get_the_author_meta( 'display_name', $authorid );
		$follower_count = $wpdb->get_var($wpdb->prepare( "SELECT COUNT(id) FROM ".$table." WHERE author_id = '%s'", $authorid) );
		
		$html['follower_count_msg'] = $follower_count.' '.__('Follower','user_profile');
				
		echo json_encode($html);
		

		die();		
	}

add_action('wp_ajax_up_paratheme_update_follow', 'up_paratheme_update_follow');
add_action('wp_ajax_nopriv_up_paratheme_update_follow', 'up_paratheme_update_follow');



function up_paratheme_follower_list($author_id)
	{

	
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



	

	
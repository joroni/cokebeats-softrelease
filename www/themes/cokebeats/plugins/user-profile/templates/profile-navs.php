<?php
/*
* @Author 		PickPlugins
* Copyright: 	2015 PickPlugins.com
*/

if ( ! defined('ABSPATH')) exit;  // if direct access 

	$author = get_queried_object();
	$author_id = $author->ID;

	$class_user_profile_function = new class_user_profile_function();
	$profile_navs = $class_user_profile_function->profile_navs();

	//var_dump($profile_navs);
?>

<div class="profile-navs">
	<ul class="navs">
    <?php
    
	$i=0;
	foreach($profile_navs as $nav_key=>$navs){
		echo '<li class="" nav="'.$i.'">';
		echo $navs['title'];
		echo '</li>';
		
		$i++;
		}
	
	?>
    </ul>
    
    <div class="profile-sidebar">
    <?php
    do_action('user_profile_action_profile_sidebar');
	?>
     
    </div>
    
	<div class="nav-box">
    <?php
    $i=0;
	foreach($profile_navs as $nav_key=>$navs){
		
		if($i==0){
			$style = 'style="display:block"';
			}
		else{
				$style = 'style="display:none"';
			}
		echo '<div class="box box-'.$i.'" '.$style.' >';
		
		
		echo $navs['html'];
		echo '</div>';
		
		$i++;
		}
	
	?>
    </div>    
    

    
    
    
</div>
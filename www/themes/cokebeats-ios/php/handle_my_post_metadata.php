<?php
add_filter( 'wpak_post_data', 'add_meta_to_my_app_posts', 10, 3 );
function add_meta_to_my_app_posts ( $post_data, $post, $component ) {
    //Add our meta to the application post data :
    $post_data['my_meta'] = get_post_meta( $post->ID, 'my_meta', true);
    return $post_data; //Return the modified $post_data
}
$post_data['my_meta'] = get_field('my_meta'); //Post ID not necessary here

if( $post->post_type == 'my-post-type' ) { //add custom field here }

if( $component->slug == 'my-component' ) { //add custom field here }

?>
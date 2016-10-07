<?php	


if ( ! defined('ABSPATH')) exit; // if direct access 



if(empty($_POST['up_paratheme_hidden']))
	{

	
		$up_paratheme_input_fields_meta = get_option( 'up_paratheme_input_fields_meta' );
		$up_paratheme_input_fields_icon = get_option( 'up_paratheme_input_fields_icon' );	
		$up_paratheme_input_fields_lable = get_option( 'up_paratheme_input_fields_lable' );		
		$up_paratheme_input_fields_type = get_option( 'up_paratheme_input_fields_type' );	
		$up_paratheme_input_fields_tooltip = get_option( 'up_paratheme_input_fields_tooltip' );	
		

		
		
		if(empty($up_paratheme_input_fields_meta))
			{
				$up_paratheme_input_fields_meta = array("facebook"=>"facebook","twitter"=>"twitter","google-plus"=>"google-plus","pinterest"=>"pinterest","linkedin"=>"linkedin","gender"=>"gender","profile_img"=>"profile_img","profile_cover"=>"profile_cover","country"=>"country");
			}
			
		if(empty($up_paratheme_input_fields_lable))
			{
				$up_paratheme_input_fields_lable = array("facebook"=>"Facebook","twitter"=>"Twitter","google-plus"=>"Google Plus","pinterest"=>"Pinterest","linkedin"=>"Linkedin","gender"=>"Gender","profile_img"=>"Profile Image","profile_cover"=>"Profile Cover","country"=>"Country");
			}			
			
		if(empty($up_paratheme_input_fields_type))
			{
				$up_paratheme_input_fields_type = array("facebook"=>"text","twitter"=>"text","google-plus"=>"text","pinterest"=>"text","linkedin"=>"text","gender"=>"text","profile_img"=>"file","profile_cover"=>"file","country"=>"text");
			}				
			
			
			
		if(empty($up_paratheme_input_fields_icon))
			{
				$up_paratheme_input_fields_icon = array("facebook"=>"facebook","twitter"=>"twitter","google-plus"=>"google-plus","pinterest"=>"pinterest","linkedin"=>"linkedin","gender"=>"user","profile_img"=>"image","profile_cover"=>"image","country"=>"map-marker");
			}			
			
		if(empty($up_paratheme_input_fields_tooltip))
			{
				$up_paratheme_input_fields_tooltip = array(
					"facebook"=>"Input field for Facebook",
					"twitter"=>"Input field for Twitter",
					"google-plus"=>"Input field for Google Plus",
					"pinterest"=>"Input field for  Pinterest",
					"linkedin"=>"Input field for linkedin",
					"gender"=>"Input field for Gender",
					"profile_img"=>"Input field for Profile Image",
					"profile_cover"=>"Input field for Profile Cover",
					"country"=>"Input field for Country");
			}			
		
		
		
	}
else
	{	
		if($_POST['up_paratheme_hidden'] == 'Y') {
			//Form data sent

			
			$up_paratheme_input_fields_icon = stripslashes_deep($_POST['up_paratheme_input_fields_icon']);
			update_option('up_paratheme_input_fields_icon', $up_paratheme_input_fields_icon);			

			$up_paratheme_input_fields_lable = stripslashes_deep($_POST['up_paratheme_input_fields_lable']);
			update_option('up_paratheme_input_fields_lable', $up_paratheme_input_fields_lable);			
			
			$up_paratheme_input_fields_meta = stripslashes_deep($_POST['up_paratheme_input_fields_meta']);
			update_option('up_paratheme_input_fields_meta', $up_paratheme_input_fields_meta);				
	
			$up_paratheme_input_fields_type = stripslashes_deep($_POST['up_paratheme_input_fields_type']);
			update_option('up_paratheme_input_fields_type', $up_paratheme_input_fields_type);
	
			$up_paratheme_input_fields_tooltip = stripslashes_deep($_POST['up_paratheme_input_fields_tooltip']);
			update_option('up_paratheme_input_fields_tooltip', $up_paratheme_input_fields_tooltip);	
	
	
	
			?>
			<div class="updated"><p><strong><?php _e('Changes Saved.' ); ?></strong></p></div>
	
			<?php
			} 
	}
?>





<div class="wrap">

	<div id="icon-tools" class="icon32"><br></div><?php echo "<h2>".__(up_paratheme_plugin_name.' Settings')."</h2>";?>
		<form  method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
	<input type="hidden" name="up_paratheme_hidden" value="Y">
        <?php settings_fields( 'up_paratheme_plugin_options' );
				do_settings_sections( 'up_paratheme_plugin_options' );
			
		?>

    <div class="para-settings up-paratheme-settings">
    
        <ul class="tab-nav"> 
            <li nav="1" class="nav1 active">Custom Fields</li>
            <li nav="2" class="nav2">Short-Codes</li>
        </ul> <!-- tab-nav end -->   
    
		<ul class="box">
            <li style="display: block;" class="box1 tab-box active">
				<div class="option-box">
                    <p class="option-title">Custom user profile fields.</p>
                    <p class="option-info"></p>
                    
                    <table class="data-table">
                    
                   		<tr>
                        	<th>Icon</th><th>Label</th><th>Meta Key</th><th>Input Type</th><th>Tooltip</th><th>Remove</th>
                        </tr>
                        
						<?php 
        				

		
        
                    foreach ($up_paratheme_input_fields_meta as $value) {
                        if(!empty($value))
                            {
                                ?>
                                
                            <tr>
                                <td><i class="fa fa-<?php echo $up_paratheme_input_fields_icon[$value]; ?> fa-lg"></i>
</td>
                                <td><?php echo $up_paratheme_input_fields_lable[$value]; ?></td>
                                <td><?php echo $up_paratheme_input_fields_meta[$value]; ?></td>
                                <td><?php echo $up_paratheme_input_fields_type[$value]; ?></td>
                                <td><?php echo $up_paratheme_input_fields_tooltip[$value]; ?></td>
                                <td><span class="remove-field" field-value="<?php echo $up_paratheme_input_fields_meta[$value]; ?>"><i class="fa fa-times"></i>
</span>
								</td>
                            </tr>
                                <?php
                            
                            }
                    }
                    
                    ?>
                    </table>
                    
                    <div class="up_paratheme_reset button">Reset To Default</div>
                    <div class="up_paratheme_reset_status success">Reset Successful.</div>
                </div>
                
                
                
                
				<div class="option-box">
                    <p class="option-title">Add New field</p>
                    <p class="option-info"></p>
                    
                    
                    <div class="create-new-field">
						<table class="para-form-table">
                        	<tr>
                            	<th>Label</th>
                                <td>
                                <input size="10" type="text" class="up_paratheme_input_fields_lable" name="up_paratheme_input_fields_lable" value=""  /><br />
                                </td>                            
                            
                            <tr>
                           		<th>Meta Key</th>
                                <td>
                                <input size="10" type="text" class="up_paratheme_input_fields_meta" name="up_paratheme_input_fields_meta" value=""  /><br />
                                </td>                              
                            </tr>
                            
                            <tr>
                                <th>Input Type</th>
                                <td>
                                <select class="up_paratheme_input_fields_type" name="up_paratheme_input_fields_type" 
                                    <option value="" >Please select</option>
                                    <option value="text" > Text </option>
                                    <option value="textarea" > Textarea </option>
                                    <option value="file" > File </option>
                                    <option value="checkbox" >Checkbox </option>  
                                    <option value="radio" >Radio </option>  
                                                                    
                                </select>
    
                                </td>
                           	</tr>
                            <tr>
                            	<th>Tooltip</th>
                                <td>
                                <input size="10" type="text"  class="up_paratheme_input_fields_tooltip" name="up_paratheme_input_fields_tooltip" value=""  /><br />
                                </td>                             
       
                            </tr>
                            
                            <tr>
                                <th>Icon</th>
                                <td>
                                <div class="up-icon-list">
                                <?php

	$fa_icons = array(
		'none' => 'No Icon',
		'fa-adjust' => 'adjust',
		'fa-anchor' => 'anchor',
		'fa-archive' => 'archive',
		'fa-arrows' => 'arrows',
		'fa-arrows-h' => 'arrows-h',
		'fa-arrows-v' => 'arrows-v',
		'fa-asterisk' => 'asterisk',
		'fa-automobile' => 'automobile',
		'fa-ban' => 'ban',
		'fa-bank' => 'bank',
		'fa-bar-chart-o' => 'bar-chart-o',
		'fa-barcode' => 'barcode',
		'fa-bars' => 'bars',
		'fa-beer' => 'beer',
		'fa-bell' => 'bell',
		'fa-bell-o' => 'bell-o',
		'fa-bolt' => 'bolt',
		'fa-bomb' => 'bomb',
		'fa-book' => 'book',
		'fa-bookmark' => 'bookmark',
		'fa-bookmark-o' => 'bookmark-o',
		'fa-briefcase' => 'briefcase',
		'fa-bug' => 'bug',
		'fa-building' => 'building',
		'fa-building-o' => 'building-o',
		'fa-bullhorn' => 'bullhorn',
		'fa-bullseye' => 'bullseye',
		'fa-cab' => 'cab',
		'fa-calendar' => 'calendar',
		'fa-calendar-o' => 'calendar-o',
		'fa-camera' => 'camera',
		'fa-camera-retro' => 'camera-retro',
		'fa-car' => 'car',
		'fa-caret-square-o-down' => 'caret-square-o-down',
		'fa-caret-square-o-left' => 'caret-square-o-left',
		'fa-caret-square-o-right' => 'caret-square-o-right',
		'fa-caret-square-o-up' => 'caret-square-o-up',
		'fa-certificate' => 'certificate',
		'fa-check' => 'check',
		'fa-check-circle' => 'check-circle',
		'fa-check-circle-o' => 'check-circle-o',
		'fa-check-square' => 'check-square',
		'fa-check-square-o' => 'check-square-o',
		'fa-child' => 'child',
		'fa-circle' => 'circle',
		'fa-circle-o' => 'circle-o',
		'fa-circle-o-notch' => 'circle-o-notch',
		'fa-circle-thin' => 'circle-thin',
		'fa-clock-o' => 'clock-o',
		'fa-cloud' => 'cloud',
		'fa-cloud-download' => 'cloud-download',
		'fa-cloud-upload' => 'cloud-upload',
		'fa-code' => 'code',
		'fa-code-fork' => 'code-fork',
		'fa-coffee' => 'coffee',
		'fa-cog' => 'cog',
		'fa-cogs' => 'cogs',
		'fa-comment' => 'comment',
		'fa-comment-o' => 'comment-o',
		'fa-comments' => 'comments',
		'fa-comments-o' => 'comments-o',
		'fa-compass' => 'compass',
		'fa-credit-card' => 'credit-card',
		'fa-crop' => 'crop',
		'fa-crosshairs' => 'crosshairs',
		'fa-cube' => 'cube',
		'fa-cubes' => 'cubes',
		'fa-cutlery' => 'cutlery',
		'fa-dashboard' => 'dashboard',
		'fa-database' => 'database',
		'fa-desktop' => 'desktop',
		'fa-dot-circle-o' => 'dot-circle-o',
		'fa-download' => 'download',
		'fa-edit' => 'edit',
		'fa-ellipsis-h' => 'ellipsis-h',
		'fa-ellipsis-v' => 'ellipsis-v',
		'fa-envelope' => 'envelope',
		'fa-envelope-o' => 'envelope-o',
		'fa-envelope-square' => 'envelope-square',
		'fa-eraser' => 'eraser',
		'fa-exchange' => 'exchange',
		'fa-exclamation' => 'exclamation',
		'fa-exclamation-circle' => 'exclamation-circle',
		'fa-exclamation-triangle' => 'exclamation-triangle',
		'fa-external-link' => 'external-link',
		'fa-external-link-square' => 'external-link-square',
		'fa-eye' => 'eye',
		'fa-eye-slash' => 'eye-slash',
		'fa-fax' => 'fax',
		'fa-female' => 'female',
		'fa-fighter-jet' => 'fighter-jet',
		'fa-file-archive-o' => 'file-archive-o',
		'fa-file-audio-o' => 'file-audio-o',
		'fa-file-code-o' => 'file-code-o',
		'fa-file-excel-o' => 'file-excel-o',
		'fa-file-image-o' => 'file-image-o',
		'fa-file-movie-o' => 'file-movie-o',
		'fa-file-pdf-o' => 'file-pdf-o',
		'fa-file-photo-o' => 'file-photo-o',
		'fa-file-picture-o' => 'file-picture-o',
		'fa-file-powerpoint-o' => 'file-powerpoint-o',
		'fa-file-sound-o' => 'file-sound-o',
		'fa-file-video-o' => 'file-video-o',
		'fa-file-word-o' => 'file-word-o',
		'fa-file-zip-o' => 'file-zip-o',
		'fa-film' => 'film',
		'fa-filter' => 'filter',
		'fa-fire' => 'fire',
		'fa-fire-extinguisher' => 'fire-extinguisher',
		'fa-flag' => 'flag',
		'fa-flag-checkered' => 'flag-checkered',
		'fa-flag-o' => 'flag-o',
		'fa-flash' => 'flash',
		'fa-flask' => 'flask',
		'fa-folder' => 'folder',
		'fa-folder-o' => 'folder-o',
		'fa-folder-open' => 'folder-open',
		'fa-folder-open-o' => 'folder-open-o',
		'fa-frown-o' => 'frown-o',
		'fa-gamepad' => 'gamepad',
		'fa-gavel' => 'gavel',
		'fa-gear' => 'gear',
		'fa-gears' => 'gears',
		'fa-gift' => 'gift',
		'fa-glass' => 'glass',
		'fa-globe' => 'globe',
		'fa-graduation-cap' => 'graduation-cap',
		'fa-group' => 'group',
		'fa-hdd-o' => 'hdd-o',
		'fa-headphones' => 'headphones',
		'fa-heart' => 'heart',
		'fa-heart-o' => 'heart-o',
		'fa-history' => 'history',
		'fa-home' => 'home',
		'fa-image' => 'image',
		'fa-inbox' => 'inbox',
		'fa-info' => 'info',
		'fa-info-circle' => 'info-circle',
		'fa-institution' => 'institution',
		'fa-key' => 'key',
		'fa-keyboard-o' => 'keyboard-o',
		'fa-language' => 'language',
		'fa-laptop' => 'laptop',
		'fa-leaf' => 'leaf',
		'fa-legal' => 'legal',
		'fa-lemon-o' => 'lemon-o',
		'fa-level-down' => 'level-down',
		'fa-level-up' => 'level-up',
		'fa-life-bouy' => 'life-bouy',
		'fa-life-ring' => 'life-ring',
		'fa-life-saver' => 'life-saver',
		'fa-lightbulb-o' => 'lightbulb-o',
		'fa-location-arrow' => 'location-arrow',
		'fa-lock' => 'lock',
		'fa-magic' => 'magic',
		'fa-magnet' => 'magnet',
		'fa-mail-forward' => 'mail-forward',
		'fa-mail-reply' => 'mail-reply',
		'fa-mail-reply-all' => 'mail-reply-all',
		'fa-male' => 'male',
		'fa-map-marker' => 'map-marker',
		'fa-meh-o' => 'meh-o',
		'fa-microphone' => 'microphone',
		'fa-microphone-slash' => 'microphone-slash',
		'fa-minus' => 'minus',
		'fa-minus-circle' => 'minus-circle',
		'fa-minus-square' => 'minus-square',
		'fa-minus-square-o' => 'minus-square-o',
		'fa-mobile' => 'mobile',
		'fa-mobile-phone' => 'mobile-phone',
		'fa-money' => 'money',
		'fa-moon-o' => 'moon-o',
		'fa-mortar-board' => 'mortar-board',
		'fa-music' => 'music',
		'fa-navicon' => 'navicon',
		'fa-paper-plane' => 'paper-plane',
		'fa-paper-plane-o' => 'paper-plane-o',
		'fa-paw' => 'paw',
		'fa-pencil' => 'pencil',
		'fa-pencil-square' => 'pencil-square',
		'fa-pencil-square-o' => 'pencil-square-o',
		'fa-phone' => 'phone',
		'fa-phone-square' => 'phone-square',
		'fa-photo' => 'photo',
		'fa-picture-o' => 'picture-o',
		'fa-plane' => 'plane',
		'fa-plus' => 'plus',
		'fa-plus-circle' => 'plus-circle',
		'fa-plus-square' => 'plus-square',
		'fa-plus-square-o' => 'plus-square-o',
		'fa-power-off' => 'power-off',
		'fa-print' => 'print',
		'fa-puzzle-piece' => 'puzzle-piece',
		'fa-qrcode' => 'qrcode',
		'fa-question' => 'question',
		'fa-question-circle' => 'question-circle',
		'fa-quote-left' => 'quote-left',
		'fa-quote-right' => 'quote-right',
		'fa-random' => 'random',
		'fa-recycle' => 'recycle',
		'fa-refresh' => 'refresh',
		'fa-reorder' => 'reorder',
		'fa-reply' => 'reply',
		'fa-reply-all' => 'reply-all',
		'fa-retweet' => 'retweet',
		'fa-road' => 'road',
		'fa-rocket' => 'rocket',
		'fa-rss' => 'rss',
		'fa-rss-square' => 'rss-square',
		'fa-search' => 'search',
		'fa-search-minus' => 'search-minus',
		'fa-search-plus' => 'search-plus',
		'fa-send' => 'send',
		'fa-send-o' => 'send-o',
		'fa-share' => 'share',
		'fa-share-alt' => 'share-alt',
		'fa-share-alt-square' => 'share-alt-square',
		'fa-share-square' => 'share-square',
		'fa-share-square-o' => 'share-square-o',
		'fa-shield' => 'shield',
		'fa-shopping-cart' => 'shopping-cart',
		'fa-sign-in' => 'sign-in',
		'fa-sign-out' => 'sign-out',
		'fa-signal' => 'signal',
		'fa-sitemap' => 'sitemap',
		'fa-sliders' => 'sliders',
		'fa-smile-o' => 'smile-o',
		'fa-sort' => 'sort',
		'fa-sort-alpha-asc' => 'sort-alpha-asc',
		'fa-sort-alpha-desc' => 'sort-alpha-desc',
		'fa-sort-amount-asc' => 'sort-amount-asc',
		'fa-sort-amount-desc' => 'sort-amount-desc',
		'fa-sort-asc' => 'sort-asc',
		'fa-sort-desc' => 'sort-desc',
		'fa-sort-down' => 'sort-down',
		'fa-sort-numeric-asc' => 'sort-numeric-asc',
		'fa-sort-numeric-desc' => 'sort-numeric-desc',
		'fa-sort-up' => 'sort-up',
		'fa-space-shuttle' => 'space-shuttle',
		'fa-spinner' => 'spinner',
		'fa-spoon' => 'spoon',
		'fa-square' => 'square',
		'fa-square-o' => 'square-o',
		'fa-star' => 'star',
		'fa-star-half' => 'star-half',
		'fa-star-half-empty' => 'star-half-empty',
		'fa-star-half-full' => 'star-half-full',
		'fa-star-half-o' => 'star-half-o',
		'fa-star-o' => 'star-o',
		'fa-suitcase' => 'suitcase',
		'fa-sun-o' => 'sun-o',
		'fa-support' => 'support',
		'fa-tablet' => 'tablet',
		'fa-tachometer' => 'tachometer',
		'fa-tag' => 'tag',
		'fa-tags' => 'tags',
		'fa-tasks' => 'tasks',
		'fa-taxi' => 'taxi',
		'fa-terminal' => 'terminal',
		'fa-thumb-tack' => 'thumb-tack',
		'fa-thumbs-down' => 'thumbs-down',
		'fa-thumbs-o-down' => 'thumbs-o-down',
		'fa-thumbs-o-up' => 'thumbs-o-up',
		'fa-thumbs-up' => 'thumbs-up',
		'fa-ticket' => 'ticket',
		'fa-times' => 'times',
		'fa-times-circle' => 'times-circle',
		'fa-times-circle-o' => 'times-circle-o',
		'fa-tint' => 'tint',
		'fa-toggle-down' => 'toggle-down',
		'fa-toggle-left' => 'toggle-left',
		'fa-toggle-right' => 'toggle-right',
		'fa-toggle-up' => 'toggle-up',
		'fa-trash-o' => 'trash-o',
		'fa-tree' => 'tree',
		'fa-trophy' => 'trophy',
		'fa-truck' => 'truck',
		'fa-umbrella' => 'umbrella',
		'fa-university' => 'university',
		'fa-unlock' => 'unlock',
		'fa-unlock-alt' => 'unlock-alt',
		'fa-unsorted' => 'unsorted',
		'fa-upload' => 'upload',
		'fa-user' => 'user',
		'fa-users' => 'users',
		'fa-video-camera' => 'video-camera',
		'fa-volume-down' => 'volume-down',
		'fa-volume-off' => 'volume-off',
		'fa-volume-up' => 'volume-up',
		'fa-warning' => 'warning',
		'fa-wheelchair' => 'wheelchair',
		'fa-wrench' => 'wrench',
		'fa-file' => 'file',
		'fa-file-archive-o' => 'file-archive-o',
		'fa-file-audio-o' => 'file-audio-o',
		'fa-file-code-o' => 'file-code-o',
		'fa-file-excel-o' => 'file-excel-o',
		'fa-file-image-o' => 'file-image-o',
		'fa-file-movie-o' => 'file-movie-o',
		'fa-file-o' => 'file-o',
		'fa-file-pdf-o' => 'file-pdf-o',
		'fa-file-photo-o' => 'file-photo-o',
		'fa-file-picture-o' => 'file-picture-o',
		'fa-file-powerpoint-o' => 'file-powerpoint-o',
		'fa-file-sound-o' => 'file-sound-o',
		'fa-file-text' => 'file-text',
		'fa-file-text-o' => 'file-text-o',
		'fa-file-video-o' => 'file-video-o',
		'fa-file-word-o' => 'file-word-o',
		'fa-file-zip-o' => 'file-zip-o',
		'fa-circle-o-notch' => 'circle-o-notch',
		'fa-cog' => 'cog',
		'fa-gear' => 'gear',
		'fa-refresh' => 'refresh',
		'fa-spinner' => 'spinner',
		'fa-check-square' => 'check-square',
		'fa-check-square-o' => 'check-square-o',
		'fa-circle' => 'circle',
		'fa-circle-o' => 'circle-o',
		'fa-dot-circle-o' => 'dot-circle-o',
		'fa-minus-square' => 'minus-square',
		'fa-minus-square-o' => 'minus-square-o',
		'fa-plus-square' => 'plus-square',
		'fa-plus-square-o' => 'plus-square-o',
		'fa-square' => 'square',
		'fa-square-o' => 'square-o',
		'fa-bitcoin' => 'bitcoin',
		'fa-btc' => 'btc',
		'fa-cny' => 'cny',
		'fa-dollar' => 'dollar',
		'fa-eur' => 'eur',
		'fa-euro' => 'euro',
		'fa-gbp' => 'gbp',
		'fa-inr' => 'inr',
		'fa-jpy' => 'jpy',
		'fa-krw' => 'krw',
		'fa-money' => 'money',
		'fa-rmb' => 'rmb',
		'fa-rouble' => 'rouble',
		'fa-rub' => 'rub',
		'fa-ruble' => 'ruble',
		'fa-rupee' => 'rupee',
		'fa-try' => 'try',
		'fa-turkish-lira' => 'turkish-lira',
		'fa-usd' => 'usd',
		'fa-won' => 'won',
		'fa-yen' => 'yen',
		'fa-align-center' => 'align-center',
		'fa-align-justify' => 'align-justify',
		'fa-align-left' => 'align-left',
		'fa-align-right' => 'align-right',
		'fa-bold' => 'bold',
		'fa-chain' => 'chain',
		'fa-chain-broken' => 'chain-broken',
		'fa-clipboard' => 'clipboard',
		'fa-columns' => 'columns',
		'fa-copy' => 'copy',
		'fa-cut' => 'cut',
		'fa-dedent' => 'dedent',
		'fa-eraser' => 'eraser',
		'fa-file' => 'file',
		'fa-file-o' => 'file-o',
		'fa-file-text' => 'file-text',
		'fa-file-text-o' => 'file-text-o',
		'fa-files-o' => 'files-o',
		'fa-floppy-o' => 'floppy-o',
		'fa-font' => 'font',
		'fa-header' => 'header',
		'fa-indent' => 'indent',
		'fa-italic' => 'italic',
		'fa-link' => 'link',
		'fa-list' => 'list',
		'fa-list-alt' => 'list-alt',
		'fa-list-ol' => 'list-ol',
		'fa-list-ul' => 'list-ul',
		'fa-outdent' => 'outdent',
		'fa-paperclip' => 'paperclip',
		'fa-paragraph' => 'paragraph',
		'fa-paste' => 'paste',
		'fa-repeat' => 'repeat',
		'fa-rotate-left' => 'rotate-left',
		'fa-rotate-right' => 'rotate-right',
		'fa-save' => 'save',
		'fa-scissors' => 'scissors',
		'fa-strikethrough' => 'strikethrough',
		'fa-subscript' => 'subscript',
		'fa-superscript' => 'superscript',
		'fa-table' => 'table',
		'fa-text-height' => 'text-height',
		'fa-text-width' => 'text-width',
		'fa-th' => 'th',
		'fa-th-large' => 'th-large',
		'fa-th-list' => 'th-list',
		'fa-underline' => 'underline',
		'fa-undo' => 'undo',
		'fa-unlink' => 'unlink',
		'fa-angle-double-down' => 'angle-double-down',
		'fa-angle-double-left' => 'angle-double-left',
		'fa-angle-double-right' => 'angle-double-right',
		'fa-angle-double-up' => 'angle-double-up',
		'fa-angle-down' => 'angle-down',
		'fa-angle-left' => 'angle-left',
		'fa-angle-right' => 'angle-right',
		'fa-angle-up' => 'angle-up',
		'fa-arrow-circle-down' => 'arrow-circle-down',
		'fa-arrow-circle-left' => 'arrow-circle-left',
		'fa-arrow-circle-o-down' => 'arrow-circle-o-down',
		'fa-arrow-circle-o-left' => 'arrow-circle-o-left',
		'fa-arrow-circle-o-right' => 'arrow-circle-o-right',
		'fa-arrow-circle-o-up' => 'arrow-circle-o-up',
		'fa-arrow-circle-right' => 'arrow-circle-right',
		'fa-arrow-circle-up' => 'arrow-circle-up',
		'fa-arrow-down' => 'arrow-down',
		'fa-arrow-left' => 'arrow-left',
		'fa-arrow-right' => 'arrow-right',
		'fa-arrow-up' => 'arrow-up',
		'fa-arrows' => 'arrows',
		'fa-arrows-alt' => 'arrows-alt',
		'fa-arrows-h' => 'arrows-h',
		'fa-arrows-v' => 'arrows-v',
		'fa-caret-down' => 'caret-down',
		'fa-caret-left' => 'caret-left',
		'fa-caret-right' => 'caret-right',
		'fa-caret-square-o-down' => 'caret-square-o-down',
		'fa-caret-square-o-left' => 'caret-square-o-left',
		'fa-caret-square-o-right' => 'caret-square-o-right',
		'fa-caret-square-o-up' => 'caret-square-o-up',
		'fa-caret-up' => 'caret-up',
		'fa-chevron-circle-down' => 'chevron-circle-down',
		'fa-chevron-circle-left' => 'chevron-circle-left',
		'fa-chevron-circle-right' => 'chevron-circle-right',
		'fa-chevron-circle-up' => 'chevron-circle-up',
		'fa-chevron-down' => 'chevron-down',
		'fa-chevron-left' => 'chevron-left',
		'fa-chevron-right' => 'chevron-right',
		'fa-chevron-up' => 'chevron-up',
		'fa-hand-o-down' => 'hand-o-down',
		'fa-hand-o-left' => 'hand-o-left',
		'fa-hand-o-right' => 'hand-o-right',
		'fa-hand-o-up' => 'hand-o-up',
		'fa-long-arrow-down' => 'long-arrow-down',
		'fa-long-arrow-left' => 'long-arrow-left',
		'fa-long-arrow-right' => 'long-arrow-right',
		'fa-long-arrow-up' => 'long-arrow-up',
		'fa-toggle-down' => 'toggle-down',
		'fa-toggle-left' => 'toggle-left',
		'fa-toggle-right' => 'toggle-right',
		'fa-toggle-up' => 'toggle-up',
		'fa-arrows-alt' => 'arrows-alt',
		'fa-backward' => 'backward',
		'fa-compress' => 'compress',
		'fa-eject' => 'eject',
		'fa-expand' => 'expand',
		'fa-fast-backward' => 'fast-backward',
		'fa-fast-forward' => 'fast-forward',
		'fa-forward' => 'forward',
		'fa-pause' => 'pause',
		'fa-play' => 'play',
		'fa-play-circle' => 'play-circle',
		'fa-play-circle-o' => 'play-circle-o',
		'fa-step-backward' => 'step-backward',
		'fa-step-forward' => 'step-forward',
		'fa-stop' => 'stop',
		'fa-youtube-play' => 'youtube-play',
		'fa-adn' => 'adn',
		'fa-android' => 'android',
		'fa-apple' => 'apple',
		'fa-behance' => 'behance',
		'fa-behance-square' => 'behance-square',
		'fa-bitbucket' => 'bitbucket',
		'fa-bitbucket-square' => 'bitbucket-square',
		'fa-bitcoin' => 'bitcoin',
		'fa-btc' => 'btc',
		'fa-codepen' => 'codepen',
		'fa-css3' => 'css3',
		'fa-delicious' => 'delicious',
		'fa-deviantart' => 'deviantart',
		'fa-digg' => 'digg',
		'fa-dribbble' => 'dribbble',
		'fa-dropbox' => 'dropbox',
		'fa-drupal' => 'drupal',
		'fa-empire' => 'empire',
		'fa-facebook' => 'facebook',
		'fa-facebook-square' => 'facebook-square',
		'fa-flickr' => 'flickr',
		'fa-foursquare' => 'foursquare',
		'fa-ge' => 'ge',
		'fa-git' => 'git',
		'fa-git-square' => 'git-square',
		'fa-github' => 'github',
		'fa-github-alt' => 'github-alt',
		'fa-github-square' => 'github-square',
		'fa-gittip' => 'gittip',
		'fa-google' => 'google',
		'fa-google-plus' => 'google-plus',
		'fa-google-plus-square' => 'google-plus-square',
		'fa-hacker-news' => 'hacker-news',
		'fa-html5' => 'html5',
		'fa-instagram' => 'instagram',
		'fa-joomla' => 'joomla',
		'fa-jsfiddle' => 'jsfiddle',
		'fa-linkedin' => 'linkedin',
		'fa-linkedin-square' => 'linkedin-square',
		'fa-linux' => 'linux',
		'fa-maxcdn' => 'maxcdn',
		'fa-openid' => 'openid',
		'fa-pagelines' => 'pagelines',
		'fa-pied-piper' => 'pied-piper',
		'fa-pied-piper-alt' => 'pied-piper-alt',
		'fa-pied-piper-square' => 'pied-piper-square',
		'fa-pinterest' => 'pinterest',
		'fa-pinterest-square' => 'pinterest-square',
		'fa-qq' => 'qq',
		'fa-ra' => 'ra',
		'fa-rebel' => 'rebel',
		'fa-reddit' => 'reddit',
		'fa-reddit-square' => 'reddit-square',
		'fa-renren' => 'renren',
		'fa-share-alt' => 'share-alt',
		'fa-share-alt-square' => 'share-alt-square',
		'fa-skype' => 'skype',
		'fa-slack' => 'slack',
		'fa-soundcloud' => 'soundcloud',
		'fa-spotify' => 'spotify',
		'fa-stack-exchange' => 'stack-exchange',
		'fa-stack-overflow' => 'stack-overflow',
		'fa-steam' => 'steam',
		'fa-steam-square' => 'steam-square',
		'fa-stumbleupon' => 'stumbleupon',
		'fa-stumbleupon-circle' => 'stumbleupon-circle',
		'fa-tencent-weibo' => 'tencent-weibo',
		'fa-trello' => 'trello',
		'fa-tumblr' => 'tumblr',
		'fa-tumblr-square' => 'tumblr-square',
		'fa-twitter' => 'twitter',
		'fa-twitter-square' => 'twitter-square',
		'fa-vimeo-square' => 'vimeo-square',
		'fa-vine' => 'vine',
		'fa-vk' => 'vk',
		'fa-wechat' => 'wechat',
		'fa-weibo' => 'weibo',
		'fa-weixin' => 'weixin',
		'fa-windows' => 'windows',
		'fa-wordpress' => 'wordpress',
		'fa-xing' => 'xing',
		'fa-xing-square' => 'xing-square',
		'fa-yahoo' => 'yahoo',
		'fa-youtube' => 'youtube',
		'fa-youtube-play' => 'youtube-play',
		'fa-youtube-square' => 'youtube-square',
		'fa-ambulance' => 'ambulance',
		'fa-h-square' => 'h-square',
		'fa-hospital-o' => 'hospital-o',
		'fa-medkit' => 'medkit',
		'fa-plus-square' => 'plus-square',
		'fa-stethoscope' => 'stethoscope',
		'fa-user-md' => 'user-md',
		'fa-wheelchair' => 'wheelchair',
	);
	

								foreach ($fa_icons as $value) {
									
									if($value == "No Icon")
										{
										?>

											<label for="fa-<?php echo $value; ?>">
											<input class="up_paratheme_input_fields_icon" type="radio" id="fa-<?php echo $value; ?>" name="up_paratheme_input_fields_icon" value="<?php echo $value; ?>" />None
			
											</label>
										
										<?php
										}
									else
										{
										?>
										
									   
										
											<label title="<?php echo $value; ?>" for="fa-<?php echo $value; ?>">
											<input type="radio" class="up_paratheme_input_fields_icon" id="fa-<?php echo $value; ?>" name="up_paratheme_input_fields_icon" value="<?php echo $value; ?>" /><i class="fa fa-<?php echo $value; ?> fa-lg"> </i>
			
											</label>
										
										<?php
										}
										
										
									
									

                                	
									}
									
								?>
                                </div>
                                </td>
                            </tr>

                    </table>
                    
                    
                    </div>
                    
                    <div class="new_user_meta button">Add New Field</div>
                    <div class="up-paratheme-submit-status success"></div>
                </div>
                
                
                
                
                
            </li>
            
            
			<li style="display: none;" class="box2 tab-box active">
				
          		<?php
                $user_id = get_current_user_id();
				$user_info = get_userdata($user_id)
				//var_dump($user_id);
				?>
           
          		
				<div class="option-box">
                    <p class="option-title">Short-code for Author Profile</p>
                    <p class="option-info">This short-code for user profile, you can visit your profile here <a href="<?php echo get_author_posts_url( $user_id); ?>"><?php echo $user_info->user_login; ?></a></p>
                    
                    <strong>Display on author.php</strong><br />
                    <pre>&#60;?php<br /> echo do_shortcode( '&#91;user_profile&#93;' ); <br />?&#62;</pre>
                </div>
           

           
           	</li>
            
			

            
            
        </ul>
    
    
		
    </div>






<!-- 

<p class="submit">
                    <input class="button button-primary" type="submit" name="Submit" value="<?php _e('Save Changes' ) ?>" />
                </p>


-->
		</form>


</div>

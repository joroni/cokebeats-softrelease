<?php

if ( ! defined('ABSPATH')) exit; // if direct access 

?>


<div class="wrap">
	<?php echo "<h2>".__(up_paratheme_plugin_name.' Help')."</h2>";?>
    <br />

	<div class="para-settings">  
        
        
	<h2>Have any issue ?</h2>

	<p>Feel free to Contact with any issue for this plugin, Ask any question via forum <a href="http://paratheme.com/qa/">http://paratheme.com/qa/</a> <strong style="color:#139b50;">(free)</strong>
</p>


	<?php
    
    $up_paratheme_customer_type = get_option('up_paratheme_customer_type');
    $up_paratheme_version = get_option('up_paratheme_version');
    

    if($up_paratheme_customer_type=="free")
        {
    
            echo '<p>You are using <strong> '.$up_paratheme_customer_type.' version  '.$up_paratheme_version.'</strong> of '.up_paratheme_plugin_name.', To get more feature you could try our premium version. ';
            
            echo '<a href="'.up_paratheme_pro_url.'">'.up_paratheme_pro_url.'</a></p>';
            
        }
    elseif($up_paratheme_customer_type=="pro")
        {
    
            echo '<p>Thanks for using <strong> premium version  '.$up_paratheme_version.'</strong> of <strong>'.up_paratheme_plugin_name.'</strong> </p>';	
            
            
        }
    
     ?>


<!--
	<h2>Tutorial</h2>
	<p>Please watch this video tutorial.</p>
    
	<iframe width="640" height="480" src="//www.youtube.com/embed/8OiNCDavSQg?rel=0" frameborder="0" allowfullscreen></iframe>



 -->


<?php
if($up_paratheme_customer_type=="freeq")
	{
?>


        




	<div class="pricing-table">
        <h2>Pricing</h2>
        <p>you could try our premium version for features.</p>
        <div class="column">
            <div class="paln">Free</div>
            <div class="price">$0</div>
            <div class="cell"><span class="green">Life time free update.</span></div> 
            <div class="cell"><span class="red">Life time support via forum.</span></div>
            <div class="cell"><span class="red">Not applicable.</span></div>                         
            <div class="cell"><span class="green">Responsive Design.</span></div>        
            <div class="cell"><span class="red">Themes(Limited).</span></div>        
            <div class="price">$0</div>
        </div>
        
        <div class="column">
            <div class="paln">Premium</div>
			<div class="price"><a target="_blank" class="buy-now" href="<?php echo up_paratheme_pro_url; ?>">$5 Buy Now</a></div>
            <div class="cell"><span class="green">Life time free update.</span></div> 
            <div class="cell"><span class="green">Life time support via forum.</span></div>
            <div class="cell"><span class="green">7 Days refund.</span></div>        
            <div class="cell"><span class="green">Responsive Design.</span></div>        
            <div class="cell"><span class="green">Themes(All).</span></div>        
            <div class="price"><a target="_blank" class="buy-now" href="<?php echo up_paratheme_pro_url; ?>">$5 Buy Now</a></div>
        </div>    
        
    </div>



</div>





 
        
      <?php
      }
	  
	  ?>  
      
<br /> <br /> <br /> 
<h3>Please share this plugin with your friends?</h3>
<table>
<tr>
<td width="100px"> 
<!-- Place this tag in your head or just before your close body tag. -->
<script type="text/javascript" src="https://apis.google.com/js/platform.js"></script>

<!-- Place this tag where you want the +1 button to render. -->
<div class="g-plusone" data-size="medium" data-href="<?php echo up_paratheme_share_url; ?>"></div>

</td>
<td width="100px">
<iframe src="//www.facebook.com/plugins/like.php?href=<?php echo up_paratheme_share_url; ?>&amp;width=100&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21&amp;appId=743541755673761" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>

 </td>
<td width="100px"> 





<a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo up_paratheme_share_url; ?>" data-text="<?php echo up_paratheme_plugin_name; ?>">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
</td>

</tr>

</table>
        













    
         
</div>
<style type="text/css">
.up_paratheme-pro-features{}

.up_paratheme-pro-features li {
  list-style: disc inside none;
}

</style>
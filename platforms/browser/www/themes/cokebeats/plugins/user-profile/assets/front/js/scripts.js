
jQuery(document).ready(function($)
	{





		$(document).on('click', '.user-profile .navs li', function()
			{
				
				//alert("Hello");
				
				
				$(".active").removeClass("active");
				$(this).addClass("active");
				
				var nav = $(this).attr("nav");
				
				$(".user-profile .nav-box .box").css("display","none");
				$(".box-"+nav).css("display","block");
		
			})






	$(document).on('click', '.author-follow', function(event)
		{
			var author_id = $(this).attr('authorid');
			
			$.ajax(
				{
			type: 'POST',
			url:user_profile_ajax.user_profile_ajaxurl,
			data: {"action": "up_paratheme_update_follow", "authorid":author_id },
			success: function(data)
					{	
					
							
						var html = JSON.parse(data)
						
						var login_error = html['login_error'];
						var follow_success = html['follow_success'];						
						var self_follow = html['self_follow'];	
						var unfollow_success = html['unfollow_success'];
						var follow_class = html['follow_class'];
						var follower_html = html['follower_html'];																		
						var follower_id = html['follower_id'];											
						var follower_count_msg = html['follower_count_msg'];											
											
						$('.follower-list').prepend(follower_html);			
									
						
						if(unfollow_success)
							{
								$('.author-follow-count').html(follower_count_msg);								
								$('.follower-mgs').html(unfollow_success).fadeIn();								
								$('.follower-list .follower-'+follower_id).hide();	
							}	
								
						if(self_follow)
							{
								$('.follower-mgs').html(self_follow).fadeIn();								
	
							}
						if(login_error)
							{
								$('.follower-mgs').html(login_error).fadeIn();								
	
							}							
						if(follow_success)
							{
								$('.author-follow-count').html(follower_count_msg);				
								$('.follower-mgs').html(follow_success).fadeIn();								
	
							}	
							
							
																				
						setTimeout(function(){ 
						
						$('.follower-mgs').fadeOut();
						
						
						 }, 3000);				
											
		
						
						if(follow_class == 'follow_yes')
							{
								$('.author-follow').addClass('following');	
								$('.author-follow').html('Following');
							}
						else
							{
								$('.author-follow').removeClass('following');	
								$('.author-follow').html('Follow');
							}
					}
				});	
			
		})


			



		$(document).on('click', '.author-tab-nav li', function()
			{
				
				//alert("Hello");
				
				
				$(".active").removeClass("active");
				$(this).addClass("active");
				
				var nav = $(this).attr("nav");
				
				$(".author-tab-box li.tab-box").css("display","none");
				$(".box"+nav).css("display","block");
		
			})







			

	});	

define(['jquery', 'core/theme-app', 'core/theme-tpl-tags', 'core/modules/storage',  'theme/dist/js/framework7',

        'theme/js/bootstrap.min', 'theme/photoswipe/photoswipe',
        'theme/photoswipe/photoswipe-ui-default', 'theme/photoswipe/photoswipe-support', 'theme/fancy/fancybox/jquery.easing.1.3', 'theme/fancy/fancybox/jquery.fancybox-1.3.4', 'theme/js/transition', 'theme/js/auth/auth-pages', 'theme/js/auth/simple-login',
        //'theme/panzoom//dist/jquery.panzoom', 'theme/panzoom/test/libs/jquery.mousewheel',

        'theme/zoom-master/jquery.zoom',
        'theme/js/auth/premium-posts', 'theme/js/comments', 'js/jquery.smoothState.js', 'theme/js/phonegap-1.2.0',
        'js/main.js', 'theme/js/script', 'theme/js/swiper.min', 'theme/js/lazyload', 'theme/js/actions', 'theme/js/camera',
        'theme/js/moment.min', 'theme/js/velocity.min', 'theme/js/jquery.fitvids'

    ],
    function ( $, App, TemplateTags, Storage, Moment, Velocity, PhotoSwipe, PhotoSwipeUI_Default ) {
        //function ( $, App, TemplateTags, Storage,Velocity,PhotoSwipe,PhotoSwipeUI_Default ) {


       // var photoswipe_element = $('.pswp')[0]; //Memorize PhotoSwipe gallery HTML layout element
        ///var photoswipe_instance = null; //PhotoSwipe JS Object that we will instanciate


        var $refresh_button = $('#refresh-button');

        /**
         * Launch app contents refresh when clicking the refresh button :
         */
        $refresh_button.click(function ( e ) {
            e.preventDefault();
            closeMenu();
            App.refresh();
        });

        /**
         * Animate refresh button when the app starts refreshing
         */
        App.on('refresh:start', function () {
            $refresh_button.addClass('refreshing');
        });


        //  App.addCustomRoute( 'component-latest', 'my-home-template' );

        //App.addCustomRoute( 'component-custom-page', 'my-home-template' );
        // Simple way: use of "default-route" (by default, "launch-route" = "default-route").
// This is if you don't need to differentiate your "launch route" from your "default route"

//Add our home page (will have the #my-home-route fragment and use the "my-home-template" to render):
        /*    App.addCustomRoute( 'all-posts', 'my-home-template' );

         App.filter( 'default-route', function( default_route ) {
         default_route = 'all-posts';
         return default_route ;
         } );
         */

        /**
         * When the app stops refreshing :
         * - scroll to top
         * - stop refresh button animation
         * - display success or error message
         *
         * Callback param : result : object {
	 *		ok: boolean : true if refresh is successful,
	 *		message: string : empty if success, error message if refresh fails,
	 *		data: object : empty if success, error object if refresh fails :
	 *					   use result.data to get more info about the error
	 *					   if needed.
	 * }
         */




        App.on('refresh:end', function ( result ) {
            scrollTop();
            Storage.clear('scroll-pos');
            $refresh_button.removeClass('refreshing');
            if (result.ok) {
                //$( '#feedback' ).removeClass( 'error' ).html( '<i id="feedback" class="fa fa-check-circle" style="color: #00ff00; font-size: 2em; text-shadow: 0 0 1px #888;"></i> ' ).slideDown();
                $('#feedback').removeClass('error').html('<div id="feedback" class="foramoment animated fadeOut" style="background-color: lawngreen !important; color: #000 !important;; font-size: 1em; text-shadow: 0 0 0px #888;">Updates successful</div> ').slideDown();
            } else {
                $('#feedback').addClass('error').html(result.message).slideDown();
            }
        });

        /**
         * When an error occurs, display it in the feedback box
         */
        App.on('error', function ( error ) {
            $('#feedback').addClass('error').html(error.message).slideDown();
        });

        /**
         * Hide the feedback box when clicking anywhere in the body
         */
        $('body').click(function ( e ) {
            $('#feedback').slideUp();
        });


        /*  $('#BtnAll').click(function ( e ) {
         $('#archive').hide();
         $('#archive2').slideUp();
         alert('A2');
         });
         *
         /**
         * Back button
         */
        var $back_button = $('#go-back');

        //Show/Hide back button (in place of refresh button) according to current screen:
        App.on('screen:showed', function () {
            var display = App.getBackButtonDisplay();
            if (display === 'show') {
                $refresh_button.hide();
                $back_button.show();
            } else if (display === 'hide') {
                $back_button.hide();
                $refresh_button.show();
            }
        });

        //Go to previous screen when clicking back button:
        $back_button.click(function ( e ) {
            e.preventDefault();
            App.navigateToPreviousScreen();
        });


        /**
         * Allow to click anywhere on post list <li> to go to post detail :
         */
        $('#container').on('click', 'li.media', function ( e ) {
            e.preventDefault();
            var navigate_to = $('a', this).attr('href');
            App.navigate(navigate_to);
        });

        /*     $('#BtnLatest').on('click', function() {
         $('#component-latest').show();
         $('#component-custom-page').hide();
         alert('Latest Show');
         });

         $('#BtnAll').on('click', function() {
         $('#component-latest').hide();
         $('#component-custom-page').show();
         alert('All Show');
         });
         */
        /**
         * Close menu when we click a link inside it.
         * The menu can be dynamically refreshed, so we use "on" on parent div (which is always here):
         */
        $('#navbar-collapse').on('click', 'a', function ( e ) {
            closeMenu();
        });


        /**
         * Open all links inside single content with the inAppBrowser
         */
        $('#container').on("click", ".single-content a, .page-content a", function ( e ) {
            e.preventDefault();
            openWithInAppBrowser(e.target.href);
        });

        $('#container').on('click', '.comments', function ( e ) {
            e.preventDefault();

            $('#waiting').show();

            App.displayPostComments(
                $(this).attr('data-post-id'),
                function ( comments, post, item_global ) {
                    //Do something when comments display is ok
                    //We hide the waiting panel in 'screen:showed'
                },
                function ( error ) {
                    //Do something when comments display fail (note that an app error is triggered automatically)
                    $('#waiting').hide();
                }
            );
        });

        /**
         * "Get more" button in post lists
         */
        $('#container').on('click', '.get-more', function ( e ) {
            e.preventDefault();

            var $this = $(this);

            var text_memory = $this.text();
            $this.attr('disabled', 'disabled').text('Loading...');

            App.getMoreComponentItems(
                function () {
                    //If something is needed once items are retrieved, do it here.
                    //Note : if the "get more" link is included in the archive.html template (which is recommended),
                    //it will be automatically refreshed.
                    $this.removeAttr('disabled');
                },
                function ( error, get_more_link_data ) {
                    $this.removeAttr('disabled').text(text_memory);
                }
            );
        });


        /**
         * Do something before leaving a screen.
         * Here, if we're leaving a post list, we memorize the current scroll position, to
         * get back to it when coming back to this list.
         */
        App.on('screen:leave', function ( current_screen, queried_screen, view ) {
            //current_screen.screen_type can be 'list','single','page','comments'
            if (current_screen.screen_type == 'list') {
                Storage.set('scroll-pos', current_screen.fragment, $('body').scrollTop());
            }
        });

        /**
         * Do something when a new screen is showed.
         * Here, if we arrive on a post list, we resore the scroll position
         */
        App.on('screen:showed', function ( current_screen, view ) {
            //current_screen.screen_type can be 'list','single','page','comments'
            if (current_screen.screen_type == 'list') {
                var pos = Storage.get('scroll-pos', current_screen.fragment);
                if (pos !== null) {
                    $('body').scrollTop(pos);
                } else {
                    scrollTop();
                }
            } else {
                scrollTop();
            }

            if (current_screen.screen_type == 'comments') {
                $('#waiting').hide();
            }

        });

        /**
         * Example of how to react to network state changes :
         */

        App.on('network:online', function ( event ) {
            $('#feedback').removeClass('error').html("Online :)").slideDown();
        });

        App.on('network:offline', function ( event ) {
            $('#feedback').addClass('error').html("Disconnected :(").slideDown();
        });


        /**
         * Manually close the bootstrap navbar
         */
        function closeMenu() {
            var navbar_toggle_button = $(".navbar-toggle").eq(0);
            if (!navbar_toggle_button.hasClass('collapsed')) {
                navbar_toggle_button.click();
            }
        }

        /**
         * Get back to the top of the screen
         */
        function scrollTop() {
            window.scrollTo(0, 0);
        }

        /**
         * Opens the given url using the inAppBrowser
         */
        /* function openWithInAppBrowser( url ) {
         window.open( url, "_blank", "location=no" );
         }
         */


    });


$(document).on('click', 'a', function ( e ) {
    if ($(this).attr('target') === '_blank') {
        window.open($(this).attr('href'), '_system', 'location=no');
        e.preventDefault();
    }

});


/*
 $('.zoomer').on('click', 'a', function ( e ) {
 //if ($(this).attr('target') === '_blank') {
 // window.open($(this).attr('href'), '_system', 'location=yes');*/
//  var ref = window.open ('http://104.238.96.209/~project/newsletter/popup.html', '_blank', 'location=yes');
//      e.preventDefault();
// }
/*setTimeout(function() {
 ref.close();
 }, 5000);
 });*/
/*
 $('.zoomer').on('click', 'a', function ( e ) {
 //var ref = window.open($(this).attr('href'), '_blank', 'location=yes');
 var ref = window.open('http://104.238.96.209/~project/newsletter/popup.html', '_blank', 'location=yes');
 });
 //App.addCustomRoute( 'my-page-route', 'my-page-template', { title : 'for the template' } );

 /**
 And if you want to pass dynamic data to the template, you can use the
 'template_args' filter :
 */
/*App.filter( 'template-args', function( template_args, view_type, view_template ) {
 if( view_template == 'my-page-template' ) {
 template_args.my_custom_arg = { my: custom_dynamic_value };
 }
 return template_args;
 } );*/

//In app's theme (functions.js)

/**
 The following allows to create a custom screen on app side only
 (meaning it does not correspond to an existing WordPress page or post).
 In this example, the page is accessed at the "url" #my-page-route and
 uses the template 'my-page-template' to render. Last arguments allows to pass
 custom data to the template.
 */
//App.addCustomRoute( 'my-page-route', 'my-page-template', { title : 'for the template' } );

/**
 And if you want to pass dynamic data to the template, you can use the
 'template_args' filter :
 */
/*App.filter( 'template-args', function( template_args, view_type, view_template ) {
 if( view_template == 'my-page-template' ) {
 template_args.my_custom_arg = { my: custom_dynamic_value };
 }
 return template_args;
 } );*/


var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for PhoneGap to connect with the device
//
//document.addEventListener("deviceready",onDeviceReady,false);

// PhoneGap is ready to be used!
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess( imageData ) {
    // Uncomment to view the base64 encoded image data
    console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess( imageURI ) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50});
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 20, allowEdit: true});
}

// A button will call this function
//
function getPhoto( source ) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if something bad happens.
//
function onFail( message ) {
    alert('Failed because: ' + message);
}


/************ UPLOAD PHOTO *************/

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    // Do cool things here...
}

function getImage() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function ( message ) {
            alert('get picture failed');
        }, {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
    );

}

function uploadPhoto( imageURI ) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://104.238.96.209/~project/newsletter/upload.php", win, fail, options);
}

function win( r ) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
}

function fail( error ) {
    alert(error.code);
}


$('#my-custom-page').click(function ( e ) {
    e.preventDefault();
    App.showCustomPage('my-custom-page-template', {
        my_title: 'The custom page title',
        my_content: 'My page content'
    });
});


$("#pop").on("click", function ( e ) {
    e.preventDefault();
    $('#the-modal').modal('toggle');
});


/**
 * Opens the given image (or list of images) with PhotoSwipe
 */
function open_with_photoswipe( $images ) {

    var photoswipe_items = [];

    //For each image, create the corresponding PhotoSwipe item by retrieving
    //the full size information in data attributes set on server side:
    $images.each(function () {
        var $image = $(this);

        //Retrieve image caption if any:
        var $caption = $(this).closest('figure,div.wp-caption').find('.wp-caption-text');

        //Add PhotoSwipe item corresponding to
        photoswipe_items.push({
            src: $image.data('full-img'), //Data attribute that was added by modifying the webservice earlier
            w: $image.data('width'),
            h: $image.data('height'),
            title: $caption.length ? $caption.text() : ''
        });
    });

    //Lots of PhotoSwipe options can be found here for customization:
    //http://photoswipe.com/documentation/options.html
    var photoswipe_options = {
        index: 0, // start at first slide
        shareEl: false //don't display Share element
    };

    //Open the given images with PhotoSwipe:
    photoswipe_instance = new PhotoSwipe(photoswipe_element, PhotoSwipeUI_Default, photoswipe_items, photoswipe_options);
    photoswipe_instance.init();
}


var photoswipe_element = $('.pswp')[0];
var photoswipe_instance = null;
var img_dragging = false;

$("#container").on("touchstart", ".single-content img", function () {
    img_dragging = false; //Reinit image dragging when starting to touch an image
});

$("#container").on("touchmove", ".single-content img", function () {
    img_dragging = true; //Activate image dragging when starting to swipe on the image to make post content scroll
});

/**
 * Opens the given image (or list of images) with PhotoSwipe
 */
function open_with_photoswipe( $images ) {
    $("#container").on("touchend", ".single-content img", function () {

        //Don't open image if currently dragging it:
        if (img_dragging) {
            return;
        }

        //Open PhotoSwipe for the image we just touched:
        open_with_photoswipe($(this));
    });
}


/**********************/
/*function checkUserDetails() {

    $(document).ready(function () {


        jQuery(document).ready(function ( $ ) {

            var root_url = "http://104.238.96.209/~project/newsletter/wp-json/wp/v2/";
            var users_display = document.getElementById('users');
            var post_display = document.getElementById('users-posts');
           // var Uuseruid =  localStorage.setItem("useruid", user.id);

         //   var user_id = localStorage.getItem("useruid");

            $.ajax({
                "url": root_url + 'users' + '/',
                "method": "GET"
            }).success(function ( users ) {
                if ('object' == typeof users) {
                    var markup;
                    $.each(users, function ( i, user ) {
                        $(users_display).append(markup);
                        //   markup = '<div class="user" id="user-' + user.id + '"><img src="' + user.avatar_urls[96] + '" /><a href="#" class="user-link" data-user-id="' + user.id + '">' + user.name + '</a></div>';
                        markup = '<div class="user" id="user-' + user.id + '"><img src="' + user.avatar_urls + '" /><a href="#" class="user-link" data-user-id="' + user.id + '">' + user.name + '</a></div>';
                        var useruid = localStorage.setItem("useruid", user.id);

                        console.log('markup', markup);
                        console.log('useruid', useruid);

                    });
                }
                $('.user-link').on('click', function ( e ) {
                    e.preventDefault();
                    id = $(this).attr('data-user-id');
                    $.ajax({
                        "url": root_url + 'posts?author=' + id,
                        "method": "GET"
                    }).success(function ( posts ) {
                        $(users_display).hide();
                        $.each(posts, function ( i, post ) {
                            markup = '<div class="post" id="post-' + post.id + '"><a href="' + post.link + '" class="post-link" data-post-id="' + post.id + '">' + post.title.rendered + '</a></div>';
                            $(post_display).append(markup);
                        });
                        $(post_display).append('<a href="#" id="close-posts">Close</a>');
                        $('#close-posts').on('click', function ( e ) {
                            e.preventDefault();
                            $(post_display).empty();
                            $(users_display).show();


                        });
                    })

                });
            });
        });
    });*/


    /*  ​var test = { test: "thing", test2: "thing2", test3: [0, 2, 44] }​​​​​​​;
     localStorage.setItem("test", JSON.stringify(test));
     var test2 = localStorage.getItem("test");
     test = JSON.parse(test2); //var test is now re-loaded!
     */


    /*  localStorage.set('myKey',{a:[1,2,5], b: 'ok'});
     localStorage.has('myKey');   // --> true
     localStorage.get('myKey');   // --> {a:[1,2,5], b: 'ok'}
     localStorage.keys();         // --> ['myKey']
     localStorage.remove('myKey');
     */






    // var MyID = localStorage.getItem("useruid");
    //alert(MyID);
   // console.log(MyID);
/*}


checkUserDetails();*/
//console.log(MyID);





/************************ Profile ********************/
/*function getUserProfile() {

    $(document).ready(function () {


        jQuery(document).ready(function ( $ ) {

            var root_url = "http://104.238.96.209/~project/newsletter/wp-json/wp/v2/";
            var users_display = document.getElementById('users');
            var post_display = document.getElementById('users-posts');
            var useruid = localStorage.setItem("useruid", user.id);
            console.log('USER ID', useruid);

            $.ajax({
                "url": root_url + 'users' + '/' + useruid,
                "method": "GET"
            }).success(function ( users ) {
                if ('object' == typeof users) {
                    var markup;
                    $.each(users, function ( i, user ) {
                        markup = '<div class="user" id="user-' + user.id + '"><img src="' + user.avatar_urls[96] + '" /><a href="#" class="user-link" data-user-id="' + user.id + '">' + user.name + '</a></div>';
                        $(users_display).append(markup);
                        var useruid = localStorage.setItem("useruid", user.id);

                        console.log('markup', markup);
                        console.log('useruid', useruid);
                        $('userinfo').html(markup);

                    });
                }
                $('.user-link').on('click', function ( e ) {
                    e.preventDefault();
                    id = $(this).attr('data-user-id');
                    $.ajax({
                        "url": root_url + 'posts?author=' + id,
                        "method": "GET"
                    }).success(function ( posts ) {
                        $(users_display).hide();
                        $.each(posts, function ( i, post ) {
                            markup = '<div class="post" id="post-' + post.id + '"><a href="' + post.link + '" class="post-link" data-post-id="' + post.id + '">' + post.title.rendered + '</a></div>';
                            $(post_display).append(markup);
                        });
                        $(post_display).append('<a href="#" id="close-posts">Close</a>');
                        $('#close-posts').on('click', function ( e ) {
                            e.preventDefault();
                            $(post_display).empty();
                            $(users_display).show();


                        });
                    })

                });
            });
        });
    });



}
*/
/************************ Profile ********************/



/*
function check_storage(){

    if (localStorage['useruid']) {
       // window.location.replace("main.html");
       // console.log('Welcome:', useruid);
    }else{
        console.log('err');
        localStorage.remove('useruid');
        $('#app-screen').replace("#login-page");
       // window.location.replace("#login-page");

    }

}
check_storage();*/

/*var current_user_id = (localStorage.getItem('useruid'));
console.log ('current_user_id', current_user_id);
$.get("http://104.238.96.209/~project/newsletter/wp-content/plugins/bodukplugin/get_name.php?name="+localStorage.getItem('useruid'), function(data){
    localStorage.setItem('user_display_name',data);
    localStorage.getItem('user_display_name');
    console.log(localStorage.getItem('user_display_name'));
    $('.userholder').html(localStorage.getItem('user_display_name'));
    $('#userinfo').html(localStorage.getItem('user_display_name'));
});

$('#logout').on('click', function ( ) {
   localStorage.removeItem('user_display_name',data);
});
    */
function showLogout() {
    $('#homeBtn').on('click', function () {
        $('#user-info').show();
    });
}




$('#logoutBtn').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('Authentication-coke-beats-Authentication-coke-beats');
    window.location.replace('index.html');
   //localStorage.removeItem('user_login');
    // localStorage.removeItem('user_display_name',data);

    //e.preventDefault();
    //Auth.logUserOut();
});




$('#popovertrigger').on('click', function ( ) {
    $('#popoverpop').toggle();
});


$('#homeBtn').on('click', function ( ) {
    $('#logoutBtn').show();
    window.location.replace('index.html');
});

function check_storage(){

    if (localStorage['Authentication-coke-beats-Authentication-coke-beats']) {
        //window.location.replace("main.html");
        console.log('OK');
        $('#logoutBtn').show();
    }else{
        console.log('err');
       $('#logoutBtn').hide();
    }

}
check_storage();



add_filter('get_comment_author', 'my_comment_author', 10, 1);

function my_comment_author( $author = '' ) {
    // Get the comment ID from WP_Query

    $comment = get_comment( $comment_ID );

    if ( empty($comment->comment_author) ) {
        if (!empty($comment->user_id)){
            $user=get_userdata($comment->user_id);
            $author=$user->first_name.' '.substr($user->last_name,0,1).'.'; // this is the actual line you want to change
        } else {
            $author = __('Anonymous');
        }
    } else {
        $author = $comment->comment_author;
    }

    return $author;
}
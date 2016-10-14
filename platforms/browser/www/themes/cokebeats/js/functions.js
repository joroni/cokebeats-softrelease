define([
    'jquery',
    'core/theme-app',
    'core/modules/storage',
    'core/theme-tpl-tags',
    'root/config',
    'theme/js/moment.min',
    'theme/js/velocity.min',
    'theme/js/auth/auth-pages', 'theme/js/auth/simple-login',
    'theme/js/auth/premium-posts', 'theme/js/comments',
    'theme/dist/js/framework7',
    'theme/photoswipe/photoswipe.min',
    'theme/photoswipe/photoswipe-ui-default.min',
    'js/swiper.min',
    'theme/js/jquery.fitvids'
], function($,App,Storage,TemplateTags,Config,Moment,Velocity,PhotoSwipe,PhotoSwipeUI_Default) {

    /***********************************
     * START PHOTOSWIPE
     */

    var photoswipe_element = $( '.pswp' )[0];
    var photoswipe_instance = null;
    var img_dragging = false;

    $( "#app-layout" ).on( "touchstart", ".single-content img", function() {
        img_dragging = false;
    } );

    $( "#app-layout" ).on( "touchmove", ".single-content img", function() {
        img_dragging = true;
    });

    /**
     * Opens the given image (or list of images) with PhotoSwipe
     */
    function open_with_photoswipe( $images, index ) {

        index = index || 0;

        var photoswipe_items = [];

        //For each image, create the corresponding PhotoSwipe item by retrieving
        //the full size information in data attributes set on server side:
        $images.each( function() {
            var $image = $( this );

            //Retrieve image caption if any:
            var $caption = $( this ).closest('.gallery-item,.wp-caption').find( '.wp-caption-text' );

            //Add PhotoSwipe item corresponding to
            photoswipe_items.push({
                src: $image.data( 'full-img' ),
                w: $image.data( 'width' ),
                h: $image.data( 'height' ),
                title: $caption.length ? $caption.text() : ''
            });
        } );

        //Lots of PhotoSwipe options can be found here for customization:
        //http://photoswipe.com/documentation/options.html
        var photoswipe_options = {
            index: index, // start at first slide
            shareEl: false //don't display Share element
        };

        //Open the given images with PhotoSwipe:
        photoswipe_instance = new PhotoSwipe( photoswipe_element, PhotoSwipeUI_Default, photoswipe_items, photoswipe_options);
        photoswipe_instance.init();
    }

    $( "#app-layout" ).on( "touchend", ".single-content img", function() {

        //Don't open image if currently dragging it:
        if ( img_dragging ) {
            return;
        }

        //Detect if the image belongs to a gallery
        var is_gallery = $( this ).closest( '.gallery' ).length !== 0;

        if ( is_gallery ) {
            //Open PhotoSwipe for all images of the gallery:
            open_with_photoswipe( $( this ).closest( '.gallery-item' ).siblings().andSelf().find( 'img' ), $( this ).closest( '.gallery-item' ).index() );
        } else {
            //Open PhotoSwipe for the image we just touched:
            open_with_photoswipe( $( this ) );
        }

    });

    /**
     * Prepare gallery images when a post or a page is displayed in the app:
     * only show first gallery image thumbnail in post content by default.
     *
     * If you want to display all gallery images thumbnails, just comment this 'screen:showed' block.
     */
    App.on( 'screen:showed', function( current_screen, view ) {
        if ( current_screen.screen_type === "single" || current_screen.screen_type === "page" ) {

            //First hide all gallery images
            $( '.gallery .gallery-item' ).hide();

            //Then display only the first image of each gallery:
            $( '.gallery .gallery-item:first-child' ).show();

        }
    } );

    /**
     * END PHOTOSWIPE
     ***********************************/




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




// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    // Do cool things here...
}

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


/*
 * 6. Content
 */

// @desc Prepare content for proper display / Part of the work is done in /php/prepare-content.php
function prepareContent() {

    // Modify embedded tweets code for proper display
    // Note: it is not possible to style embedded tweet in apps as Twitter doesn't identify the referer
    $(".single-template blockquote.twitter-tweet p").css( "display", "inline-block" );

    // Set content for unavailable content notification
    // Note: unavaible content is notified with [hide_from_apps notify="yes"] shortcode
    $(".wpak-content-not-available").html('Content unavailable');
}

// @desc Hyperlinks click handler
// Relies on the InAppBrowser Cordova Core Plugin / https://build.phonegap.com/plugins/233
// Target _blank calls an in app browser (iOS behavior)
// Target _system calls the default browser (Android behavior)
// @param {object} e
function openInBrowser(e) {

    try {
        cordova.InAppBrowser.open(e.target.href, '_blank', 'location=yes');
    } catch(e) {
        window.open(e.target.href, '_blank', 'location=yes');
    }

    e.preventDefault();
}

// @desc Load videos / launched after transitions to keep them smooth
// data-src are filled and src emptied in /php/prepare-content.php
// We use the fitVids library to make videos responsive (https://github.com/davatron5000/FitVids.js)
function loadAndFormatVideos() {

    $("iframe").each(function(index) {
        if ($(this).attr('data-src')) {
            $(this).attr('src', $(this).attr('data-src'));
        }
    });

    $('#single-content').fitVids();

}

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Page Components
Vue.component('page-about', {
  template: '#page-about'
})
Vue.component('page-form', {
  template: '#page-form'
})
Vue.component('page-posts', {
  template: '#page-posts'
})
Vue.component('page-dynamic-routing', {
  template: '#page-dynamic-routing'
})


// Init App
new Vue({
  el: '#app',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: [
      {
        path: '/about/',
        component: 'page-about'
      },
      {
        path: '/form/',
        component: 'page-form'
      },
      /*{
        path: '/posts/',
        component: 'page-posts',

      },*/
      {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: 'page-dynamic-routing'
      }

    ],
  }
});


function getPosts(){
 var endpoint = "http://ec2-54-214-99-121.us-west-2.compute.amazonaws.com/cokebeats/wp-json/wp/v2",
      itemsPerPage = 3,
      vm;


  Vue.directive('thumb', function (val) {

    if(!val) return;
    var el = this.el;

    Vue.http.jsonp(endpoint+"/media", {include:val},{jsonp: "_jsonp"}).then(function (response) {
      if(!response.data[0]) return;
      el.style.backgroundImage = "url("+response.data[0].media_details.sizes.thumbnail.source_url+")";
    });

  });
  Vue.filter('removeMoreLink', function (value) {
    return value.replace(/<span class="more">.+?<\/span>/, '');
  });

  Vue.filter('formatDate', function (date_str) {
var year = date_str.substr(0,4),
month = parseInt(date_str.substr(5,2)),
day = date_str.substr(8,2),
months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
return months[month] + " " + day + ", "+year;
});

  Vue.filter('more', function (value, param) {
    return value.slice(0, param);
  });


   vm = new Vue({
    el: '#post_feed',
    data: {
      items: [],
      loading: true,
      showed: itemsPerPage
    },
    methods:{
      showMore:function(){
        this.showed+=itemsPerPage;
      }
    },
    ready:function(){
      this.$http.jsonp(endpoint+"/posts", {per_page:100},{jsonp: "_jsonp"}).then(function (response) {
          vm.items = response.data;
          vm.loading = false;
      });
    }
  }
)
}
;

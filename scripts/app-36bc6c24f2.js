/**
 * Created by Administrator on 2017/11/22.
 */
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
var today = {
    /* 接受父组件值参数的设置
     * 子组件从父组件取值，使用props
     * */
    props: ['loaded','date','message'],
    template: '#today',
    data:function() {
        return {
            posts: []
        }
    },
    created:function(){
        /* var url="api/today.php";
         this.$http.get(url).then(function(posts){
         var json=posts.body;
         this.posts=eval("(" + json +")");
         },function(response){
         console.info(response);
         })*/

        /*this.$http({
         url:"api/today.php",
         method:"get"
         }).then(function (posts) {  //正确请求成功时处理
         this.posts=posts.data.posts;
         this.date=posts.data.date;
         });*/
        var self = this;

        this.$emit('my',{
            loaded:false,
            title:'今日一刻',
            index:0
        });
        $.ajax({
            type: 'GET',
            url: 'api/today.php',
            success:function(data) {
                var json=JSON.parse(data);
                self.posts = json.posts;
                console.log(self.posts);
                self.$emit('my',{
                    loaded:true,
                    title:'今日一刻',
                    index:0
                });
            }
        });

    }
}
var older = {
    props: ['loaded','date'],
    template: '#older',
    data:function() {
        return {
            posts: []
        }
    },
    created:function(){
        var self = this;
        this.$emit('my',{
            loaded:false,
            title:'往期内容',
            index:1
        });
        $.ajax({
            type: 'GET',
            url: 'api/older.php',
            data:{ day:-32 },
            success:function(data) {
                var json=JSON.parse(data);
                self.posts = json.posts;
                self.$emit('my',{
                    loaded:true,
                    title:'往期内容',
                    index:1
                });
            }
        });

    }
}
var author = {
    props: ['loaded'],
    template: '#author',
    data:function() {
        return {
            authors_hot: [],
            authors_rec: []
        }
    },
    created:function(){
        var self = this;
        this.$emit('my',{
            loaded:false,
            title:'热门作者',
            index:2
        });
        $.ajax({
            type: 'GET',
            url: 'api/author_hot.php',
            success:function(data) {
                var json=JSON.parse(data);
                console.log(json)
                self.authors_hot = json.authors;
                self.$emit('my',{
                    loaded:true,
                    title:'热门作者',
                    index:2
                });
            }
        });
        $.ajax({
            type: 'GET',
            url: 'api/author_rec.php',
            success:function(data) {
                var json=JSON.parse(data);
                console.log(json)
                self.authors_rec = json.authors;
                self.$emit('my',{
                    loaded:true,
                    title:'热门作者',
                    index:2
                });
            }
        });

    }
}
var category = {
    props: ['loaded'],
    template: '#category',
    data:function() {
        return {
            columns: []
        }
    },
    created:function(){
        var self = this;
        this.$emit('my',{
            loaded:false,
            title:'栏目浏览',
            index:3
        });
        $.ajax({
            type: 'GET',
            url: 'api/category.php',
            success:function(data) {
                var json=JSON.parse(data);
                self.columns = json.columns;
                console.log(self.columns)
                self.$emit('my',{
                    loaded:true,
                    title:'栏目浏览',
                    index:3
                });
            }
        });

    }
}
var favourite = {
    props: ['loaded'],
    template: '#favourite',
    created:function(){
        this.$emit('my',{
            loaded:true,
            title:'我的喜欢',
            index:4
        });
    }
}
var settings = {
    props: ['loaded'],
    template: '#settings',
    created:function(){
        this.$emit('my',{
            loaded:true,
            title:'设置',
            index:5
        });
    }
}
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    { path: '/today', component: today },
    { path: '/older', component: older },
    { path: '/author', component: author },
    { path: '/category', component: category },
    { path: '/favourite', component: favourite },
    { path: '/settings', component: settings },
    { path: '/', redirect: '/today' }

]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
/*
new Vue({
    routes: routes,
    el:'#Yike'
})*/

var date=new Date().toLocaleDateString();

//var Yike = angular.module('Yike', ['myself']);
Vue.component('todo-item', {
    props: ['todo'],
    template:"<router-link :to='todo.link' :class='todo.icon'><span>{{todo.text}}</span></router-link>"
})

var Yike = new Vue({
    //渲染内容的目的地
    el: '#Yike',
    router: router,
    /*components:{
        'today':today,
        'older':older
    },*/
    data:{ /*函数对象类型*/
        message:'Hello Vue.js!',
        isviewport: true,
        //collapsed:true,
        navs : [{
            text: '今日一刻',
            link: '/today',
            icon: 'icon-home'
        }, {
            text: '往期内容',
            link: '/older',
            icon: 'icon-file-empty'
        }, {
            text: '热门作者',
            link: '/author',
            icon: 'icon-pencil'
        }, {
            text: '栏目浏览',
            link: '/category',
            icon: 'icon-menu'
        }, {
            text: '我的喜欢',
            link: '/favourite',
            icon: 'icon-heart'
        }, {
            text: '设置',
            link: '/settings',
            icon: 'icon-cog'
        }],

        index:0,
        collapsed : false,
        loaded : false,
        date:date,
        title : '今日一刻'
        },
    /*申明函数*/
        methods:{
            /*对象类型：
            包含多个函数名叫key，函数体做value*/
            /*在script中能使用的对象，基本template中也能使用，但是
            * 在script中加this，template中不需要this*/
            toggle : function() {
                this.collapsed = !this.collapsed;
                var navs = document.querySelectorAll('.navs dd');

                if (this.collapsed) {
                    for (var i = 0; i < navs.length; i++) {
                        navs[i].style.transform = 'translate(0)';
                        navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
                        navs[i].style.transitionDelay = '0.2s';
                    }
                } else {
                    for (var i = navs.length - 1; i >= 0; i--) {
                        navs[i].style.transform = 'translate(-100%)';
                        navs[i].style.transitionDuration = (navs.length - i) * 0.15 + 's';
                        navs[i].style.transitionDelay = '';
                    }
                }
            },
            update:function(par){
                this.title=par.title;
                this.index=par.index;
                this.loaded=par.loaded;
            }
    }
})
/*var today = {
 /!*接受父组件值参数的设置
 * 子组件从父组件取值，使用props
 * *!/
 props: ['loaded','date','message'],
 template: '#today',
 data:function() {
 return {
 posts: []
 }
 },
 created:function(){
 /!* var url="api/today.php";
 this.$http.get(url).then(function(posts){
 var json=posts.body;
 this.posts=eval("(" + json +")");
 },function(response){
 console.info(response);
 })*!/

 /!*this.$http({
 url:"api/today.php",
 method:"get"
 }).then(function (posts) {  //正确请求成功时处理
 this.posts=posts.data.posts;
 this.date=posts.data.date;
 });*!/
 var self = this;

 this.$emit('my',{
 loaded:false,
 title:'今日一刻',
 index:0
 });
 $.ajax({
 type: 'GET',
 url: 'api/today.php',

 success:function(data) {
 var json=JSON.parse(data);
 self.posts = json.posts;
 console.log(self.posts);
 self.$emit('my',{
 loaded:true,
 title:'今日一刻',
 index:0
 });
 }
 });

 }
 }
 var older = {
 props: ['loaded','date'],
 template: '#older',
 data:function() {
 return {
 posts: []
 }
 },
 created:function(){
 var self = this;
 this.$emit('my',{
 loaded:false,
 title:'往期内容',
 index:1
 });
 $.ajax({
 type: 'GET',
 url: 'api/older.php',
 data:{ day:-32 },
 success:function(data) {
 var json=JSON.parse(data);
 self.posts = json.posts;
 self.$emit('my',{
 loaded:true,
 title:'往期内容',
 index:1
 });
 }
 });

 }
 }

 var author = {
 props: ['loaded'],
 template: '#author',
 data:function() {
 return {
 authors_hot: [],
 authors_rec: []
 }
 },
 created:function(){
 var self = this;
 this.$emit('my',{
 loaded:false,
 title:'热门作者',
 index:2
 });
 $.ajax({
 type: 'GET',
 url: 'api/author_hot.php',
 success:function(data) {
 var json=JSON.parse(data);
 console.log(json)
 self.authors_hot = json.authors;
 self.$emit('my',{
 loaded:true,
 title:'热门作者',
 index:2
 });
 }
 });
 $.ajax({
 type: 'GET',
 url: 'api/author_rec.php',
 success:function(data) {
 var json=JSON.parse(data);
 console.log(json)
 self.authors_rec = json.authors;
 self.$emit('my',{
 loaded:true,
 title:'热门作者',
 index:2
 });
 }
 });

 }
 }

 var category = {
 props: ['loaded'],
 template: '#category',
 data:function() {
 return {
 columns: []
 }
 },
 created:function(){
 var self = this;
 this.$emit('my',{
 loaded:false,
 title:'栏目浏览',
 index:3
 });
 $.ajax({
 type: 'GET',
 url: 'api/category.php',
 success:function(data) {
 var json=JSON.parse(data);
 self.columns = json.columns;
 console.log(self.columns)
 self.$emit('my',{
 loaded:true,
 title:'栏目浏览',
 index:3
 });
 }
 });

 }
 }
 var favourite = {
 props: ['loaded'],
 template: '#favourite',
 created:function(){
 this.$emit('my',{
 loaded:true,
 title:'我的喜欢',
 index:4
 });
 }
 }
 var settings = {
 props: ['loaded'],
 template: '#settings',
 created:function(){
 this.$emit('my',{
 loaded:true,
 title:'设置',
 index:5
 });
 }
 }

 var routes = [
 { path: '/today', component: today },
 { path: '/older', component: older },
 { path: '/author', component: author },
 { path: '/category', component: category },
 { path: '/favourite', component: favourite },
 { path: '/settings', component: settings },
 { path: '/', redirect: '/today' }

 ]

 var router = new VueRouter({
 routes: routes
 })*/
<template>
    <div>
        <div v-bind:class="logins['bg']"><i></i></div>
        <div v-bind:class="logins['box']">
            <head-top v-bind:right="true" title="登录"></head-top>
            <div v-bind:class="logins['login-box']">
                <div :class="logins['items']">
                    <img src="../../image/icon/login_zhanghao.png" alt="">
                    <input v-model="data.userName" type="text" placeholder="请输入用户名称"><i></i>
                </div>
                <div :class="logins['items']" style="margin-bottom: .02rem;"><img src="../../image/icon/login_mima.png" alt="">
                    <input v-model="data.password" type="password" placeholder="用户密码"></div>
                <div :class="logins['more']"><span @click="goRegister()">注册用户</span></div>
                <div :class="logins['login-btn']"><span  @click="login()" :style="{color:isLogin?'#fff':'rgba(100,100,100,.6)'}">登录</span></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Md5} from '../../lib/utils/appUtil'
    import {login} from '../../lib/utils/index'
    import headTop from '../unit/header.vue'
    import toast from '../units/toast'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                logins: require('../../style/scss/login.scss'),
                data:{
                    userName:'',
                    password:'',
                },
                isLogin:false
            }
        },
        computed: {},
        watch: {
            'data':{
            handler(news,old){
                if(news.userName.length>0 && news.password.length>5){
                    this.isLogin = true
                }else {
                    this.isLogin = false
                }
            }, deep:true
        }},
        methods: {
            goRegister(){
                this.$router.push({name:'register'})
            },
            login(){
                if(!this.isLogin) return
                login('api/login',Object.assign({},this.data,{password:Md5(this.data.password)}),(data)=>{
                    var toastd = toast({message:'登录成功!'})
                    setTimeout(function () {
                        toastd.close()
                        history.back()
                    },1500)
                },(err)=>{
                    console.log(err)
                    toast({message:err})
                })
            }
        },
        created(){

        },
        components: {
            headTop
        }
    }
</script>

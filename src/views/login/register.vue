<template>
    <div>
        <div v-bind:class="logins['bg']"><i></i></div>
        <div v-bind:class="logins['box']">
            <head-top v-bind:right="true" title="注册用户"></head-top>
            <div v-bind:class="logins['login-box']" style="margin-top: 2rem">
                <div :class="logins['items']"><img src="../../image/icon/login_zhanghao.png" alt="">
                    <input v-model="data.userName" type="text" placeholder="用户名称"><i></i></div>
                <div :class="logins['items']"><img src="../../image/icon/login_mima.png" alt="">
                    <input v-model="data.password" type="password" placeholder="用户密码"></div>
                <div :class="logins['items']"><img src="../../image/icon/login-ip.png" alt="">
                    <input v-model="data.phoneNum" type="password" placeholder="手机号码"></div>
                <div :class="logins['login-btn']"><span @click="register()"
                    :style="{color:isLogin?'#fff':'rgba(100,100,100,.6)'}">注册用户</span></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Md5} from '../../lib/utils/appUtil'
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
                    phoneNum:'',
                },
                isLogin:false
            }
        },
        computed: {},
        watch: {
            'data':{
                handler(news,old){
                    if(news.userName.length>0 && news.password.length>5 && news.phoneNum.length==11){
                        this.isLogin = true
                    }else {
                        this.isLogin = false
                    }
                }, deep:true
            }
        },
        methods: {
            register(){
                if(!this.isLogin) return
                this.post('api/user/add',Object.assign(this.data,{password:Md5(this.data.password)}),(rst)=>{
                    var toastd = toast({message:'注册成功!'})
                    setTimeout(function () {
                        toastd.close()
                        history.back()
                    },1500)
                },(msg)=>{
                    toast({message:msg})
                })
            }
        },
        created(){},
        components: {
            headTop
        }
    }
</script>

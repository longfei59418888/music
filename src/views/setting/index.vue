<template>
    <div style="background-color: #EDEEEF">
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div   v-bind:class="styles['h-scan']">
            </div>
            <div v-bind:class="styles['title']">账号</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"><i></i></div>
        </div>
        <div style="height: 1.65rem;overflow: hidden;padding: 0 .25rem;background-color: #fff;">
            <router-link :to="{name:'_setting_set_info'}">
                <div style="display: flex;display: -webkit-flex;">
                    <div style="width: 1.05rem;">
                        <div style="height: 1.05rem;border-radius: 100%;overflow: hidden;margin-top: .3rem;">
                            <img style="width: 100%;" v-if="userInfo.logo" :src="userInfo.logo" alt="">
                            <img style="width: 100%;" v-if="!userInfo.logo" src="../../image/icon/df-u-img.png" alt="">
                        </div>
                    </div>
                    <div style="flex: 1;-webkit-flex: 1;padding: .25rem;">
                        <p style="margin-top: .15rem;font-size: .32rem;" v-if="userInfo.name">{{userInfo.name}}</p>
                        <p v-if="!userInfo.name" style="margin-top: .15rem;font-size: .32rem;color: #aaa;">请设置昵称</p>
                        <p style="color: #999">{{userInfo.phoneNum}}</p>
                    </div>
                    <div :class="styles['common-flex-mixin-center']" style="width: .4rem;margin-top: .3rem;">
                        <img style="width: 0.48rem;" src="../../image/option/jiantou-left.png" alt="">
                    </div>
                </div>
            </router-link>
        </div>
        <div style="background-color: #fff;margin-top: .25rem;">
            <router-link :to="{name:'_setting_message_list'}">
                <item :imgurl="messageIcon" msg="我的消息"></item>
            </router-link>
        </div>
        <div style="background-color: #fff;margin-top: .25rem;">
            <router-link :to="{name:'_setting_attr_list'}">
                <item :imgurl="setIcon" msg="设置" bottom="true"></item>
            </router-link>
            <item :imgurl="scanIcon" msg="扫一扫" bottom="true"></item>
            <item :imgurl="shareIcon" msg="分享" bottom="true"></item>
            <div @click="setTime">
                <item :imgurl="timeIcon" msg="定时关闭" ></item>
            </div>
        </div>
        <div style="background-color: #fff;margin-top: .25rem;">
            <item :imgurl="infoIcon" msg="关于"></item>
        </div>
    </div>
</template>
<script>
    import item from '../units/listItem.vue'
    import messageIcon from '../../image/option/setting-1.png'
    import setIcon from '../../image/option/setting.png'
    import scanIcon from '../../image/option/setting-6.png'
    import shareIcon from '../../image/option/setting-2.png'
    import infoIcon from '../../image/option/setting-3.png'
    import timeIcon from '../../image/option/setting-4.png'
    import toast from  '../units/toast'
    import { musicOptions } from  '../units/actionSheet'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                messageIcon,
                setIcon,
                scanIcon,
                shareIcon,
                timeIcon,
                infoIcon,
            }
        },
        computed: {
            userInfo(){
                return this.$store.state.userInfo
            }
        },
        watch: {},
        methods: {
            setTime(){
                musicOptions({
                    title:'定时关闭',
                    list:[
                        {text:'不开启'},
                        {text:'10分钟后'},
                        {text:'20分钟后'},
                        {text:'30分钟后'},
                        {text:'40分钟后'},
                        {text:'50分钟后'},
                    ],
                    handle(item,index){
                        toast({message:item.text+"关闭音乐"})
                    }
                })
            }
        },
        created(){
            var _this = this;
            this.$store.commit('setGobalNavIndex_2',4)
            this.post('/api/user/find',{},(s)=>{
                var data = s.data
                _this.$store.commit('setUserInfo',data)
            })
        },
        components: {
            item
        }
    }
</script>

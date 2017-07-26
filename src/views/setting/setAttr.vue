<template>
    <div style="background-color: #EDEEEF">
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">设置</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div style="margin-top: .15rem;">
            <div style="background-color: #fff;padding:0 .1rem 0 .25rem;">
                <router-link :to="{name:'_setting_attr_option_type',params:{type:'timbre'}}">
                    <item bottom="true" msg="在线播放音质" :dft="timbre"></item>
                </router-link>
            </div>
            <div style="background-color: #fff;padding:0 .1rem 0 .25rem;">
                <router-link :to="{name:'_setting_attr_option_type',params:{type:'down'}}">
                <item msg="下载音质" :dft="down"></item>
                </router-link>
            </div>
        </div>
        <div style="margin-top: .15rem;">
            <div style="background-color: #fff;padding:0 .1rem 0 .25rem;">
                <item bottom="true" msg="使用2G/3G/4G网络播放" @change="changePlayType" :ischoose="defaultSetting.playType"></item></div>
            <div style="background-color: #fff;padding:0 .1rem 0 .25rem;">
                <item msg="使用2G/3G/4G网络下载" @change="changeDownType" :ischoose="defaultSetting.downType"></item></div>
        </div>
        <div style="margin-top: .15rem;">
            <div style="background-color: #fff;padding:0 .1rem 0 .25rem;">
                <router-link :to="{name:'_setting_message_set'}">
                    <item bottom="true" msg="新消息提醒" ></item>
                </router-link>
            </div>
            <!--<div style="background-color: #fff;padding:0 .1rem 0 .25rem;">-->
                <!--<item bottom="true" msg="黑名单" ></item></div>-->
            <div @click="clearCache" style="background-color: #fff;padding:0 .1rem 0 .25rem;">
                <item bottom="true" msg="清除缓存" ></item></div>
        </div>
    </div>
</template>
<script>
    import item from '../units/listItem.vue'
    import { setCache } from '../../lib/utils/index'
    import {musicOptions} from '../units/actionSheet'
    import toast from '../units/toast'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
            }
        },
        computed: {
            defaultSetting(){
                return this.$store.state.defaultSetting
            },
            timbre(){
                return this.$store.state.defaultSetting.timbreList[this.$store.state.defaultSetting.timbre].name
            },
            down(){
                return this.$store.state.defaultSetting.downList[this.$store.state.defaultSetting.down].name
            },
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            },
            changePlayType(type){
                this.$store.commit('setDefaultSetting',Object.assign({},this.defaultSetting,{playType:type}))
                setCache('defaultSetting_playType',type)
            },
            changeDownType(type){
                this.$store.commit('setDefaultSetting',Object.assign({},this.defaultSetting,{downType:type}))
                setCache('defaultSetting_downType',type)
            },
            clearCache(){
                musicOptions({
                    title:'清除缓存',
                    list:[
                        {text:'图片缓存'},
                        {text:'音乐缓存'}
                    ],
                    handle(){
                        toast({message:'清除缓存成功！'})
                    }
                })
            }
        },
        created(){

        },
        components: {
            item
        }
    }
</script>

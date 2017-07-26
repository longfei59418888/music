<template>
    <div style="background-color: #EDEEEF">
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">新消息提醒</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div style="margin-top: .25rem;">
            <div style="padding-left: .25rem;background: #fff;"><item bottom="true" msg="收藏信息" @change="changeSaveType" :ischoose="defaultSetting.saveType"></item></div>
            <div style="padding-left: .25rem;background: #fff;"><item bottom="true" msg="系统消息" @change="changeSystemType" :ischoose="defaultSetting.systemType"></item></div>
            <div style="padding-left: .25rem;background: #fff;"><item msg="个人消息" @change="changeSimpleType" :ischoose="defaultSetting.simpleType"></item></div>
        </div>
    </div>
</template>
<script>
    import item from '../units/listItem.vue'
    import { setCache } from '../../lib/utils/index'
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
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            },
            changeSaveType(type){
                this.$store.commit('setDefaultSetting',Object.assign({},this.defaultSetting,{saveType:type}))
                setCache('defaultSetting_saveType',type)
            },
            changeSystemType(type){
                this.$store.commit('setDefaultSetting',Object.assign({},this.defaultSetting,{systemType:type}))
                setCache('defaultSetting_systemType',type)
            },
            changeSimpleType(type){
                this.$store.commit('setDefaultSetting',Object.assign({},this.defaultSetting,{simpleType:type}))
                setCache('defaultSetting_simpleType',type)
            },
        },
        created(){

        },
        components: {
            item
        }
    }
</script>

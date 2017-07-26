<template>
    <div style="background-color: #EDEEEF">
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">{{title}}</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div style="margin-top: .15rem;">
           <div style="background-color: #fff;padding-left:.25rem" v-for="(items,key) in list">
               <item bottom="true" :msg="items.name+(items.info?items.info:'')" @change="change" :index="key" :check="key==index?1:2"></item>
           </div>
        </div>
    </div>
</template>
<script>
    import item from '../units/listItem.vue'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
            }
        },
        computed: {
            list(){
                if(this.$route.params.type=='timbre'){
                    return this.$store.state.defaultSetting.timbreList
                }else if(this.$route.params.type=='down'){
                    return this.$store.state.defaultSetting.downList
                }

            },
            title(){
                if(this.$route.params.type=='timbre'){
                    return '在线播放音质'
                }else if(this.$route.params.type=='down'){
                    return '下载音质'
                }
            },
            index(){
                if(this.$route.params.type=='timbre'){
                    return this.$store.state.defaultSetting.timbre
                }else if(this.$route.params.type=='down'){
                    return this.$store.state.defaultSetting.down
                }
            },
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            },
            change(index){
                if(this.$route.params.type=='timbre'){
                    this.$store.commit('setDefaultSettingTimbre',index)
                }else if(this.$route.params.type=='down'){
                    this.$store.commit('setDefaultSettingDown',index)
                }
            }
        },
        created(){

        },
        components: {
            item
        }
    }
</script>

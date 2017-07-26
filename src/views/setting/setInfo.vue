<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">用户信息</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div style="">
            <headImage
                @success="changeHead"
                :height=100
                :width=100
            >
            <div style="height: 1.5rem;border-radius: 100%;width: 1.5rem;margin: .2rem auto .1rem;overflow: hidden">
                <img style="width: 100%;" v-if="userInfo.logo" :src="userInfo.logo" alt="">
                <img style="width: 100%;" v-if="!userInfo.logo" src="../../image/icon/df-u-img.png" alt="">
            </div>
            <p style="text-align: center;font-size: .28rem;color: #aaa;">{{userInfo.logo?'更换头像':'上传头像'}}</p>
            </headImage>
        </div>
        <div :class="styles['common_display_flex']" style="margin-top: .3rem;font-size: .32rem;padding:.25rem 0;margin: 0 .25rem;
            border-bottom: 1px solid #efefef;">
            <p :class="styles['common-flex-mixin-center']" style="width: 1.5rem;color: #aaa;">昵称 ：</p>
            <div style="flex: 1;-webkit-flex: 1;"><input v-model="userInfo.name" placeholder="输入昵称.."
                    type="text" style="border: none;background:none;width: 100%;color: #666"></div>
        </div>
        <div :class="styles['common_display_flex']" style="margin-top: .3rem;font-size: .32rem;padding:.25rem 0;margin: 0 .25rem;
            border-bottom: 1px solid #efefef;">
            <p :class="styles['common-flex-mixin-center']" style="width: 1.5rem;color: #aaa;">手机号 ：</p>
            <div style="flex: 1;-webkit-flex: 1;"><input v-model="userInfo.phoneNum" placeholder="输入手机号.."
                                                         type="text" style="border: none;background:none;width: 100%;color: #666"></div>
        </div>
        <div style="margin-top: .3rem;font-size: .32rem;padding:.25rem 0;margin: 0 .25rem;">
            <p style="color: #aaa;">介绍 ：</p>
            <div><textarea name="" v-model="userInfo.comments" style="width: 100%;color: #666;
            margin-top: .1rem;border: 1px solid #f2f2f2;min-height: 2rem;"></textarea></div>
        </div>
    </div>
</template>
<script>
    import headImage from '../units/upload/button.vue'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
            }
        },
        computed: {
            userInfo(){
                return this.$store.state.userInfo
            }
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            },
            changeHead(data){
                var form = new FormData();
                form.append("userfile", data.blob);
                this.post('/api/upload',form,(s)=>{
                    this.$store.commit('setUserInfo',{logo:s.data.image})
                },(e)=>{},{
                    'Content-Type':'multipart/form-data'
                })

            }
        },
        created(){

        },
        beforeDestroy(){
            var data = this.userInfo,_this = this;
            _this.post('/api/user/update',{
                comments:data.comments,
                logo:data.logo,
                name:data.name,
                phoneNum:data.phoneNum,
            },(s)=>{
                _this.$store.commit('setUserInfo',{
                    comments:data.comments,
                    logo:data.logo,
                    name:data.name,
                    phoneNum:data.phoneNum,
                })
            })
        },
        components: {
            headImage
        }
    }
</script>

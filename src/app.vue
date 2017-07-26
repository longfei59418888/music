/**
 * Created by DELL on 2017/6/6.
 */
<template>
<div>
 <transition :name="transitionName">
  <router-view class="child-view"></router-view>
 </transition>
</div>
</template>
<script>
    export default {
    data () {
        return {
            styles:require('./style/music.scss'),
        }
    },
    computed:{
        transitionName(){
            return this.$store.state.transitionName.page
        }
    },
    watch: {
        '$route' (to, from) {
            console.log(to)
            let isBack = this.$router.isBack,navIndex = this.$store.state.gobalNavIndex_1,toName = to.name,formName=from.name
            this.isActive = false;
            this.$store.commit('setTransitionName',{page:'slide-no',nav:'slide-no'})
             var pages = ['paly-type-id','register','login','search']
            if (isBack=='right') {
                this.$store.commit('setTransitionName',{page:'slide-no',nav:'slide-right'})
                if(pages.indexOf(toName)!=-1 || pages.indexOf(formName)!=-1){
                    this.$store.commit('setTransitionName',{page:'slide-right',nav:'slide-no'})
                }
            } else if(isBack=='left'){
                this.$store.commit('setTransitionName',{page:'slide-no',nav:'slide-left'})
                if(pages.indexOf(toName)!=-1 || pages.indexOf(formName)!=-1){
                    this.$store.commit('setTransitionName',{page:'slide-left',nav:'slide-no'})
                }
            }else {
                this.$store.commit('setTransitionName',{page:'slide-no',nav:'slide-no'})
                if(pages.indexOf(toName)!=-1 || pages.indexOf(formName)!=-1){
                    this.$store.commit('setTransitionName',{page:'slide-right',nav:'slide-no'})
                }
            }
            // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
            this.$router.isBack = false
        }
    }
}
</script>

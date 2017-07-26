<template>
    <div v-bind:class="styles['nav']">
        <div v-bind:class="styles['nav-item']">
            <span v-on:click="checkNav(1)" v-bind:class="currentIndex==1?styles['choose']:''">最新推荐</span></div>
        <div v-bind:class="styles['nav-item']">
            <span v-on:click="checkNav(2)" v-bind:class="currentIndex==2?styles['choose']:''">歌单</span></div>
        <div v-bind:class="styles['nav-item']">
            <span v-on:click="checkNav(3)" v-bind:class="currentIndex==3?styles['choose']:''">排行榜</span></div>
        <div v-bind:class="styles['nav-item']">
            <span v-on:click="checkNav(4)" v-bind:class="currentIndex==4?styles['choose']:''">歌手</span></div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                styles:require('../../style/scss/index.scss'),
            }
        },
        computed:{
            currentIndex(){
                return this.$store.state.gobalNavIndex_1
            }
        },
        methods: {
            checkNav(index){
                if(this.currentIndex == index) return;
                this.$store.commit('setGobalNavIndex_1',index)
                if(index==1){
                    this.$router.replace('/find/index')
                }else if(index == 2){
                    this.$router.replace('/find/sheet')
                }else if(index == 3){
                    this.$router.replace('/find/rank')
                }else if(index == 4){
                    this.$router.replace('/find/single')
                }
            }
        },
        created(){

        },
        components: {}


    }
</script>


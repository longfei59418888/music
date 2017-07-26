<template>
    <div>
        <div style="background: none;position: relative;z-index: 999" v-bind:class="styles['header-index']">
            <div v-on:click="back()" v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">
                {{title}}
            </div>
            <div v-bind:class="[styles['h-i']]" ><i v-if="!right"></i></div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['title','right'],
        data () {
            return {
                styles:require('../../style/scss/index.scss'),
            }
        },
        computed:{
        },
        methods:{
            back(){
                this.$router.back();
            }
        },
        created(){},
        components: {}


    }
</script>


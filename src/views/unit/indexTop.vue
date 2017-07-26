<template>
    <div style="height: .8rem;overflow: hidden;line-height: .9rem;">
        <p style="float: left;">
            <img style="width: .3rem;position: relative;top:0.02rem;margin-right: 0.03rem;" v-bind:src="img" alt="">
            <span style="font-size: .3rem;color: #333">{{title}}</span></p>
        <router-link v-if="url" style="float: right" :to="url"><span>更多</span>
            <img style="width: .2rem;margin-left: .05rem;" src="../../image/icon/jiantou-right.png" alt=""></router-link>
    </div>
</template>

<script>
    export default {
        props:['title','img','url'],
        data () {
            return {}
        },
        methods: {},
        created(){

        },
        components: {}


    }
</script>



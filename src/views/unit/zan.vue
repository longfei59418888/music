<template>
    <div @click="show()" style="position: absolute;height: 100%;width: 100%;z-index: 2">
        <span style="color:#D33C33;-webkit-transition: all .85s;transition: all .85s;display: none;opacity: 1;position: absolute"
        :style="animate">+1</span>
    </div>
</template>
<script>
    export default {
        props:['left','top'],
        data () {return {
            isShow:false,
            animate:[]
        }},
        computed: {},
        watch: {},
        methods: {
            show(){
                if(this.isShow) return
                this.isShow=true
                var _this = this;
                _this.animate.push({display:'block',left:this.left+'px',top:this.top+'px'})
                setTimeout(function () {
                    _this.animate.push({webkitTransform:'translateY(-35rem)',transform:'translateY(-.35rem)',opacity:0})
                },20)
                setTimeout(function () {
                    _this.animate=[]
//                    _this.isShow=false
                },900)
            }
        },
        created(){
        },
        components: {}
    }
</script>

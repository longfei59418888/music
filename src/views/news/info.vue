<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"   v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">资讯详情</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div v-bind:class="[styles['content-new-info']]" style="position: absolute;top: 1.4rem;bottom: 0;width: 100%;overflow: auto">
            <div v-html="info"></div>
            <div style="height: 1rem;"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                info:''
            }
        },
        computed: {
            currentNews(){
                return this.$store.state.currentNews;
            }
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            }
        },
        created(){
            var url
            if(this.currentNews.url && this.currentNews.url.length>0){
                url = this.currentNews.url
            }else {
                url = 'http://3g.163.com/ent/article/CNP4KQGG0517F94J.html#child=music&offset='+this.currentNews.index
            }
            this.post('/info/news',{url:url},(s)=>{
                this.info = s.data.replace('查看大图','')
            })
        },
        components: {
        }
    }
</script>

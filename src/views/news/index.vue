<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div  v-bind:class="styles['h-scan']"></div>
            <div v-bind:class="styles['title']">音乐资讯</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div style="position: absolute;top: 1.4rem;bottom: 0;width: 100%;">
            <list></list>
        </div>
    </div>
</template>
<script>

    import list from './list.vue'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
            }
        },
        computed: {},
        watch: {},
        methods: {},
        created(){
            if(this.$store.state.gobalNavIndex_2 != 3){
                this.$store.commit('setNewsList',{
                    index:0,
                    lists:[],
                })
            }
            this.$store.commit('setGobalNavIndex_2',3)
        },
        components: {
            list
        }
    }
</script>

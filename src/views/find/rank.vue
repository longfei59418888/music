<template>
    <div>
        <div v-bind:class="styles['scroller']">
            <scroller>
                <ul>
                    <li v-for="item in lists">
                        <itemrank v-bind:imgurl="item.imgurl" v-bind:id="item.id"></itemrank>
                    </li>
                </ul>
                <div style="height: 0.2rem;"></div>
            </scroller>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import itemrank from '../unit/rankItem.vue'
    var data = {
        styles:require('../../style/scss/index.scss'),
        list:require('../../style/find/sheetList.scss'),
    }
    export default {
        name: 'app',
        computed:{
            lists(){
                return this.$store.state.rankList;
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='_find_rank'){
                    this.$store.commit('setGobalNavIndex_1',3)
                }
            }
        },
        created(){
            this.$store.commit('setGobalNavIndex_1',3)
        },
        data: function () {
            return data;
        },
        components:{
            itemrank
        },
        methods: {}
    }
</script>
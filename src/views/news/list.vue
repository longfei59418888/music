<template>
    <div>
        <scroller
            ref="my_scroller"
            :on-infinite="getLists"
            >
            <ul>
                <li v-for="(items,key) in lists"><items :item="items" :index="key"></items></li>
            </ul>
        </scroller>
    </div>
</template>
<script>

    import items from './newItem.vue'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                index:0,
                lists:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
            getLists(done){
                var _this =  this;
                setTimeout(() => {
                    var data = {page:_this.index+'0-10'}
                    _this.post('/list/news',data,(s)=>{
                        _this.lists = _this.lists.concat(eval(s.data))
                        _this.index++
                        _this.$store.commit('setNewsList',{
                            index:_this.index,
                            lists:_this.lists,
                        })
                        done()
                    })
                }, 500)
                function artiList(d) {
                    var data = []
                    for(var item in  d){
                        data = d[item]
                    }
                    return data
                }
            }
        },
        created(){
            var newsList = this.$store.state.newsList;
            this.index = newsList.index
            this.lists = newsList.lists
        },
        components: {
            items
        }
    }
</script>

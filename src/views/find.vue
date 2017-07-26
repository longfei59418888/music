<template>
    <div>
        <div v-bind:class="styles['header-index']">
            <div v-bind:class="styles['h-scan']"><i></i></div>
            <div v-bind:class="styles['search']">
                <router-link :to="{name:'search'}"><span><i></i>搜索音乐、歌词、歌单</span></router-link>
            </div>
            <div v-bind:class="[styles['h-i']]" ><i></i></div>
        </div>
        <find-nav></find-nav>
        <div style="position: absolute;left: 0;top: 2.15rem;bottom: 1rem;width: 100%;">
            <keep-alive>
                <router-view class="child-view" ></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import {bind_getPushMessage} from '../lib/utils/appUtil'
    import findNav from './unit/findNav.vue'
    export default {
        data () {
            return {
                styles:require('../style/scss/index.scss'),
            }
        },
        computed:{
        },
        methods:{},
        created(){
            this.$store.commit('setGobalNavIndex_2',1)
        },
        components: {
            findNav,
        }


    }
</script>



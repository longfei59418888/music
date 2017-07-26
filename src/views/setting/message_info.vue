<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">我的消息</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div>
            <div style="padding: 0.2rem;border-bottom: 1px solid #f6f6f6;margin-top: .04rem;">
                <p style="font-size: .32rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
                margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>{{info.title}}</p>
            </div>
            <p style="font-size: .30rem;padding: .25rem;color: #666;">{{info.message}}</p>
        </div>
    </div>
</template>
<script>
    import item from '../units/item.vue'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
            }
        },
        computed: {
            info(){
                return this.$store.state.messageList.currentItem
            }
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            }
        },
        created(){

        },
        components: {
            item
        }
    }
</script>

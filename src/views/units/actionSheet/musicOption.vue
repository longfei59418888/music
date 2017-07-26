<template>
    <div>
        <bg @close="close" :show="isShow">
            <div style="position: absolute;left: 0;width: 100%;bottom: 0.15rem;
            -webkit-transition: all .3s;transition: all .3s;-webkit-transform: translateY(100%);transform: translateY(100%);"
                 :style="itemPosition">
                <div style="margin: 0 .15rem;border-radius: .1rem;position: relative;z-index: 3;overflow: hidden;">
                    <div style="position: absolute;height: 100%;width: 100%;left: 0;top: 0;background-color: #fff;opacity: .9;"></div>
                    <div style="position: relative">
                        <div v-if="title" style="height: .7rem;padding: 0 .15rem;line-height: .7rem;border-bottom: 1px solid #ccc;">
                            <p>{{title | setTextSize(20)}}</p>
                        </div>
                        <ul style="max-height: 4.5rem;overflow-y: scroll;">
                            <li @click="choose(index,$event)" style="line-height: .7rem;display: flex;display: -webkit-flex;"
                                v-for="(item,index) in list">
                                <div v-if="item.icon" style="width: .7rem;text-align: center">
                                    <img  :src="item.icon" style="width: .36rem;height: .36rem;position: relative;top: .1rem;" alt=""></div>
                                <p style="flex: 1;-webkit-flex: 1;border-bottom: 1px solid #ccc;margin-left: .1rem;">{{item.text}}</p>
                                <p v-if="item.info" style="width: .7rem;border-bottom: 1px solid #ccc;">{{item.info}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </bg>
    </div>
</template>
<script>
    import bg from './bg.vue'
    import { getVendorPrefix } from '../../../lib/utils'
    export default {
        data () {
            return {
                list : [1,2,3,4,5,6,7,8,9,0,34,34,34,23,23,2,32,34,34],
                title:false,
                isShow:false,
                itemPosition:{}
            }
        },
        computed: {},
        watch: {
            'isShow'(){
                this.itemPosition = this.isShow?{webkitTransform:'translateY(0)',transform:'translateY(0)'}:{}
            }
        },
        methods: {
            close(){
                this.remove();
            },
            choose(index,e){
                this.chooseItem(index)
            }
        },
        created(){},
        components: {
            bg
        }
    }
</script>

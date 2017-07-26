<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">我的消息</div>
            <div v-bind:class="[styles['h-i']]"  style="color: #fff"></div>
        </div>
        <div style="position: absolute;top: 1.4rem;bottom: 0;width: 100%;">
            <scroller>
                <ul>
                    <li v-for="(items,key) in lists" @click="goInfo(key)">
                        <item :index="key" @deleted="deleted">
                            <div style="padding: .25rem;border-bottom: 1px #efefef solid;padding-left:0;margin-left: .25rem">
                                <p style="font-size: .30rem;color: #333;line-height: .45rem;">
                                    <span style="position: relative">{{items.title}}
                                      <i v-if="!items.isRead" style="position: absolute;display: inline-block;
                                      width: .15rem;height: .15rem;background-color: #D33C33;right:0;top: -.03rem;border-radius: 100%;"></i>
                                    </span>
                                    <span style="font-size: .24rem;color: #ccc;float: right;line-height: .45rem;">
                                        {{items.type==1?'系统消息':'个人消息'}}</span>
                                </p>
                                <p style="font-size: .28rem;color: #999;margin-top: .25rem;">{{items.message}}</p>
                            </div>
                        </item>
                    </li>
                </ul>
            </scroller>
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
            lists(){
                return this.$store.state.messageList.list
            },
            num(){
                return this.$store.state.messageList.unread
            }
        },
        watch: {},
        methods: {
            deleted(index){
                if(!this.lists[index].isRead){
                    this.num--
                }
                this.lists.splice(index,1)
                this.$store.commit('setMessageList',Object.assign({},this.$store.state.messageList,{unread:this.num,list:this.lists}))
            },
            goInfo(index){
                if(!this.lists[index].isRead){
                    this.lists[index].isRead=true
                    this.num--
                }
                this.$store.commit('setMessageList',{unread:this.num,list:this.lists,currentItem:this.$store.state.messageList.list[index]})
                this.$router.push({name:'_setting_message_info'})
            },
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

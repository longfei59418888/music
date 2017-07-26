<template>
    <div>
        <bg :show="isShow" :dec="direction" style="background-color: #efefef">
            <div style="background: #D33C33;position: relative;z-index: 999" v-bind:class="styles['header-index']">
                <div v-on:click="cancel()" v-bind:class="styles['h-scan']">
                    <span style="color: #fff;">取消</span>
                </div>
                <div v-bind:class="styles['title']">新建歌单</div>
                <div @click="yes()" v-bind:class="[styles['h-i']]" ><span style="color: #fff">完成</span></div>
            </div>
            <div>
                <p style="margin: .4rem 0;"><input v-model="name" style="width: 100%;border: none;box-shadow: 1px 1px 1px #ddd;line-height: .8rem;
                padding: 0 .2rem;color: #999;" type="text" placeholder="歌单标题"></p>
            </div>
        </bg>
    </div>
</template>
<script>
    import bg from './bg.vue'
    import headTop from '../../unit/header.vue'
    import { Toast } from '../../units/toast'
    import defaltIcon from '../../../image/icon/music-save.png'
    export default {
        data () {
            return {
                isShow:false,
                direction:'',
                name:'',
                styles:require('../../../style/scss/index.scss'),
                scope:{}
            }
        },
        computed: {},
        watch: {},
        methods: {
            yes(){
                var _this = this;
                if(_this.name.length<1){
                    Toast({message:'请输入歌单名称！'})
                    return
                }
                _this.post('/api/sheet/add',{
                    specialname:_this.name,
                    imgurl:_this.scope.imgUrl?_this.scope.imgUrl:defaltIcon
                },(s)=>{
                    _this.success(s)
                })
            },
            cancel(){
                this.remove()
            }
        },
        created(){},
        components: {
            bg,
            headTop
        }
    }
</script>

<template>
    <div :class="styles['common_display_flex']" style="width: 100%;height: .9rem;overflow: hidden" @click="checkChoose">
        <div v-if="imgurl" :class="styles['common-flex-mixin-center']" style="width: .9rem;">
            <img :src="imgurl" style="width: .4rem" alt="">
        </div>
        <div :class="styles['common-flex-mixin-middle']" style="flex:1;-webkit-flex: 1;"
            :style="isBottom"
        >
            <p style="font-size: .30rem;color: #333;">{{msg}}</p>
        </div>
        <div :class="styles['common-flex-mixin-center']" style="min-width: .5rem;"
             :style="isBottom">
            <span v-if="dft&&!check" style="font-size: .26rem;color: #666;position: relative;top: .02rem;">{{dft}}</span>
            <p v-if="choose&&!check" @click="change($event)" style="width: 45px;height: 25px;margin-right: .15rem;border-radius: 25px;border: 1px solid #eee"
                    :style="choosep">
                <span style="height: 24px;width: 24px;border-radius: 100%;display: inline-block;box-shadow: 1px 3px 3px #ccc;position: relative;
                top: -1px;border: 1px solid #efefef;background-color: #fff;"
                      :style="chooses"></span>
            </p>
            <img v-if="!choose&&!check" src="../../image/option/jiantou-r.png" style="width: .32rem;" alt="">
            <img v-if="check&&check==1" src="../../image/option/choose-tui.png" style="width: .32rem;" alt="">
        </div>
    </div>
</template>
<script>
    /*
    * imgurl  前面图标
    * msg  title
    * bottom 是否有bottom-border
    * dft  默认的选择
    * ischoose  是否是radio 选择  1 选中  2 未选中
    * */
    export default {
        props:['imgurl','msg','bottom','dft','ischoose','check','index'],
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                choose:false,
            }
        },
        computed: {
            isBottom(){
                return this.bottom?{borderBottom:'1px solid #efefef'}:''
            },
            choosep(){
                return this.choose == 1?{backgroundColor:'#D33A31',border:'1px solid #D33A31'}:{}
            },
            chooses(){
                return this.choose == 1?{float:'right',left:'2px'}:{}
            }
        },
        watch: {},
        methods: {
            change(e){
                e.stopPropagation()
                e.preventDefault()
                if(this.choose>1) this.choose=1
                else this.choose=2
                this.$emit('change',this.choose)
            },
            checkChoose(){
                if(!this.check) return
                this.$emit('change',this.index)
            }
        },
        created(){
            this.choose = this.ischoose;
        },
        components: {
        }
    }
</script>

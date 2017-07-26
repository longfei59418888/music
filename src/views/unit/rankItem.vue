<template>
    <div style="position: relative;margin: .2rem;padding-left: 2rem;height: 1.6rem;" v-on:click="goInfo()">
        <div style="height: 1.6rem;position: absolute;left: 0;top: 0;width: 1.6rem;">
            <img style="width: 100%;" v-bind:src="imgurl" alt=""></div>
        <ul style="height: 1.6rem;border-bottom: 1px solid #fafafa;padding-top: 0.18rem;">
            <li v-for="(item,key) in lists"
                style="font-size: .24rem;color: #666;margin-bottom: 0.02rem;line-height: .42rem;
                height: .42rem;overflow: hidden;padding-right: .05rem;">{{key+1}}. {{item.filename}}</li>
        </ul>
    </div>
</template>
<style>

</style>
<script>
    export default {
        props:['imgurl','id'],
        name: 'app',
        created(){
            var _this  = this;
            this.$ajax.get('/list/music',{params:{type:this.id,pageIndex:1}})
                    .then(function (response) {
                        var data= response.data.songs.list.slice(0,3);
                        _this.lists = data
                    })
        },
        data: function () {
            return {
                lists:[]
            };
        },
        methods: {
            goInfo(){
                this.$router.push({name:'rank-music-id',params:{id:this.id}})
            }
        }
    }
</script>
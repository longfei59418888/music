/**
 * Created by DELL on 2017/6/7.
 */
// 创建一个对象来保存应用启动时的初始状态   state
const state = {
    sdfsdf:{
        list:[],
        pageInfo:{
            page:1,
            total:0,
            page_size:5
        }
    },
    sdfsdf:true,
    sdfsdf:{
    },
}
// 创建一个对象存储一系列我们接下来要写的 mutation 函数   reducer
const mutations = {
    sdfasdfa (state,data) {
        state.groups=data
    },
    setLoaasdfasdfding(state,data){
        state.loading=data
    },
    getAdmsdfsdfinUserInfo (state,data){
        state.userInfo=data
    }
}

export default {
    state,
    mutations
}
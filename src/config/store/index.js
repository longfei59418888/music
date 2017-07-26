/**
 * Created by DELL on 2017/6/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {extend} from '../../lib/utils/index'
import store_1 from './store_1'
import store_2 from './store_2'
// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
let stores ={};
stores = extend(stores,store_1,store_2)
export default new Vuex.Store(stores)
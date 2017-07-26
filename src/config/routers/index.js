/**
 * Created by DELL on 2017/6/7.
 */
import router_1 from './routers_1'
import router_2 from './routers_2'
import {extend} from '../../lib/utils/index'
let routers = []
routers = extend(routers,router_1,router_2)
export default routers;
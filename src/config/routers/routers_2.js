/**
 * Created by DELL on 2017/6/7.
 */
import Home from '../../views/home.vue'
import settingSetAttr from '../../views/setting/setAttr.vue'
const routers = [
    { path: '/', component: Home,
        children:[
            {path:'setting',component:Home,
                children:[
                    {path:'attr-list',component:settingSetAttr,name:'_setting_attr_list'},
                ]
            },
        ]
    }
]
export default routers
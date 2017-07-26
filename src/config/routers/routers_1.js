/**
 * Created by DELL on 2017/6/7.
 */
import Home from '../../views/home.vue'
import HomeIndex from '../../views/find/index.vue'
import HomeSheetList from '../../views/find/sheetList.vue'
import HomeRankList from '../../views/find/rank.vue'
import Find from '../../views/find.vue'
import sheetInfo from '../../views/sheetInfo.vue'
import mineMusicList from '../../views/mine/music.vue'
import newsIndex from '../../views/news/index.vue'
import newsInfo from '../../views/news/info.vue'
import rankMusic from '../../views/rankMusic.vue'
import singleMusic from '../../views/singleMusic.vue'
import play from '../../views/play.vue'
import search from '../../views/search.vue'

import settingIndex from '../../views/setting/index.vue'
import settingSetInfo from '../../views/setting/setInfo.vue'
import settingMessageList from '../../views/setting/message_list.vue'
import settingMessageInfo from '../../views/setting/message_info.vue'
import settingSetAttr from '../../views/setting/setAttr.vue'
import settingSetOption from '../../views/setting/setOption.vue'
import settingMessageSet from '../../views/setting/messageSet.vue'

import singleInfo from '../../views/singleInfo.vue'
import login from '../../views/login/login.vue'
import mineIndex from '../../views/mine/index.vue'
import register from '../../views/login/register.vue'
import singleMusicList from '../../views/singleMusicList.vue'
import HomesingleList from '../../views/find/single.vue'

import Table from '../../views/units/table/test.vue'
import popover from '../../views/units/popover/test.vue'
import scroller from '../../views/units/scroller/test.vue'
import datepicker  from '../../views/units/datepicker/test.vue'
import imgLoad  from '../../views/units/imgLoad/test.vue'

const routers = [
    { path: '/', component: Home,
        children:[
            {path:'find',component:Find,children:[
                {path: 'index', component: HomeIndex,name:'_find_index'},
                {path: 'sheet', component: HomeSheetList,name:'_find_sheet',test:'sdf'},
                {path: 'rank', component: HomeRankList,name:'_find_rank'},
                {path: 'single', component: HomesingleList,name:'_find_single'},
            ]},
            {path:'sheet-info/:id',component:sheetInfo,name:'sheet-info-id'},
            {path:'rank-music/:id',component:rankMusic,name:'rank-music-id'},
            {path:'single-music/:id',component:singleMusic,name:'single-music-id'},
            {path:'single-music-list/:id',component:singleMusicList,name:'single-music-list-id'},
            {path:'/single/:id',component:singleInfo,name:'_single-id'},
            {path:'mine',component:Home,
                children:[
                    {path:'index',component:mineIndex,name:'_mine_index'},
                    {path:'sheet-info/:type',component:sheetInfo,name:'_mine_sheet-info'},
                    {path:'music-list/:type',component:mineMusicList,name:'_mine_music-list-type'},
                    {path:'single-list',component:singleMusic,name:'_mine_single-list'}
                ]
            },
            {path:'news',component:Home,
                children:[
                    {path:'index',component:newsIndex,name:'_news_index'},
                    {path:'info',component:newsInfo,name:'_news_info'},
                ]
            },
            {path:'setting',component:Home,
                children:[
                    {path:'index',component:settingIndex,name:'_setting_index'},
                    {path:'info',component:settingSetInfo,name:'_setting_set_info'},
                    {path:'message-list',component:settingMessageList,name:'_setting_message_list'},
                    {path:'message-info',component:settingMessageInfo,name:'_setting_message_info'},
                    {path:'attr-option/:type',component:settingSetOption,name:'_setting_attr_option_type'},
                    {path:'message-set',component:settingMessageSet,name:'_setting_message_set'},
                ]
            },
        ]
    },
    {path:'/paly/:type/:id',component:play,name:'paly-type-id'},
    {path:'/search',component:search,name:'search'},
    {path:'/login',component:login,name:'login'},
    {path:'/register',component:register,name:'register'},
    {path:'/table',component:Table,name:'Table'},
    {path:'/popover',component:popover,name:'popover'},
    {path:'/scroller',component:scroller,name:'scroller'},
    {path:'/datepicker',component:datepicker,name:'datepicker'},
    {path:'/img-load',component:imgLoad,name:'imgLoad'},

]
export default routers
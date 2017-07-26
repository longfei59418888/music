/**
 * Created by DELL on 2017/6/7.
 */
import { getCache,setCache } from '../../lib/utils'
const state = {
    //切换效果
    transitionName:{
        page:'null',
        nav:'null'
    },
    //首页banner图
    indexBannerList_1:[
        {imgurl:'http://imge.kugou.com/soft/collection/400/20170609/20170609182236337646.jpg',info:'lskjkldfsdf',id:50},
        {imgurl:'http://imge.kugou.com/soft/collection/400/20170607/20170607144951568650.jpg',info:'lskjkldfsdf',id:50},
        {imgurl:'http://imge.kugou.com/soft/collection/400/20170516/20170516165058713475.jpg',info:'lskjkldfsdf',id:50},
        {imgurl:'http://imge.kugou.com/soft/collection/400/20160421/20160421114808244617.jpg',info:'lskjkldfsdf',id:50},
        {imgurl:'http://imge.kugou.com/soft/collection/400/20170612/20170612003723629525.jpg',info:'lskjkldfsdf',id:50},
        {imgurl:'http://imge.kugou.com/soft/collection/400/20170601/20170601141036829486.jpg',info:'lskjkldfsdf',id:50},
    ],
    //切换按钮
    gobalNavIndex_1:1,
    gobalNavIndex_2:1,
    //首页歌单列表
    indexSheetList_1:[],
    //首页最新列表
    indexNewList_1:[],
    //歌单列表
    findSheetList:{
        list:[],
        pageIndex:1,
    },
    //排行榜数组
    rankList:[
        {id:6666,imgurl:require('../../image/icon_rank/rank_1.jpg'),title:'飙升排行榜'},//飙升
        {id:27,imgurl:require('../../image/icon_rank/rank_15.jpg'),title:'新歌排行榜'},//新歌
        {id:28653,imgurl:require('../../image/icon_rank/rank_10.jpg'),title:'原创排行榜'},//原创
        {id:24045,imgurl:require('../../image/icon_rank/rank_11.jpg'),title:'音乐韩语榜'},//韩国
        {id:8888,imgurl:require('../../image/icon_rank/rank_8.jpg'),title:'Hit FM Top榜'},//排名
        {id:24047,imgurl:require('../../image/icon_rank/rank_4.jpg'),title:'日本Oricon周榜'},//日本
        {id:22603,imgurl:require('../../image/icon_rank/rank_16.jpg'),title:'法国 Hits 周榜'},//欧美新歌
        {id:22050,imgurl:require('../../image/icon_rank/rank_6.jpg'),title:'粤语TOP排行榜'},//粤语
        {id:21101,imgurl:require('../../image/icon_rank/rank_14.jpg'),title:'飙升排行榜'},//热歌分享
        {id:30210,imgurl:require('../../image/icon_rank/rank_5.jpg'),title:'电台龙虎榜'},//金曲
        {id:4681,imgurl:require('../../image/icon_rank/rank_12.jpg'),title:'美国Billboard周榜'},//美国BillBoard榜
        {id:4680,imgurl:require('../../image/icon_rank/rank_7.jpg'),title:'UK排行榜周榜'},//英国单曲
        {id:24307,imgurl:require('../../image/icon_rank/rank_3.jpg'),title:'KTV唛榜'},//ktv
    ],
    //排行榜歌曲
    rankMusicList:{
        id:0,
        list:[],
        index:1,
        typeInfo:[],
        sheetInfo:[]
    },
    //歌手类型列表
    singleType:[
        {id:88,title:'热门歌手',imgurl:require('../../image/icon_rank/remen.png')},//热门
        {id:1,title:'华语男歌手',imgurl:require('../../image/icon_rank/geshou_1.png')},//华语男
        {id:2,title:'华语女歌手',imgurl:require('../../image/icon_rank/nvren2.png')},//华语女
        {id:3,title:'华语组合',imgurl:require('../../image/icon_rank/yuedui_2.png')},//华语组合
        {id:4,title:'韩日男歌手',imgurl:require('../../image/icon_rank/geshou_6.png')},//韩日
        {id:5,title:'韩日女歌手',imgurl:require('../../image/icon_rank/yuedui_1.png')},//韩日
        {id:7,title:'欧美男歌手',imgurl:require('../../image/icon_rank/oumei_1.png')},//韩日
        {id:8,title:'欧美女歌手',imgurl:require('../../image/icon_rank/nvren1.png')},//韩日
    ],
    //歌手列表
    singleList:{
        list:[],
        id:0,
        index:1
    },
    //歌手歌曲列表
    singleMusicList:{
        list:[],
        id:0,
        info:{},
        index:1
    },
    //歌单歌曲列表
    sheetSingleList:{
        id:0,
        list:[]
    },
    newsList:{
        index:0,
        lists:[],
    },
    currentNews:{},
    userInfo:{
        name:'',
        email:'',
        phoneNum:'',
        comments:'',
        logo:'',
        level:'',
    },
    messageList:{
        unread:3,
        list:[
            {type:1,title:'更新版本1',message:'1.sdfjaskjf skajfksa.a sdfasdf asdfasdfsadf asdfsadfasdfasdfsdf',isRead:false},
            {type:2,title:'更新版本1',message:'1.sdfjaskjf skajfksa.asdf asdfa sdfasdfsadf  asdfsadfasdfasdfsdf',isRead:true},
            {type:1,title:'更新版本1',message:'1.sdfj as kjfskajfk sa.asd fas  dfas  dfas dfsadf as fsadfasd  fas dfsdf',isRead:true},
            {type:1,title:'更新版本1',message:'1.sdfja skjfskajf  sa. dfasdfa s fasdfs fasdf adf  sdf sd fsdf',isRead:false},
            {type:2,title:'更新版本1',message:'1.sdf ja sk j fska fksa sd fas fas dfa fsa fas dfsadfas dfasdfsdf',isRead:false},
        ],
        currentItem:{}
    },
    defaultSetting:{
        timbreList:[{name:'自动选择'},{name:'标准',info:' (128kbit/s)'},{name:'较高',info:' (192kbit/s)'},{name:'极高',info:' (320kbit/s)'}],
        downList:[{name:'标准',info:' (128kbit/s)'},{name:'较高',info:' (192kbit/s)'},{name:'极高',info:' (320kbit/s)'}],
        timbre:getCache('defaultSetting_timbre')?getCache('defaultSetting_timbre'):1,
        down:getCache('defaultSetting_down')?getCache('defaultSetting_down'):1,
        playType:getCache('defaultSetting_playType')?getCache('defaultSetting_playType'):2,
        downType:getCache('defaultSetting_downType')?getCache('defaultSetting_downType'):2,
        saveType:getCache('defaultSetting_saveType')?getCache('defaultSetting_saveType'):1, //收藏消息
        systemType:getCache('defaultSetting_systemType')?getCache('defaultSetting_systemType'):1,  //系统消息
        simpleType:getCache('defaultSetting_simpleType')?getCache('defaultSetting_simpleType'):1,  //个人信息
        imageCache:getCache('defaultSetting_imageCache')?getCache('defaultSetting_imageCache'):15,
        musicCache:getCache('defaultSetting_musicCache')?getCache('defaultSetting_musicCache'):35
    },
    currentSheet:{
        imgurl:'http://imge.kugou.com/soft/collection/400/20170613/20170613153610701789.jpg',
        playcount:5421,
        specialname:'你放开了手，我却还频频回首',
        username:'送给你情够。',
    }
}
const mutations = {
    setDefaultSetting(state,data){
        state.defaultSetting = data;
    },
    setDefaultSettingTimbre(state,data){
        state.defaultSetting.timbre = data
        setCache('defaultSetting_timbre',data)
    },
    setDefaultSettingDown(state,data){
        state.defaultSetting.down = data
        setCache('defaultSetting_down',data)
    },
    setMessageList(state,data){
        state.messageList = data
    },
    setUserInfo(state,data){
        state.userInfo = Object.assign({},state.userInfo,data)
    },
    setCurrentNews(state,data){
        state.currentNews = data
    },
    setNewsList(state,data){
        state.newsList = data
    },
    setRankMusicList(state,data){
        state.rankMusicList = data
    },
    setSingleMusicList(state,data){
        state.singleMusicList=data
    },
    setSingleList(state,data){
        state.singleList=data;
    },
    setCurrentSheet(state,data){
        state.currentSheet = data
    },
    setTransitionName(state,data){
        state.transitionName=Object.assign(state.transitionName,data);
    },
    setGobalNavIndex_1(state,index){  //切换按钮
        state.gobalNavIndex_1=index
    },
    setGobalNavIndex_2(state,index){  //切换按钮
        state.gobalNavIndex_2=index
    },
    setIndexBannerList_1(state,data){
        state.indexBannerList_1=data.length>6?data.slice(6,12):data
    },
    getIndexSheetList_1(state,data){
        state.indexSheetList_1=data.length>6?data.slice(0,6):data
    },
    getIndexNewList_1(state,data){
        state.indexNewList_1=data.length>16?data.slice(0,16):data
    },
    setFindSheetList(state,data){
        state.findSheetList.list= state.findSheetList.list.concat(data)
        state.findSheetList.pageIndex++
    }
}

export default {
    state,
    mutations
}
/**
 * Created by DELL on 2017/6/8.
 */
const config={
    isDebug:false,
    url:{
        findIndexBanner:'/list/bannerList',//首页banner
        sheetList:'/list/sheet',//歌单查询   pageIndex:页码
        singleMusicList:'/list/single/music',//某个歌手歌曲查询
        sheetMusicList:'/list/sheet/music',//某个歌单歌曲查询
        musicList:'/list/music',//某个排行榜歌曲列表查询
        singleList:'/list/single',//某类歌手列表查询
        saveMusic:'/music/save',//收藏/取消收藏
        commentMusic:'/music/comment',//评论歌曲
        infoMusic:'/music/info',//歌曲
        lyricsMusic:'/music/Lyrics',//歌词
    }
}
export default config

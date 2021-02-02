// miniprogram/pages/player/player.js
let musiclist=[]
let playingIndex=0
const backgroundAudioManager=wx.getBackgroundAudioManager()
var mytime=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl:'',
    isPlaying:false,
    progress:0,
    currentTime:'00:00',
    totalTime:'99:99',
    currentSecond:0,
    isLyricShow:false,
    lyric:'这里是歌词'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    playingIndex=options.index
    musiclist=wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
    
  },
  _loadMusicDetail(musicId){
    let music=musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl:music.al.picUrl
    })

    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'lyric',
      }
    }).then(res=>{
      console.log(res.result)
      let lyric='暂无歌词'
      const lrc=res.result.lrc
      if(lrc){
        lyric=lrc.lyric
      }
      this.setData({
        lyric
      })
    })

    wx.cloud.callFunction({
      name:'music',
      data:{
        musicId,
        $url:'musicUrl',
      }
    }).then(res=>{
      console.log(res)
      const url=res.result.data[0].url
      if(url===null){
        wx.showToast({
          title: '没有权限播放',
        })
        backgroundAudioManager.pause()
        this.setData({
          isPlaying:false
        })
        return
      }
      this.setData({
        isPlaying:true,
        title:music.name,
        singer:music.ar[0].name
      })
      backgroundAudioManager.src=url
      backgroundAudioManager.title=music.name
      backgroundAudioManager.coverImgUrl=music.al.picUrl
      backgroundAudioManager.singer=music.ar[0].name
      let _this=this;
      setTimeout(x=>{
        let s=backgroundAudioManager.duration
        console.log(s)
       _this.setData({
          totalTime:parseInt(s/60)+':'+parseInt(s%60)
       })
      },1000)
      this.start()
    })
    
    

  },
  dragAudioSlider(e){
    console.log('####'+e.detail.value)
    backgroundAudioManager.seek(e.detail.value)
    let s=(parseFloat(e.detail.value))/100*parseInt(backgroundAudioManager.duration)
    this.setData({
      currentTime:(parseInt(s/60)<10?('0'+parseInt(s/60)):parseInt(s/60))+':'+(parseInt(s%60)<10?('0'+parseInt(s%60)):parseInt(s%60)),
      currentSecond:parseInt(backgroundAudioManager.duration*parseFloat(e.detail.value/100))
    })
  },
  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManager.pause()
      clearInterval(mytime)
    }
    else{
      backgroundAudioManager.play()
      this.start()
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })

  },
  onPrev(){
    playingIndex--;
    if(playingIndex===-1){
      playingIndex=musiclist.length-1
    }
    clearInterval(mytime)
    this.setData({
      progress:0,
    currentTime:'00:00',
    totalTime:'99:99',
    currentSecond:0
    })
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    playingIndex++;
    if(playingIndex===musiclist.length){
      playingIndex=0
    }
    clearInterval(mytime)
    this.setData({
      progress:0,
    currentTime:'00:00',
    totalTime:'99:99',
    currentSecond:0
    })
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  toBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  start(){
    let _this=this
    mytime=setInterval(() => {
      let s=_this.data.currentSecond
      s++;
      let ss=(s/backgroundAudioManager.duration)*100
      console.log("bgd="+backgroundAudioManager.duration)
      console.log("s="+s)
      if(s===parseInt(backgroundAudioManager.duration+1)){
        console.log('s='+s+"-----duration="+backgroundAudioManager.duration)
        clearInterval(mytime)
        this.onNext()
        return
      }
      this.timeUpdate(s)
      _this.setData({
        progress:ss,
        currentSecond:s,
        currentTime:(parseInt(s/60)<10?('0'+parseInt(s/60)):parseInt(s/60))+':'+(parseInt(s%60)<10?('0'+parseInt(s%60)):parseInt(s%60))
      })
    }, 1000);
  },
  onLyricShow(){
    this.setData({
      isLyricShow:!this.data.isLyricShow
    })
  },
  timeUpdate(currentTime){
    this.selectComponent('.lyric').update(currentTime)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
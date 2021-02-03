// miniprogram/pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist:[],
    listInfo:{},
    navOpacity:1,
    isTop:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.playlistId)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'music',
      data:{
        playlistId:options.playlistId,
        $url:'musiclist'
      }
    }).then(res=>{
      console.log(res)
      const pl=res.result.playlist
      this.setData({
        musiclist:pl.tracks,
        listInfo:{
          coverImgUrl:pl.coverImgUrl,
          name:pl.name
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },
  _setMusiclist(){
    wx.setStorageSync('musiclist', this.data.musiclist)
  },
  toBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onPageScroll(e){
    console.log(e)
    const scrollTop=e.scrollTop
    let opac=0.99
    if(scrollTop<220){
      if(scrollTop<140){
        opac=0.99
      }
      else if(scrollTop<160){
        opac=0.8
      }
      else if(scrollTop<180){
        opac=0.6
      }
      else if(scrollTop<200){
        opac=0.4
      }
      else if(scrollTop<220){
        opac=0.2
      }
      this.setData({
        isTop:true,
        navOpacity:opac
      })
    }else{
      this.setData({
        isTop:false,
        navOpacity:0.99
      })
    }
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
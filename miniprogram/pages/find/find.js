// pages/find/find.js
let keyword=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
   //控制弹出层是否显示
   modalShow: false,
   blogs:[]
  },

  _loadBlogList(start=0){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name:'blog',
      data:{
        keyword,
        start,
        count:10,
        $url:'list',
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        blogs:this.data.blogs.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    console.log(this.data.blogs)

    })
  },
  onSearch(e){
    console.log(e.detail)
    this.setData({
      blogs:[]
    })
    keyword=e.detail.keyword
    this._loadBlogList(0)
  },
  onPublish(){
    //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限，根据是否具有scop.userInfo属性，判断用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log('当前设置' + JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          this.setData({
            modalShow: true,
          })
        }
      }
    })
  },
  onLoginSuccess(event) {
    console.log('>>>>>' + event)
    const detail = event.detail
    console.log(detail)
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  onLoginFail() {
    wx.showModal({
      title: '授权用户可发布',
      content: ''
    })
  },
  goDetail(event){
    wx.navigateTo({
      url: '../../pages/blog-detail/blog-detail?blogId='+event.target.dataset.blogid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      blogs:[]
    })
    this._loadBlogList();
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
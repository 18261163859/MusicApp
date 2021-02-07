// miniprogram/pages/publish/publish.js
const MAX_WORDS_LENGTH=140
const MAX_IMG_LENGTH=9
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //最大字数
    maxWordsLength:MAX_WORDS_LENGTH,
    //最大图片数
    maxImgsLength:MAX_IMG_LENGTH,
    //图片地址
    images:[
      'https://s-moses.oss-cn-hangzhou.aliyuncs.com/bgPicture/david-von-diemar-eLgKkKAnA4g-unsplash.jpg',
      'https://s-moses.oss-cn-hangzhou.aliyuncs.com/bgPicture/demian-tejeda-benitez-71LzirTPurQ-unsplash.jpg',
      'https://s-moses.oss-cn-hangzhou.aliyuncs.com/bgPicture/denys-nevozhai-Tix_89QaKVY-unsplash.jpg'
    ],
    //当前字数
    wordsNum:0,
    //当前图片数
    imgsNum:3,
    //textarea的内容
    editValue:''
  },
  //textarea内容改变事件
  onInput(e){
    //获取输入的内容
    let val=e.detail.value
    //获取输入内容的长度
    let length=val.length
  
    this.setData({
      //若输入的内容长度超出最大长度则截取最大长度内的内容重新赋值
      editValue:length>MAX_WORDS_LENGTH?val.substring(0,140):val,
      wordsNum:length
    })
    //若输入的内容长度达到最大长度则吐丝提示
    if(length>=MAX_WORDS_LENGTH){
      wx.showToast({
        title: '最大字数限制为140哦~',
        icon:'none'
      })
    }
  },
  //添加图片
  addImg(){
    //获取可添加的图片数量
    let ableImgsCount=MAX_IMG_LENGTH-this.data.imgsNum
    //备份作用域
    let _this=this
    //调用接口
    wx.chooseImage({
      // 最多可以选择的图片张数
      count: ableImgsCount,
      //接口调用成功的回调函数
      success:function(res){
        console.log(res)
        //获取所有选择的图片（数组）
        let imgs=res.tempFilePaths
        //获取data里的images数组
        let dataImgs=_this.data.images
        //遍历push
        imgs.forEach(e=>{
          dataImgs.push(e)
        })
        //push完添加到data里
        _this.setData({
          images:dataImgs,
          imgsNum:dataImgs.length
        })
      }
    })
  },
  //删除图片
  delImg(e){
    //获取要删除图片的索引
    let delImgIndex=e.target.dataset.index
    //根据索引在images数组里删除
    let dataImages=this.data.images
    dataImages.splice(delImgIndex,1)
    //赋值
    this.setData({
      images:dataImages
    })
  },
  //预览图片
  prevImg(e){
    //获取要预览图片的索引
    let prevImgIndex=e.target.dataset.index
    //备份作用域
    let _this=this
    wx.previewImage({
      urls: _this.data.images,
      current:_this.data.images[prevImgIndex]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
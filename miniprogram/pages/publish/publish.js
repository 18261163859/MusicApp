// miniprogram/pages/publish/publish.js
//最大字数
const MAX_WORDS_LENGTH=140
//最大图片数
const MAX_IMG_LENGTH=9
//云数据库
const db=wx.cloud.database()
//当前用户信息
let userInfo={}
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
    images:[],
    //当前字数
    wordsNum:0,
    //当前图片数
    imgsNum:0,
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
      images:dataImages,
      imgsNum:--this.data.imgsNum
    })
  },
  //预览图片
  prevImg(e){
    //获取要预览图片的索引
    let prevImgIndex=e.target.dataset.index
    //备份作用域
    let _this=this
    //调用接口
    wx.previewImage({
      urls: _this.data.images,
      current:_this.data.images[prevImgIndex]
    })
  },
  toBack(){
    wx.navigateBack()
  },
  send(){
    //若输入内容为空
    if(this.data.editValue.trim().length===0){
      wx.showModal({
        title:'请输入内容',
        content:''
      })
    } 
    wx.showLoading({
      title:'发布中',
      mask:true
    })

    //promise任务数组
    let promiseArr=[]
    //文件id数组
    let fileIdArr=[]
    //遍历创建promise
    for(let i=0;i<this.data.images.length;i++){
      let p=new Promise((resolve,reject)=>{
        let imgFilePath=this.data.images[i]
        //获取到图片的后缀名(.xxx)
        let suffix=imgFilePath.substr(imgFilePath.lastIndexOf('.'))
        //调用云数据库接口
        wx.cloud.uploadFile({
          //云中存放的地址(使用时间缀避免重复)
          cloudPath:'blog/'+Date.now()+'-'+Math.random()*1000000+suffix,
          //要存放的文件地址
          filePath: imgFilePath,
          //成功
          success:res=>{
            //将fileIDpush到数组里
            fileIdArr.push(res.fileID)
            //标记成功
            resolve()
          },
          //失败
          fail:err=>{
            console.log(err)
            //标记失败
            reject()
          }
        })
      })
      //Promise push到数组
      promiseArr.push(p)
    }

    //添加到database
    Promise.all(promiseArr).then(res=>{
      db.collection('blog').add({
        data:{
          ...userInfo,
          content:this.data.editValue,
          imgs:fileIdArr,
          createTime:db.serverDate()
        }
      })
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '发布成功',
      })
      wx.switchTab({
        url: '../find/find',
        success:function(e){
          var page=getCurrentPages().pop()
          page.onLoad()
        }
      })
      
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: '发布失败：'+err,
      })
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success:res=>{
        console.log(res)
        let user={
          nickName:res.userInfo.nickName,
          avatarUrl:res.userInfo.avatarUrl
        }
        userInfo=user
      },
      fail:err=>{
        console.log(err)
      }
    })
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
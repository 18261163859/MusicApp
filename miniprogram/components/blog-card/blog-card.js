// components/blog-card/blog-card.js
import formatTime from '../../utils/formatTime.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog:Object,
    isDetail:{
      type:Boolean,
      value:false
    }
  },
  observers:{
    ['blog.createTime'](val){
      if(val){
        this.setData({
          _createTime:formatTime(new Date(val))
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(e){
      wx.previewImage({
        urls: this.properties.blog.imgs,
        current:e.target.dataset.imgsrc
      })
    },
    goDetail(){
      this.triggerEvent('goDetail')
    }
  }
})

// components/navbar/navbar.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bgStyle:{
      type:String
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

  },

  attached(){
    var _this=this;
    var rect =wx.getMenuButtonBoundingClientRect();
    this.setData({
      rectHeight:rect.height+'px'
    })
    wx.getSystemInfo({
      success: function success(res) {
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        var statusBarHeight=res.statusBarHeight;
        var topBarHeight=ios ? (44 + statusBarHeight) : (48 + statusBarHeight);
        var innerWidth=wx.getMenuButtonBoundingClientRect().left
        var innerPaddingRight=res.windowWidth-innerWidth
        _this.setData({
          ios:ios,
          topBarHeight:topBarHeight,
          statusBarHeight:statusBarHeight,
          innerWidth:'width:'+innerWidth+'px',
          innerPaddingRight:'padding-right:'+innerPaddingRight+'px',
          contentWidth:innerWidth-(innerPaddingRight)+'px'
        })
      }
    })
  }
})

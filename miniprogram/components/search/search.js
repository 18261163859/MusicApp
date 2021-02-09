// components/search/search.js
let keyword=''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:'请输入关键字'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e){
      keyword=e.detail.value
    },
    onFocus(e){
      this.setData({
        inputValue:''
      })
      keyword=''
    },
    onSearch(){
      this.triggerEvent('search',{
        keyword
      })
    }
  }
})

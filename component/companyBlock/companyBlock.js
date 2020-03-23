
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    list: {            // 属性名
      type: Object,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {}     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  data: {

  },
  isShow: false,

  methods:{
    onShoweded() {
      console.log(this.data.isShow)
      let isShow = !this.data.isShow
      this.setData({
        isShow

      })
    },
    //图片预览功能
    imgPreview(e) {
      let images = e.currentTarget.dataset.urls;
      let urls=[];
      let index = e.currentTarget.dataset.index
      images.forEach((item, index) => {
        urls[index] = "http://img.rosssss.top/" + item;
      });
      
      wx.previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls// 需要预览的图片http链接列表
      })
    }
  }
})
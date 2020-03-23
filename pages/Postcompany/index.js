// pages/Postcompany/index.js
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {

    },
    ules: [{
      name: 'title',
      rules: { required: true, message: '必填写项' },
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  titleBlur(){
        this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showToast({
          title: '校验通过'
        })
      }
    })
  },
  formInputChange(e) {

  
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
    console.log(this.data)
  },
  //文本域
  charChange(e) {
    if (e.detail && e.detail.value.length > 0) {
      this.setData({
        [`formData.content`]: e.detail.value
      });
    } else {
      this.setData({
        [`formData.content`]: ''
      });

    }
    console.log(this.data)
  },
  //提交
  async submitForm() {
    let token = wx.getStorageSync('token');
    console.log(token)
    this.setData({
      [`formData.token`]: token
    });
    const res = await request({
      url: '/job/save-job-record',
      method: 'post',
      data: this.data.formData
    })
    console.log(res)
  }
})
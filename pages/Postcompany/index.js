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
    files: [{
      url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
    }],
    rules: [{
      name: 'title',
      rules: { required: true, message: '必填写项' },
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  //获取焦点
  onbindfocus(e) {
    
    this.setData({
      bottom: e.detail.height,
    })
  },
  titleBlur() {
    this.setData({
      bottom: '0px',
    })
    this.selectComponent('#form').validate((valid, errors) => {
      // console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
        wx.showToast({
          icon:'none',
          title: '公司名称不能为空'
        })
      }
      //  else {
      //   wx.showToast({
      //     title: '校验通过'
      //   })
      // }
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
  },
//上传图片   
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
 uplaodFile(files) {
        console.log('upload files', files)
        // 文件上传的函数，返回一个promise
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('some error')
            }, 1000)
        })
    },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  }
})
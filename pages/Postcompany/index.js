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
  onLoad() {
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
          icon: 'none',
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
  async  charChange(e) {

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
//文本域获取焦点事件
  contentFocus(e) {
    this.setData({
      bottom: e.detail.height,
    })
  },
  //文本域失焦事件
  contentBlur() {
    this.setData({
      bottom: '0px',
    })
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
  chooseImage: function (e) {
    var that = this;
    pics = this.data.files;
    if (pics.length < 3) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }
          console.log(pics);
          that.setData({
            pics: pics
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none',
        duration: 3000
      });

    }
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  async uplaodFile(files) {
    let token = wx.getStorageSync('token');
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      var tempFilePaths = files.tempFilePaths;
      //上传返回值
      var app = getApp();
      var that = this;
      that.setData({
        urlArr: [], //这用来存放上传多张时的路径数组
      });
      var object = {};
      for (var i = 0; i < tempFilePaths.length; i++) {
        const upload_task = wx.uploadFile({
          // 模拟https
          url: 'https://fengjunhao.top/v1/qi-api/upload-img', //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
          filePath: files.tempFilePaths[i], //上传的文件本地地址    
          name: 'file',
          //附近数据，这里为路径     
          success: function (res) {
            var images = that.data.images;
            var data = JSON.parse(res.data);
            if (data.status == "ok") {
              var url = data.url
              that.setData({
                urlArr: that.data.urlArr.concat(app.globalData.zzbHttp + url), //拼接多个路径到数组中
              });
              object['urls'] = that.data.urlArr;
              that.setData({
                images: images + data.url + ";", //images用来存放路径字符串，保存到数据库中的是这个，用“;”分割，但是返回的路径没有“;”，就自己拼上了
              });
              console.log("urlArr:" + that.data.urlArr.length + ";;" + (tempFilePaths.length))
              console.log(that.data.images);
              if (that.data.urlArr.length == tempFilePaths.length) {
                resolve(object)  //这就是判断是不是最后一张已经上传了，用来返回，

              }

            } else {
              reject(res)

            }

          },
          fail: function (err) {
            console.log(err)

          }
        })

      }

    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  }
})
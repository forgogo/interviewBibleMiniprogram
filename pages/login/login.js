// pages/user/index.js、
import { request } from '../../request/index.js'
import {
  login
} from '../../utils/api.js';
Page({

  data: {
    userInfo: {}
  },
  // 登录功能
  async  handelLogin(e) {
    try { //解构出 请求需要的参数
      console.log(e.detail)
      const { encryptedData, rawData, iv, signature, userInfo } = e.detail;
      wx.setStorageSync("userInfo", userInfo);
      this.setData({
        userInfo
      })
      //使用wx.login()方法后，要到取到code值传到后台,
      const { code } = await login();
      console.log(code)
      const loginParams = { encryptedData, rawData, iv, signature, code }
      //发送请求 获取token
      const getToken= await request({
        method: 'post',
        url: "/user/wxlogin",
        data: loginParams
      })
      let token = getToken.data.data;
      wx.setStorageSync("token", token)
    }
    catch (error) {
      console.log(error);
    }
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo") || [];
    this.setData({
      userInfo
    })
  }
})
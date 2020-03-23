// 封装微信请求
let ajaxTimes=0;
export const BASE_URL ='https://fengjunhao.top/v1';
export const request = (params) =>{
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask:true,
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      //把接收到的对象 结构出来
      ...params,
      url:BASE_URL+params.url,
      success:(result)=>{
        resolve(result)
      },
      fail:(error)=>{
        reject(error)
      },
      complete:()=>{
        ajaxTimes--;
        // 关闭正在等待的图标
        if (ajaxTimes == 0) { wx.hideLoading(); }
      }
    })
  })
}
Page({
  data:{
    imgUrl1:null,
    imgUrl2:null,
    imgUrl3:null,
    imgUrl4:null,
    imgUrl5:null,
    imgUrl6:null,
    imgUrl7:null,
    imgUrl8:null,
    imgUrl9:null,
    imgUrl0:null,
    
  },
 
  onLoad:function(){
    this.setData({
      imgUrl1:wx.getStorageSync('imgUrl1') ,                  //读取之前存储的图片
      imgUrl2:wx.getStorageSync('imgUrl2') ,
      imgUrl3:wx.getStorageSync('imgUrl3') ,
      imgUrl4:wx.getStorageSync('imgUrl4') ,
      imgUrl5:wx.getStorageSync('imgUrl5') ,
      imgUrl6:wx.getStorageSync('imgUrl6') ,
      imgUrl7:wx.getStorageSync('imgUrl7') ,
      imgUrl8:wx.getStorageSync('imgUrl8') ,
      imgUrl9:wx.getStorageSync('imgUrl9') ,
      imgUrl0:wx.getStorageSync('imgUrl0') ,
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../choose/choose',  //跳转至choose页面
    })
  }
})
Page({
  data:{
  },
  up: function () {
    wx.navigateTo({
      url: '../up/up',    //跳转至up页面
    })
  },
  down: function () {
    wx.navigateTo({
      url: '../down/down',    //跳转至down页面
    })
  },
})
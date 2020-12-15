Page({
  data:{
    result:"",
    up:null,
    down:null,
  },
  
  onLoad : function () {
      var chars = ['0', '6', '7', '8', '9', ];                                          //利用随机数生成来随机选择一条裤子
      var num = "";           
      var id = parseInt(Math.random() * 4);      
      num = chars[id];
      while(wx.getStorageSync('imgUrl'+num)){                                              //当随机选到的裤子存在时
        for(var i=1;i<6;i++){
          if(wx.getStorageSync('color'+i+'R')+(wx.getStorageSync('color'+(num)+'R')-wx.getStorageSync('color'+i+'R'))/2<100){    //判断衣物颜色是否为邻近色，
            this.setData({                                                                                     //考虑到大多数人的衣柜不是五颜六色的，这里只取了RGB数值中的R值来比较
              up:wx.getStorageSync('imgUrl'+i),
              down:wx.getStorageSync('imgUrl'+num),
              result:"邻近色可以保持色彩的画面统一与协调,给人以单纯，稳定、温和的感觉哦"
           })
        }
         else if(wx.getStorageSync('color'+i+'R')+(wx.getStorageSync('color'+(num)+'R')-wx.getStorageSync('color'+i+'R'))/2>200){//判断衣服颜色是否为相对色
           this.setData({                                                                                     
             up:wx.getStorageSync('imgUrl'+i),
             down:wx.getStorageSync('imgUrl'+num),
             result:"对比色效果鲜明，饱满，容易给人带来兴奋，激动的快感，能够吸引人的目光哦"
           })
         }
        }
        if(!this.data.up){                                                                                           //全部都不是的话
            this.setData({                                                                                           //就选第一件上衣吧ww
              up:wx.getStorageSync('imgUrl1'),
              down:wx.getStorageSync('imgUrl'+num),
              result:"衣柜里的颜色太少了，妨碍到你散发魅力了哦"
            })
          }
      }
  }                        
}) 
//网传利用RGB数值计算邻近色，对比色的公式
//RStep1=RA=RA+(BA-RA)/Step*N=200+(50-200)/3*1=200-50=150
//GStep1=GA=GA+(GA-GA)/Step*N=50+(200-50)/3*1=50+50=100
//BStep1=BA=BA+(BA-BA)/Step*N=0
  


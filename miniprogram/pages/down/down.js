Page({
  data:{
    
    tempFilePaths:null,
    appkey:"APPKEY",
    timestamp:"",
    sign:"",
    base:"",
    base64:"",
    timeStamp:"",
    color:"",

  },
  onLoad: function () {
    var that=this
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: (res) => {
        if (res.cancel) {
          return;
        }
        if (res.tapIndex == 0) {
          this.chooseWxImage('album')
        } 
        else if (res.tapIndex == 1) {
          this.chooseWxImage('camera')
        }
      }
    })

  },
  chooseWxImage: function (type) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: (res) => {
        console.log(res)
        this.setData({
          tempFilePaths: res.tempFilePaths,
          base:wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"),
        })
      if (this.data.base) {
        var base=this.data.base
        var base64 = base.replace("\r\n","").replace("\n","");
        this.setData({
          base64:"content="+base64
        })
      }
      }
    })
  },
  read: function () {
    var that=this;
    if(!this.data.tempFilePaths) {
      return ;
    }
    else{
      let timestamp = Date.parse(new Date());
      that.setData({
        timestamp:timestamp,

      })
          wx.cloud.uploadFile({
            // 指定上传到的云路径
             cloudPath: timestamp + '.png',
            // 指定要上传的文件的小程序临时文件路径
            filePath: that.data.tempFilePaths[0],
            // 成功回调
            fail(res) { console.log(res) },
          
            success: res => {
              console.log('上传成功', res)
              if (res.fileID) {
                if(!wx.getStorageSync('imgUrl6')){
                  wx.setStorageSync('imgUrl6',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl7')){
                  wx.setStorageSync('imgUrl7',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl8')){
                  wx.setStorageSync('imgUrl8',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl9')){
                  wx.setStorageSync('imgUrl9',res.fileID );
                }
              }
            }
          })
          function random(length) {
            var str = Math.random().toString(36).substr(2);
            if (str.length>=length) {
                return str.substr(0, length);
            }
            str += random(length-str.length);
            return str;
        }
          var utilMd5 = require('../../utils/MD5.js');                               //选择MD5哭
          var timeStamp = utilMd5.hexMD5("SECRETKEY"+timestamp);        //调用MD5库进行签名的加密
          var appkey="APPKEY"
          wx.request({
            url: 'https://aiapi.jd.com/jdai/extract_img_colors?appkey=b5a329c936a7f3446a498eacc0bd14ca&timestamp='+timestamp+'&sign='+timeStamp,
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              image:"content="+wx.getFileSystemManager().readFileSync(that.data.tempFilePaths[0], "base64").replace("\r\n","").replace("\n","").replace("\r",""),    //转化图片的base64编码并去掉换行符
              color_count:1,                                         //只请求第一个主要颜色，即占比最大的颜色
            },
            success(res){
              console.log(res)
              if(wx.getStorageSync('imgUrl6')){
                wx.setStorageSync('color6R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl7')){
                wx.setStorageSync('color7R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl8')){
                wx.setStorageSync('color8R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl9')){
                wx.setStorageSync('color9R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl0')){
                wx.setStorageSync('color0R',res.data.result.color_list);
              }
              that.setData({
                color:res.data.result.color_list                      //在界面上显示颜色RGB参数
              })

            }              
          })
          
    }
    
  },
})
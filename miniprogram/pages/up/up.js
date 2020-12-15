Page({
  data:{
    
    tempFilePaths:null,
    appkey:"APPKEY",
    timestamp:"",
    sign:"",
    base:"",
    base64:"",
    timeStamp:"",

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
          base:wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"),    //生成图片的base64编码
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
                if(!wx.getStorageSync('imgUrl1')){                         //将新图片储存
                  wx.setStorageSync('imgUrl1',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl2')){
                  wx.setStorageSync('imgUrl2',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl3')){
                  wx.setStorageSync('imgUrl3',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl4')){
                  wx.setStorageSync('imgUrl4',res.fileID );
                }
                else if(!wx.getStorageSync('imgUrl5')){
                  wx.setStorageSync('imgUrl5',res.fileID );
                }
              }
            }
          })
          function random(length) {                             //生成随机数的函数，方便后面调用API时生成签名
            var str = Math.random().toString(36).substr(2);
            if (str.length>=length) {
                return str.substr(0, length);
            }
            str += random(length-str.length);
            return str;
        }
          var utilMd5 = require('../../utils/MD5.js');

          var utilMd5 = require('../../utils/MD5.js');                                         //调用MD5
          var timeStamp = utilMd5.hexMD5("SECRETKEY"+timestamp);        //使用MD5加密签名
          var appkey="APPKEY"
          wx.request({
            url: 'https://aiapi.jd.com/jdai/extract_img_colors?appkey=b5a329c936a7f3446a498eacc0bd14ca&timestamp='+timestamp+'&sign='+timeStamp,
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              image:"content="+wx.getFileSystemManager().readFileSync(that.data.tempFilePaths[0], "base64").replace("\r\n","").replace("\n","").replace("\r",""),     //生成图片的base64编码并去掉其中的换行符
              color_count:1,                                  //只读取第一个主要颜色，即占比最大的颜色
            },
            success(res){
              console.log(res)
             if(wx.getStorageSync('imgUrl1')){                                    //储存返回的结果
                wx.setStorageSync('color1R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl2')){
                wx.setStorageSync('color2R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl3')){
                wx.setStorageSync('color3R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl4')){
                wx.setStorageSync('color4R',res.data.result.color_list);
              }
              else if(wx.getStorageSync('imgUrl5')){
                wx.setStorageSync('color5R',res.data.color_list);
              }
              that.setData({
                color:res.data.result.color_list                      //在界面上显示颜色RGB参数
              })

            }            
          })
          
    }
    
  },
})
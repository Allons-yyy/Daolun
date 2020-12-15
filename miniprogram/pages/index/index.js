Page({
  data:{
    weatherData: "",
    inside:""
  },
  onLoad:function(){
    var that=this
    wx.request({
      url: 'https://tianqiapi.com/api?version=v6&appid=37112667&appsecret=8gsMJrU8',
      method:'GET',      
      success: function (res) {
        console.log(res.data)
        that.setData({
          weatherData:"室外温度为"+res.data.tem
        })
      }
    })
    const devicesId = "644369879" 
    const api_key = "OD4=FOoAts2J9ilgfFMJIJrwz4E=" 
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Humidity&limit=20`,
        /**
         * 添加HTTP报文的请求头, 
         * 其中api-key为OneNet的api文档要求我们添加的鉴权秘钥
         * Content-Type的作用是标识请求体的格式, 从api文档中我们读到请求体是json格式的
         * 故content-type属性应设置为application/json
         */
        header: {
          'content-type': 'application/json',
          'api-key': api_key
        },
        success: (res) => {
          console.log(res)
          const status = res.statusCode
          const response = res.data
          if (status !== 200) { // 返回状态码不为200时将Promise置为reject状态
            reject(res.data)
            return ;
          }
          if (response.errno !== 0) { //errno不为零说明可能参数有误, 将Promise置为reject
            reject(response.error)
            return ;
          }

          if (response.data.datastreams.length === 0) {
            reject("当前设备无数据, 请先运行硬件实验")
          }
          this.setData({
            inside:"室内温度为"+response.data.datastream[0].datapoints.reverse()
          })

          //程序可以运行到这里说明请求成功, 将Promise置为resolve状态
          resolve({
            temperature: response.data.datastreams[0].datapoints.reverse(),
            humidity: response.data.datastreams[1].datapoints.reverse()
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

  },
  output: function () {
    wx.navigateTo({
      url: '../output/output',  //跳转至output页面
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../add/add',    //跳转至add页面
    })
  },
  chat: function () {
    wx.navigateTo({
      url: '../chat/chat',    //跳转至add页面
    })
  }

})
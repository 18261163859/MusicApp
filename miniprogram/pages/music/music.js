// audio.js
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    imgUrls:[
      {
        url:'http://p1.music.126.net/nVUH7O5ZNMG1OQ1kE-tq9g==/109951165665595417.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/SLfispSeeEnb6Ezs0cNjBw==/109951165666128356.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
      },
      {
        url:'http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89'
      }
    ],
    playlist:[
      {
        "id":"1001",
        "playCount":"99014万",
        "name":"[华语速爆新歌] 那英×姚晨首度联手合唱",
        "picUrl":"http://p1.music.126.net/qfKmb5grEFZNTGYKIONg1A==/109951165664253358.jpg?param=140y140"
      },
      {
        "id":"1002",
        "playCount":"10万",
        "name":"随情节流淌|富有叙事感的柔软音乐片段",
        "picUrl":"http://p1.music.126.net/1hzImIzOsRzG0iBSvHOO7w==/109951165511341127.jpg?param=140y140"
      },
      {
        "id":"1003",
        "playCount":"494万",
        "name":"我试着把孤独藏进耳机",
        "picUrl":"http://p1.music.126.net/Xvo6PwBcdOA69ipcpV9YYg==/109951165463253777.jpg?param=140y140"
      },
      {
        "id":"1004",
        "playCount":"1855",
        "name":"谷阿莫：5分钟听完电影《最普通的恋爱》",
        "picUrl":"http://p1.music.126.net/G8lutIIOcFVwMgR5O9HcSg==/109951165663415422.jpg?param=140y140"
      },
      {
        "id":"1005",
        "playCount":"239万",
        "name":"【翻/原】温柔不是我说 而是你觉得.",
        "picUrl":"http://p1.music.126.net/PJylNWy_2-jI7LRgQ2Cm6w==/109951165649129522.jpg?param=140y140"
      },
      {
        "id":"1006",
        "playCount":"15362",
        "name":"#祸祸外传# 11 花花 一首写给未来孩子的歌",
        "picUrl":"http://p1.music.126.net/upYxTEuAB9dqqvu2hYlNzg==/109951165663956064.jpg?param=140y140"
      }
    ]
  }

})
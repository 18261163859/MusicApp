// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  evn:'moses-9gbipm1jbb2d2f9f'
})

const db=cloud.database()

const playlistColllection=db.collection('playlist')

const axios=require('axios')

const URL='http://wyyyy.cn.utools.club/top/playlist/highquality?before=1503639064232&limit=20'

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    data
  }=await axios.get(URL)
  console.log('######'+JSON.stringify(data))

  if(data.code>=1000){
    console.log(data.msg)
    return 0
  }
  const playlist=data.playlists

  const newData=[]

  //给每一条数据加上时间，并添加到newData数组里
  for(let i=0,len=playlist.length;i<len;i++){
    let pl=playlist[i]
    pl.createTime=db.serverDate()
    newData.push(pl)
  }

  if(newData.length>0){
    await playlistColllection.add({
      data:[...newData]
    }).then((res)=>{
      console.log('插入成功')
    }).catch(err=>{
      console.log('插入失败')
    })
  }
  return newData.length

}
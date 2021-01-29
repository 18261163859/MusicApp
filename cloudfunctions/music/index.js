// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'moses-9gbipm1jbb2d2f9f'
})

const TcbRouter=require('tcb-router')
const axios=require('axios')
const BASE_URL='https://wyyyy.cn.utools.club'

// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({
    event
  })

  // const a=await cloud.database().collection('playlist').skip(event.start)
  // .limit(event.count)
  // .orderBy('createTime','desc').get()
  // console.log(a.data)
  // return a.data

  app.router('playlist',async(ctx,next)=>{
    ctx.body=await cloud.database().collection('playlist')
    .skip(event.start)
    .limit(event.count)
    .orderBy('createTime','desc')
    .get()
    .then(res=>{
      return res
    })
  })

  app.router('musiclist',async(ctx,next)=>{
    const res=await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`)
    ctx.body=res.data
  })

  app.router('musicUrl',async(ctx,next)=>{
    const res=await axios.get(`${BASE_URL}/song/url?id=${event.musicId}`)
    ctx.body=res.data
  })

  return app.serve()
}
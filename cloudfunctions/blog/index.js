// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
  {
  env: 'moses-9gbipm1jbb2d2f9f'
  }
)

const TcbRouter=require('tcb-router')
const db=cloud.database()
const blogCollection=db.collection('blog')

// 云函数入口函数
exports.main = async (event, context) => {
  const app=new TcbRouter({
    event
  })

  app.router('list',async (ctx,next)=>{

    const keyword=event.keyword
    let w={}
    if(keyword.trim()!=''){
      w={
        content:new db.RegExp({
          regexp:keyword,
          options:'i'
        })
      }
    }

    let blogList=await blogCollection.where(w).skip(event.start).limit(event.count)
    .orderBy('createTime','desc').get().then(res=>{
      console.log('##########'+res.data)
      return res.data
    }).catch(err=>{
      console.log('&&&&&&&'+err)
    })
    ctx.body=blogList
  })

  app.router('detail',async (ctx,next)=>{
    let blogId=event.blogId
    console.log('$$$$$$'+blogId)
    const blog=await blogCollection.aggregate().match({
      _id:blogId
    }).lookup({
      from:'blog-comment',
      localField:'_id',
      foreignField:'blogId',
      as:'commentList'
    }).end()
    ctx.body=blog
  })

  return app.serve()
}
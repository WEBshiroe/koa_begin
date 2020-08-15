const Koa = require('koa')
// 引入router
const Router = require('koa-router')
//  引入koa-art -template
const render = require('koa-art-template')
// 引入path模块
const path = require('path')
// 实例化
const app = new Koa()
const router = new Router()
// 配置第三方中间件
// 配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),  // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production'   // 是否开启调试模式
  });


router.get('/',async (ctx, next)=>{
    // 视图数据
    let data = 'hello art-tempalte'
    // 渲染
    await ctx.render('index',{
        data:data
    })
})


router.get('/news',async (ctx)=>{
    ctx.body = '新闻'
})



app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
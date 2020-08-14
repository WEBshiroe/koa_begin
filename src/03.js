const Koa = require('koa')
// 引入router
const Router = require('koa-router')
const app = new Koa()
// 实例化router
const router = new Router()
// 配置路由
router.get('/',async (ctx, next)=>{
    ctx.body = 'home'
}).get('/news',async (ctx, next)=>{
    ctx.body ='news'
})
// 获取get传值
router.get('/newcontent',async (ctx, next)=>{
    //  从上下文中获取
    console.log(ctx.query)  //获取get传值是对象
    console.log(ctx.querystring)  //获取的是字符串
    console.log(ctx.url) //获取url
    // 从上下文中的request中获取
    console.log(ctx.request)  //获取请求的信息，包括方式，url等
    console.log(ctx.request.method,ctx.request.url)
    console.log(ctx.request.query) // 获取get传值是对象
    console.log(ctx.request.querystring)
    

    ctx.body = 'newcontent'
})

app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
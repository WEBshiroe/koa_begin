const Koa = require('koa')
// 引入router
const Router = require('koa-router')
const app = new Koa()
// 实例化router
const router = new Router()


// 配置路由
router.get('/',async (ctx, next)=>{
    ctx.body = 'home'
})

router.get('/news',async (ctx, next)=>{
    ctx.body = 'news'
})
router.get('/newscontent',async (ctx, next)=>{
    ctx.body ='newscontent'
})

app.use(async (ctx,next)=>{
    console.log('这是一个错误处理中间件')
    next()
    if(ctx.status == 404){
        ctx.status = 404
        ctx.body = '404 not found'
    }else{
        console.log(ctx.url)
    }
})

app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
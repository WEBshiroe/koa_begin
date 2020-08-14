const Koa = require('koa')
// 引入router
const Router = require('koa-router')
const views= require('koa-views')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
// 实例化router
const router = new Router()

app.use(views(__dirname + '/views', {map: {html: 'ejs'}}))

router.get('/',async (ctx, next)=>{
    // 渲染
    await ctx.render('index.html')
})
// 获取表单数据
router.post('/doAdd',async (ctx)=>{
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
})



app
// 配置bodyparser
    .use(bodyParser())
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
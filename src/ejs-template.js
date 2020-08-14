const Koa = require('koa')
// 引入router
const Router = require('koa-router')
// 引入koa-views
const views = require('koa-views')


const app = new Koa()
// 实例化router
const router = new Router()
// 配置第三方中间件
// 配置模板引擎
// app.use(views(__dirname + '/views', {map: {html: 'ejs'}})) 这样定义可以将html文件结尾改为 .html,下面必须以.ejs结尾
app.use(views(__dirname + '/views',{
    extension: 'ejs'  //应用ejs模板引擎
}))


router.get('/home',async (ctx, next)=>{
    // 渲染
    let title = 'hello ejs'
    await ctx.render('home',{
        title:title
    })
})

app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
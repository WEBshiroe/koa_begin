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
    // 设置cookie
    /*
    第一第二个参数
    key，value
    set第三个参数说明
        maxAge
        expires
        path  cookie路径，默认 '/'
        domain   cookie域名
        secure  安全cookie，默认false，设置true表示https可以访问
        httpOnly 是否只是服务器可以访问cookie，默认true
        
    */ 
    ctx.cookies.set('indexInfo','peter',{
        maxAge: 6*1000*10, // 过期的毫秒数，表示从Date.now()得到的毫秒数(60秒之后过期)
    })
    // 视图数据
    let data = 'hello art-tempalte'
    // 渲染
    await ctx.render('index',{
        data:data
    })
})


router.get('/news',async (ctx)=>{
    let getIndexInfo = ctx.cookies.get('indexInfo')
    console.log(getIndexInfo)
    ctx.body = '新闻'
})



app
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
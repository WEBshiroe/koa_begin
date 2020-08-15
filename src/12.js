const Koa = require('koa')
// 引入router
const Router = require('koa-router')
const views= require('koa-views')
const bodyParser = require('koa-bodyparser')
// 引入koa-session
 const session = require('koa-session');
const app = new Koa()
// 实例化router
const router = new Router()

app.use(views(__dirname + '/views', {map: {html: 'ejs'}}))

// 配置session中间件
app.keys = ['some secret hurr'];  //cookies签名
const CONFIG = {
  key: 'koa.sess',  /* 默认 */
  maxAge: 86400000, /* 过期时间 */
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /* 默认 */
  httpOnly: true, /** 是否只是服务器可以访问cookie，默认true */
  signed: true, /** default true */
  rolling: false, /** 每次访问设置session的页面是否从新设置session，即覆盖上一个session */
  renew: false, /** 每次请求时强行设置cookie，浙江重置cookie过期时间，默认false*/
  secure: false, /** 安全cookie，默认false，设置true表示https可以访问 */
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
}



router.get('/',async (ctx, next)=>{
    // 设置session
    ctx.session.userinfo = '张三'
    // 渲染
    let data = 'hello'
    await ctx.render('index.html',{
        data:data
    })
})
// 获取表单数据
router.get('/news',async (ctx)=>{
    console.log(ctx.session.userinfo)
    ctx.body = 'hello'
})



app
    .use(session(CONFIG,app))  //挂载session
    .use(bodyParser()) // 配置bodyparser
    .use(router.routes()) // 启动路由
    .use(router.allowedMethods()) //router.allowedMethods() 如果前面没有设置响应头，则这里会根据ctx.status 设置response响应头

// 监听端口
app.listen(3000,()=>console.log('监听3000端口'))
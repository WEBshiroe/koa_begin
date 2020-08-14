// 引入koa
const Koa = require('koa')
// 实例化
const app = new Koa()
// 中间件
app.use( async (ctx)=>{
    ctx.body = 'hello koa'
})

// 监听端口
app.listen(3000,()=>console.log('3000端口监听成功'))
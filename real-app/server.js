const Koa = require('koa')
const serve = require('koa-static')
const app = new Koa();

app.use(serve(__dirname+'/src'))

app.listen(4000, () => {
	console.log('run 4000 port')
})

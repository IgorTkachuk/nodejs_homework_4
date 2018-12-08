// https://www.tutorialspoint.com/koajs/koajs_file_uploading.htm

const Koa = require('koa');
const app =  new Koa();

const router = require('./routers');

const serve = require('koa-static');
const path = require('path');

const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views/pages',
    basedir:  './views/pages',
    debug: false,
    pretty: false,
    app: app
});

const koaBody = require('koa-body');

const session = require('koa-session');
const CONFIG = {
    key: 'koa:sess',
    maxAge: 'session',
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false
};
   
app.use(session(CONFIG, app));

const flash = require('koa-flash-simple');
app.use(flash());

app.use(serve(path.join(__dirname, 'public')));

app.use(koaBody({
    formidable: {
        uploadDir: './public/assets/img/products',
    },
    multipart: true
}));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, function() {
    console.log('Server running on localhost:3000')
});

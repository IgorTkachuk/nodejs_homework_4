const Router = require('koa-router');
const router = new Router();
const skillsCtrl = require('../controllers/skills');
const indexCtrl = require('../controllers/index');
const authCtrl = require('../controllers/auth');
const productsCtrl = require('../controllers/products');

router.get('/', async (ctx, next) => {
    const skills = skillsCtrl.getSkills();
    const products = productsCtrl.getProducts();
    ctx.render('index', {skills, products, msgemail: ctx.flash.get()});
});

router.post('/', async (ctx, next) => {
    indexCtrl.newMsg(ctx.request.body);
    ctx.flash.set('Сообщение принято!');
    ctx.redirect('/');
});

router.get('/admin', async (ctx, next) => {
    if(!ctx.session.isAuth){
        ctx.redirect('/login');
    }

    const msgskill = ctx.flash.get() ? ctx.flash.get().msgskill : null;
    const msgfile = ctx.flash.get() ? ctx.flash.get().msgfile : null;

    const skills = skillsCtrl.getSkills();
    ctx.render('admin', {skills, msgskill, msgfile});
});

router.post('/admin/skills', async (ctx, next) => {
    skillsCtrl.setSkills(ctx.request.body);
    ctx.flash.set( { msgskill: 'All params saved!' });
    ctx.redirect('/admin');
});

router.post('/admin/upload', async (ctx, next) => {
    try {
        productsCtrl.newProduct({...ctx.request.files, ...ctx.request.body});

        ctx.flash.set({ msgfile: 'Added!' });
        ctx.redirect('/admin');
    } 
    catch (err) {
        console.log('err', err);
        err && err.message && ctx.flash.set({msgfile: err.message});
        ctx.redirect('/admin');
    }
});

router.get('/login', async (ctx, next) => {
    if(!ctx.session.isAuth){
        ctx.render('login', { msglogin: ctx.flash.get()});
    } else {
        ctx.redirect('/admin');
    }
    
});

router.post('/login', async (ctx, next) => {
    if (authCtrl.auth(ctx.request.body)){
        ctx.session.isAuth = true;
        ctx.redirect('/admin');
    } else {
        ctx.flash.set('Unathorized!');
        ctx.redirect('/login');
    }

});

module.exports = router;
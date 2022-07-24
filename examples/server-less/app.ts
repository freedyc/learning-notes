import { createContainer, Lifetime } from 'awilix';
import path from 'path';
import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import historyApiFallback from 'koa-connect-history-api-fallback'
const app = new Koa();

app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false,
}));

app.use(serve(path.join(__dirname, 'assets')))

const container = createContainer();

container.loadModules([path.join(__dirname, 'services', "*.ts")], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
});

app.use(scopePerRequest(container));

app.use(historyApiFallback({ index: '/', whiteList: ['/api']}));

app.use(loadControllers(`${__dirname}/routes/*.ts`))


app.listen(3000, () => { console.log('start 3000')})
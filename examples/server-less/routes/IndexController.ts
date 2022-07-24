import { GET, route } from "awilix-koa";

@route('')
class IndexController {
    @route('/')
    @GET()
    async actionList(ctx) {
        ctx.body = await ctx.render('index')
    }
}

export default IndexController;
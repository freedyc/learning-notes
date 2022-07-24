import { GET, route } from "awilix-koa";
import { IApi } from "../interfaces/IApi";

@route('/api')
class ApiController {
    private apiService: IApi;
    constructor({apiService}: { apiService: IApi}) {
        this.apiService = apiService;
    }
    @route('/list')
    @GET()
    async actionList(ctx) {
        try {
            const data = await this.apiService.getInfo();
            ctx.body = { title: '列表', data, }
            
        } catch (error) {
            ctx.body = "error data"
        }
    }
}

export default ApiController;
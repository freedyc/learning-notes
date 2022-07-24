import { IApi } from '../interfaces/IApi';
import { IData } from '../interfaces/IData';

class ApiService implements IApi {
    getInfo(): Promise<IData> {
        return new Promise((resolve) => {
            resolve({ title: '数字列表', list: [1,2,3]})
        });
    }
}

export default ApiService
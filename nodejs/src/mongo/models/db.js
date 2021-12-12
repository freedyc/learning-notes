const conf = require('./conf');
const EventEmitter = require('events').EventEmitter;
const { MongoClient } = require('mongodb');

class Mongo {
    constructor(conf) {
        this.conf = conf;
        this.client = new MongoClient(this.conf.url);
        this.emmitter = new EventEmitter();
        this.client.connect((err) => {
            if (err) throw err;
            this.emmitter.emit('connect');
            console.log('连接成功');
        })
    }
    /**
     * 返回集合
     */
    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName)
    }
    /**
     * 用于连接事件
     * @param {*} event 
     * @param {*} cb 
     */
    once(event, cb) {
        this.emmitter.once(event, cb);
    }
}

module.exports = new Mongo(conf);

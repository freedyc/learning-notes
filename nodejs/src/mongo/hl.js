const { MongoClient} = require('mongodb');
(async () => {
    const url = 'mongodb://192.168.0.10:27017';
    const client = new MongoClient(url);
    const ret = await client.connect();
    // console.log(ret);

    const db = client.db('persons');
    const collection = db.collection('documents');
    const insert = await collection.insertMany([
        { name: 'xiaobai', age: 18},
        { name: 'xiaodeng', age: 22},
    ])
    console.log('插入数据 ', insert);

    // 查找数据
    const fdata = await collection.find({});
    console.log("查找数据", await fdata.toArray());

    //删除数据
    const ddata = await collection.deleteMany({ name: 'xiaobai' })
    console.log('ddata', ddata)

    // 更新数据
    await collection.updateOne({ name:'xiaodeng'}, {
        $set: {name: '小贝'}
    })
    client.close();

})()
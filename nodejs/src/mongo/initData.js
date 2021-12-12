const mongo = require('./models/db');

mongo.once('connect', async () => {
    console.log('connect success .... ')
    const collection = mongo.col('marks');
    await collection.deleteMany();

    const data = [...new Array(100).keys()].map((it ) => ({
        name: `KKKK${it}`,
        url: `https://look-${it}`,
        category: '文科'
    }))

    await collection.insertMany(data)
    console.log('插入成功')
})

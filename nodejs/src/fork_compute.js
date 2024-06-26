
const computation = () => {
    let sum = 0;
    console.info('计算开始');
    console.time('计算耗时');
    for (let i = 0; i< 1e10; i++) {
        sum = sum + i;    
    }
    console.info('计算结束');
    console.timeEnd('计算耗时');
    return sum;
}

process.on('message', msg => {
    console.log('子进程处理...', msg, `PID: ${process.pid}`);
    const sum = computation();
    process.send(sum);
});

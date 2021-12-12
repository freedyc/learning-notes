const EventEmitter = require('events').EventEmitter;

class GeekTime extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('catNew', { name: Math.random() });
        }, 3000);
    }
}


const geekTime = new GeekTime();
geekTime.addListener('catNew', (res) => {
    console.log('notify', res);
})
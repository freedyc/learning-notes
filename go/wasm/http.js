const wasmFile = require('path').resolve(__dirname, './http.wasm');

require('./run')(wasmFile, false);

function isIterable(obj) {
    console.log(String(obj), typeof obj[Symbol.iterator] === "function");
    return  typeof obj[Symbol.iterator] === "function";
}


isIterable(new Set());
isIterable(new Map());
isIterable([1,2,3,4]);
isIterable({a:1});



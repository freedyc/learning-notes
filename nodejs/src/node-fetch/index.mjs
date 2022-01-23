import fetch from 'node-fetch';

console.log(fetch);

const baseUrl = 'http://localhost:3003';

const params = new URLSearchParams();

params.append('c', "c-111")

let data = await fetch(`${baseUrl}?a=123`)

console.log(data.headers);

data = await data.json();

console.log(data);

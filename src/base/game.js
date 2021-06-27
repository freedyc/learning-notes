const action = process.argv[process.argv.length - 1];

const random = Math.random() * 3;
let computerAction = 'rock';
if (random > 2) {
    computerAction = 'scissor';
} else if (random > 1) {
    computerAction = 'paper';
}
console.log('你是：' + action, '我是：' + computerAction);

if (computerAction === action) {
    console.log('平局');
    return;
}

if (
    (computerAction === 'rock' && action === 'scissor') ||
    (computerAction === 'scissor' && action === 'paper') ||
    (computerAction === 'paper' && action === 'rock')
) {
    console.log('你输了');
} else {
    console.log('你赢了');
}
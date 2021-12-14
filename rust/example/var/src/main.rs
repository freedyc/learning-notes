const MAX:u32 = 999;
fn main() {
    // 末尾分号必须有
    let a = 1;
    println!("a = {}", a);
    // 通过加 mut 将声明一个可变的变量 
    let mut b = 2;
    println!("b = {}", b);
    b = 100;
    println!("b = {}", b);
    println!("MAX = {}", MAX);
    println!("Hello, world!");
    println!("0.1 + 0.2 = {}", 0.1 + 0.2);

    let a:f32 = 0.1;
    let b:f32 = 0.2;
    let c:f32 = a + b;
    print!("0.1 + 0.2 = {}", c);
}

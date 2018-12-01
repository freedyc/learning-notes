### 迭代器 （iterator)

```
迭代器是一种特殊的对象
对像:
    一个方法: next()
    两个属性： done 和 value 

迭代器可以使用for-of来调用

```
### 生成器 (generator)
```
生成器是一种返回迭代器的函数

function* createIterator() {
    yield ”哈哈“
}

```
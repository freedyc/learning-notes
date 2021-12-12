1. 格式化JSON数据
```
cat data.json | jq
```

2. 取得数组得指定下标得值
```
cat data.json | jq '.resources[0]'
```
3. 返回数组所有数据 []

```
cat data.json | jq ".resources" | jq ".[] | { id: .id}"
```

4. 自定义key,并以数组形式显示,命令用[]扩起来即可
```
cat data.json | jq ".resources" | jq "[.[] | { _id: .id}]" 
```

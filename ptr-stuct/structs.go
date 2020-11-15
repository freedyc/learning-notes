package main

import (
	"fmt"
)
type person struct {
	name string
	age int
}

func main() {
	fmt.Println(person{name: "xiaobai", age: 13 })
	fmt.Println(person{name: "soso", age: 123})
	fmt.Println(person{name: "半个"})
	fmt.Println(&person{name:"Anna", age: 80 })
	s :=person{name: "外层", age: 12}
	fmt.Println(s.name)
	sp := &s
	fmt.Println(sp.age)
	sp.age = 456
	fmt.Println(sp.age)
}
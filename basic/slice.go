package main

import "fmt"

func main() {
	type Arguments []string
	strs := make(Arguments, 2)
	strs[0] = "123"
	strs[1] = "456"
	fmt.Println(len(strs), strs)
}

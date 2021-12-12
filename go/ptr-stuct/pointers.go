package main

import (
	"fmt"
)

func changeStr(str string)  {
	str = "Go Ha"
}

func changeStr1(str *string) {
	*str = "Gogo Ha"
}

func main() {
	var str = "Ha"
	fmt.Println(str)
	changeStr(str)
	fmt.Println(str)
	changeStr1(&str)
	fmt.Println(str)
}


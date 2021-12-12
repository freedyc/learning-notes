package main

import (
	"fmt"
)

func main() {
	defer func() {
		if p := recover(); p != nil {
			err := fmt.Errorf("initernal error: %v", p)
			fmt.Println("这个还执行呢")
			if err != nil {
				fmt.Println(err)
			}
		}

	}()
	panic("一个异常")
	fmt.Println("这个")
}
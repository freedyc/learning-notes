package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	fmt.Println("Start")
	// n是字符串长度
	n, err := fmt.Fprintln(os.Stdout, "this is my Fprintf?")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(n)
}

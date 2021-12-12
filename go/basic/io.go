package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	fmt.Println("#####Copy方法######")
	copyToStdin()

	fmt.Println("#####Add方法######")
	add()
	fmt.Println("#####bufioScanner方法####")
	bufioScanner()
	fmt.Println("#####bufioSplit方法####")
	bufioSplit()
	fmt.Println("#####map####")
	mapExample()
}

func copyToStdin() {
	io.WriteString(os.Stdout, "Hello world")
	r := strings.NewReader("some io.Reader stream to be read\n")
	if _, err := io.Copy(os.Stdin, r); err != nil {
		log.Fatal(err)
	}
}

func add() {
	var s1, s2 int32
	fmt.Println("输入第一个数:")
	fmt.Scan(&s1)
	fmt.Println("输入第二个数:")
	fmt.Scan(&s2)
	fmt.Printf("两个数相加结果为：%d\n", s1+s2)
}

// Context is readWriter
type Context struct {
	rw io.ReadWriter
}

func bufioScanner() {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		fmt.Println("你输入的是", scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		fmt.Println(err)
	}
}

func bufioSplit() {
	// var input = "123 123 456 789"
	scanner := bufio.NewScanner(os.Stdin)
	split := func(data []byte, atEOF bool) (advance int, token []byte, err error) {
		advance, token, err = bufio.ScanWords(data, atEOF)
		if err == nil && token != nil {
			_, err = strconv.ParseInt(string(token), 10, 32)
		}
		return
	}
	scanner.Split(split)

	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
	}
}

func mapExample() {
	var sts = make(map[string]string)
	sts["abc"] = "1"
	sts["bkk"] = "2"
	fmt.Println(sts)
	c, s := sts["a"]
	fmt.Println(c, s)
}

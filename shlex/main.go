package main

import (
	"bufio"
	"fmt"
	"os"

	"github.com/anmitsu/go-shlex"
)

func main() {
	fmt.Printf("请输入要分词的内容：\n")
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		var txt = scanner.Text()
		if txt == "" {
			fmt.Println("输入不能为空请重新输入！哈哈")
			break
		}
		fmt.Println("POSIX分词结果：")
		shlexTest(txt, true)
		fmt.Println("NO-POSIX分词结果：")
		shlexTest(txt, false)

	}
}

func shlexTest(ctx string, isPosix bool) {
	w1, err := shlex.Split(ctx, isPosix)
	if err != nil {
		panic(err)
	}
	for _, word := range w1 {
		fmt.Println(word)
	}
}

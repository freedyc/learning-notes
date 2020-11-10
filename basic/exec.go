package main

import (
	"fmt"
	"os/exec"
)

func main() {
	out, _ := exec.Command("cd", "/root").Output()
	out1, _ := exec.Command("pwd").Output()
	fmt.Printf("out1%s\n", out)
	fmt.Printf("out2%s\n", out1)
}

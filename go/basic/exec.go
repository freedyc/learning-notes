package main

import (
	"fmt"
	"os/exec"
)

func main() {
	out, _ := exec.Command("cd", "/root").Output()
	out1, _ := exec.Command("pwd").Output()
	fmt.Printf("cd out1 %s\n", out)
	fmt.Printf("pwd out2 %s\n", out1)
}

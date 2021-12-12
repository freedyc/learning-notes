package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/manifoldco/promptui"
)

func main() {
	validate := func(input string) error {
		_, err := strconv.ParseFloat(input, 64)
		if err != nil {
			return errors.New("Invalid number")
		}
		return nil
	}

	prompt := promptui.Prompt{
		Label:    "Number",
		Validate: validate,
	}

        prompt1 := promptui.Prompt{
                Label:  "Number",
                Validate: validate,
        }

	result, err := prompt.Run()

	if err != nil {
		fmt.Printf("Prompt failed %v\n", err)
		return
	}

        result1, err1 := prompt1.Run()

        if err1 != nil {
            fmt.Printf("Prompt failed %v\n", err1);
        }

        a,erra := strconv.Atoi(result)
        b,errb := strconv.Atoi(result1)

        if erra != nil && errb != nil {
            fmt.Printf("Please input Number")
        }
	fmt.Printf("相加结果是 %d\n", a+b)
}


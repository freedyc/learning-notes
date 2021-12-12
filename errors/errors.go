package main

import (
	"errors"
	"fmt"
)

func f1(arg int) (int,  error) {
	if arg == 42 {
		return -1, errors.New("can't work with 42")
	}
	return arg + 3, nil
}

type argError struct {
	arg int
	prob string
}

func (e *argError) Error() string {
	return fmt.Sprintf("#{e.arg} - #{e.prob}")
}

func f2(arg int) (int, error) {
	if arg == 42 {
		return -1, &argError{arg: arg, prob: "can't work with it"}
	}
	return arg + 3, nil
}
func main() {
	for _, i := range []int{7, 42} {
		if r, e := f1(i); e != nil {
			// panic("f1失败了")
			fmt.Println("f1失败", e)
		} else {
			fmt.Println("f1工作", r)
		}
	}

	for _, i := range [] int{7, 42} {
		if r, e := f2(i); e != nil {
			fmt.Println("f2失败", e)
		} else {
			fmt.Println("f2成功", r)
		}
	}
}
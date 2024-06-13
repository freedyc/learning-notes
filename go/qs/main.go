// package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"net/url"

// 	"github.com/derekstavis/go-qs"
// )

// func main() {
// 	fmt.Println("start...")
// 	var str = "search_attrs%5B0%5D%5B0%5D=src_data_combination&search_attrs%5B0%5D%5B1%5D=eq&search_attrs%5B0%5D%5B2%5D%5B0%5D=1&search_attrs%5B0%5D%5B2%5D%5B1%5D=0&search_attrs%5B0%5D%5B2%5D%5B2%5D=all&search_attrs%5B0%5D%5B2%5D%5B3%5D=1&search_attrs%5B0%5D%5B3%5D=and&search_attrs%5B1%5D%5B0%5D=name&search_attrs%5B1%5D%5B1%5D=eq&search_attrs%5B1%5D%5B2%5D=v1&search_attrs%5B1%5D%5B3%5D=and&search_attrs%5B2%5D%5B0%5D=src_type&search_attrs%5B2%5D%5B1%5D=eq&search_attrs%5B2%5D%5B2%5D=ip_subnet&search_attrs%5B2%5D%5B3%5D=and&version=2&page_num=1&page_size=30"
// 	query, err1 := qs.Unmarshal(str)

// 	fmt.Println(query, err1)
// 	jsonData, err := json.Marshal(query)

// 	fmt.Println(string(jsonData), err)

// 	fmt.Println(url.ParseQuery(str))
// }

package main

import (
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"strings"
)

func main() {
	queryStr := `search_attrs%5B0%5D%5B0%5D=src_data_combination&search_attrs%5B0%5D%5B1%5D=eq&search_attrs%5B0%5D%5B2%5D%5B0%5D=1&search_attrs%5B0%5D%5B2%5D%5B1%5D=0&search_attrs%5B0%5D%5B2%5D%5B2%5D=all&search_attrs%5B0%5D%5B2%5D%5B3%5D=1&search_attrs%5B0%5D%5B3%5D=and&search_attrs%5B1%5D%5B0%5D=name&search_attrs%5B1%5D%5B1%5D=eq&search_attrs%5B1%5D%5B2%5D=v1&search_attrs%5B1%5D%5B3%5D=and&search_attrs%5B2%5D%5B0%5D=src_type&search_attrs%5B2%5D%5B1%5D=eq&search_attrs%5B2%5D%5B2%5D=ip_subnet&search_attrs%5B2%5D%5B3%5D=and&version=2&page_num=1&page_size=30`

	// 解析查询字符串
	values, err := url.ParseQuery(queryStr)
	if err != nil {
		fmt.Println("Error parsing query string:", err)
		return
	}

	// 将查询字符串转换为 map[string]interface{}
	parsedQuery := parseValues(values)

	// 将 map 转换为 JSON
	jsonBytes, err := json.Marshal(parsedQuery)
	if err != nil {
		fmt.Println("Error marshaling to JSON:", err)
		return
	}

	fmt.Println(string(jsonBytes))
}

// 解析 URL 查询参数为嵌套的 map
func parseValues(values url.Values) map[string]interface{} {
	result := make(map[string]interface{})

	for key, vals := range values {
		parts := strings.Split(key, "[")
		if len(parts) == 1 {
			result[key] = singleOrArray(vals)
		} else {
			addNestedValue(result, parts, vals, values)
		}
	}

	return result
}

// 将单个值或多个值转换为适当的类型
func singleOrArray(vals []string) interface{} {
	if len(vals) == 1 {
		return tryParseNumber(vals[0])
	}
	arr := make([]interface{}, len(vals))
	for i, v := range vals {
		arr[i] = tryParseNumber(v)
	}
	return arr
}

// 尝试将字符串转换为数字，如果失败则返回原字符串
func tryParseNumber(s string) interface{} {
	if i, err := strconv.Atoi(s); err == nil {
		return i
	}
	if f, err := strconv.ParseFloat(s, 64); err == nil {
		return f
	}
	return s
}

// 递归地将值添加到嵌套的 map 中
func addNestedValue(result map[string]interface{}, parts []string, vals []string, values url.Values) {
	key := strings.TrimSuffix(parts[0], "]")
	rest := parts[1:]

	if len(rest) == 0 {
		result[key] = singleOrArray(vals)
	} else {
		if _, ok := result[key]; !ok {
			result[key] = make(map[string]interface{})
		}

		nestedMap, ok := result[key].(map[string]interface{})
		if !ok {
			nestedMap = make(map[string]interface{})
			result[key] = nestedMap
		}

		if isArrayKey(rest) {
			nestedArray := make([]interface{}, 0)
			for i := 0; ; i++ {
				nestedKey := fmt.Sprintf("%s[%d]", key, i)
				if val, ok := values[nestedKey]; ok {
					nestedArray = append(nestedArray, tryParseNumber(val[0]))
				} else {
					break
				}
			}
			result[key] = nestedArray
		} else {
			addNestedValue(nestedMap, rest, vals, values)
		}
	}
}

// 检查是否为数组键
func isArrayKey(parts []string) bool {
	for _, part := range parts {
		if !strings.HasSuffix(part, "]") {
			return false
		}
		part = strings.TrimSuffix(part, "]")
		if _, err := strconv.Atoi(part); err != nil {
			return false
		}
	}
	return true
}

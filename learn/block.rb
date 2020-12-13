def test
    puts "test方法" 
    yield
    puts "test方法1" 
    yield
end

test {
    puts "test 块"    
} 

def test1 
    a = 10
    yield a
end


test1 { |i| puts "shuchu #{i}" }
def test2 (&block)
    block.call
    puts block;
end

test2 { puts "哈哈" }
BEGIN {
    puts "BEGIN k开始"
}

END {
    puts "ENDj结束了"
}

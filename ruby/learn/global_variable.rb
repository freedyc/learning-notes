$global_variable = 1;

class Class1
    def print_global
        $global_variable = 10;
        puts $global_variable
    end
end

class Class2
    def print_global
        $global_variable = "不要使用的全局变量：90"
        puts "this is global #{$global_variable}"
    end
end


c1 = Class1.new
c2 = Class2.new

c1.print_global
c2.print_global


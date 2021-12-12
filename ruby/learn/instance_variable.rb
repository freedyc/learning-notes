
class InstanceVariable
    @@instance_number = 10
    def print
        @@instance_number += 1
        puts "打印实例变量的值：#@@instance_number"
    end
end

i = InstanceVariable.new

i.print

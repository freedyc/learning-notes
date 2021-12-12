class ConstantVariable
    NAME = "HAFU"
    def printSelf
        puts self
    end
end

c1 = ConstantVariable.new
puts ConstantVariable::NAME
c1.printSelf

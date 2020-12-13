class Customer
    @@claVariable=0;
    $gname="Global Variable";
    def initialize(id,name,sex)
        @cust_id=id;
        @cust_name=name;
        @cust_sex=sex; end
    def getName
        @@claVariable=@@claVariable + 1 
    end
    def getClaVariable
        @@claVariable;
    end
end

c1 = Customer.new(1, "hebei", 2019);

puts c1.getName
puts c1.getName
puts c1.getName
puts c1.getClaVariable

puts $gname


class Person
    @@count = 0;
    def initialize(id, name, comment)
        @p_id = id;
        @p_name = name;
        @p_comment = comment;
    end
    def showDetail
        puts "id: #@p_id"
        puts "name: #@p_name"
        puts "comment: #@p_comment"
    end
    def total_count
        @@count += 1
        puts @@count
    end
    def get_count
        @@count
    end
end

p1 = Person.new(1, "xiaodeng", "我爱你")
p1.showDetail
p1.total_count
p1.get_count
p1.total_count
puts p1.get_count

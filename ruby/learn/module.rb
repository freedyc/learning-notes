MY_COUNT = 89
module Foo
    MY_COUNT = 1
    ::MY_COUNT = 20
    MY_COUNT = 2
end
puts Foo::MY_COUNT
puts MY_COUNT

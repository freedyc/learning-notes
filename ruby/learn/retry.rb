begin
    puts $i + 1
rescue
 $i = 10;
 retry
end


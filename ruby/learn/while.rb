$i = 0;
$max = 10;
while $i < 10
    puts "$1= #$i"
    $i+=1
end


puts $i

$i-=1 while $i>0
puts $i

begin
    $i+=1
    puts "$i=#$i"
end while $i< 10;


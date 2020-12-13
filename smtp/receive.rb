require "net/pop"
require "nokogiri"

server = "pop3.126.com";
user = "dengyongchao@126.com";
password = "waitME08.";

pop = Net::POP3.new server
pop.start user, password

mails = pop.mails.reverse
mail = mails[1];

#puts mail.pop;
subject = mail.header.split("\r\n")
body = mail.pop;

doc = Nokogiri::HTML.parse(body, nil, "UTF-8");
#puts doc
File.open("mail.html", 'w+') do  |aFile|
    aFile.syswrite(body);
end

ele = doc.xpath("//label//path").inner_text;
puts ele
pop.finish

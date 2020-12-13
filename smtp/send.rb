
puts ARGV
receive = ARGV[0];
content = ARGV[1];
require "net/smtp"
message = <<MESSAGE_END
Form: Private Person <dengyongchao@126.com>
To: A Test User  <#{receive}>
Subject: 

HAHA#{content}
MESSAGE_END

Net::SMTP.start('smtp.126.com', 25, 'localhost', 'dengyongchao@126.com', 'xxxxx',:plain) do |smtp|
    smtp.send_message message, 'dengyongchao@126.com', "#{receive}"
end

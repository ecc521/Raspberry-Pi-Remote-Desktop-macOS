#!/usr/bin/expect

#./PATHTOTHIS <password> ssh <anything>

set timeout 20

set cmd [lrange $argv 1 end]
set password [lindex $argv 0]

eval spawn $cmd
expect "assword:"
send "$password\r";
interact
#!/usr/bin/expect

#./PATHTOTHIS <password> ssh <anything>

set timeout 20

set cmd [lrange $argv 1 end]
set password [lindex $argv 0]

eval spawn $cmd


#We will either be asked if we know the device (ECDSA key) or for the password

expect {
    "password:" {
    send "$password\r"
    }
    "continue connecting" {
    send "yes\r"
    expect "password:"
    send "$password\r"
    }
}
interact
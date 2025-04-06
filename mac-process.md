## Find process id (PID)

#### See what process is using the port
`lsof -i :<port>`

lsof - List open files

Example:
```bash
lsof -i :8080
lsof -iTCP
```

#### Get just the PID
`lsof -ti :<port>`

- -t = terse output (just PID)
- -i :port = filter for port (TCP/UDP) & i = internet

#### Kill the process using that port
`kill -9 $(lsof -ti :<port>)`

- kill -9 = force kill
- kill -15 = gracefully shutdown

#### Faster lookup
`lsof -iTCP -sTCP:LISTEN -n -P`

- -iTCP - Filters the results to show only TCP connections.
- -sTCP - Further restricts TCP results to LISTENING sockets.
- -n - Tells lsof not to resolve IP addresses to hostnames.
- -P - Prevents conversion of port numbers into service names (like http or https).

Alternatively if you just need the pID
`lsof -tiTCP:8080 -sTCP:LISTEN`


## Find process name

#### List processes by name
`ps aux`

- a = show processes for all users
- u = show the user who owns the process
- x = show processes not attached to a terminal

Example:
`ps aux | grep java`

Alternatively you can use (best suited to be used in the scripts)

`pgrep -a java`

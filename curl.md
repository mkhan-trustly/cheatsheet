# Curl command options


| Option     | Description                                                                  |
|------------|------------------------------------------------------------------------------|
| -X         | Specify request method (GET, POST, PUT, etc.)                                |
| -H         | Add headers (-H "Authorization: Bearer token")                               |
| -d         | Send data (usually with POST)                                                |
| -o         | Output to file (-o output.json)                                              |
| -s         | Silent mode (no progress bar)                                                |
| -v         | Verbose mode (debugging)                                                     |
| -L         | Follow redirects                                                             |
| -u         | Basic auth (-u user:pass)                                                    |
| --http2    | Use HTTP/2 protocol                                                          |
| --json     | Send JSON data directly (newer curl versions): curl --json '{"name":"john"}' |
| --insecure | Ignore security warnings                                                     |

```
curl -s -X POST https://api.example.com \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"John"}'
```
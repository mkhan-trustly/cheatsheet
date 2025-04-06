
#### Pretty print JSON
`jq '.' data.json`

#### Get all values of a key
`jq '.[].id' data.json`

#### Extract only certain fields (id, name) from each item in a JSON array
`jq '.[] | {id, name}' data.json`

#### Filter array
`jq '.[] | select(.status == "active")' data.json`

#### Save only needed fields into a new file:
`jq '[.[] | {id, name}]' data.json > output.json`
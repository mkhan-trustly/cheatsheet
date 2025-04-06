# Terminal commands

### List files & directories

```
ls -l → Detailed list
ls -lh → Human-readable sizes
ls -a → Show hidden files
```

### Copy-paste - Clipboard magic
```
cat config.json | pbcopy → Copy file content to clipboard
pbpaste > backup.txt → Paste clipboard into a file
```

### Create a new file
`touch hello.txt → Create new file`

### Find & grep
```
find . -name "*.java" → Find all Java files
grep "TODO" *.java → Search “TODO” inside Java files
grep -r "AuthService" . → Recursive grep
```

#### How many Java files have Service in their name?
`find . -name "*.java" | grep "Service" | wc -l`

#### Skip a directory
`find . -path "./target" -prune -o -name "*.java" -type f -print`

### History
```
history → See all previous commands
!45 → Run command #45 from history
!! → Run the last command again
```

### Alias
Add to your ~/.zshrc (Mac default shell):
```
alias gs='git status'
alias gc='git commit -m'
alias mvnci='mvn clean install'
alias ..='cd ..'
```
# git commands

### Delete branch
```
git branch -d localBranchName

// delete remote branch
git push origin --delete remoteBranchName
```

### Commit message
```
git commit --amend -m "New commit message"

git commit --amend --no-edit
```

### Merge
```
git merge <name-of-branch> --no-commit --no-ff

-- theirs
git merge develop --strategy-option theirs --no-commit --no-ff

-- ours
git merge develop --strategy-option ours --no-commit --no-ff

```

### Rebase
```
git rebase master → fix merge, add and continue then force push
git rebase -i HEAD~x

git merge develop --strategy-option theirs --no-commit --no-ff

git merge develop --strategy-option ours --no-commit --no-ff

```

### Tag
```
git tag -a v1.0 -m "..."
git push origin v1.0

git log 5.9..5.10 -- path/to/folder
git diff --name-only 5.9 5.10 -- path/to/folder
git tag --contains <commit>
```

### Reset
```
git reset --hard origin/mob/….
git reset HEAD -- filename

(or)

git checkout filename
git checkout origin/master server/pnpm-lock.yaml

git rm -rf <directory>

```

### log
```
git log -- path/to/folder
git log --author="Your Name" -- path/to/folder

```

### diff
```
git diff COMMIT1 COMMIT2 -- path/to/folder
```


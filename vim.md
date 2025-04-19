# Vi improved (vim)

### Find & replace

```
:s/old/new → Current line
:s/old/new/g → All occurences in current line

:%s/old/new/g → All occurences in the whole file
:%s/old/new/gc → Same as above but with confirmation

:10,20s/old/new/g → Lines 10 to 20
```

In git
```
:%s/^pick/squash/g

(or)
:%s/^pick/squash/g

. = current line
$ = last line
So :.,$ means “from here to the end”

```
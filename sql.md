# SQL

```
SELECT pp.id, COUNT(pp.id) FROM PP pp JOIN PPX ppx ON CONCAT('P-', pp.ID) = ppx.ID GROUP BY pp.id ORDER BY COUNT(pp.id) DESC;
```
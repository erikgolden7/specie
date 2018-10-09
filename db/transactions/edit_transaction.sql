UPDATE transactions
SET type = $2, location = $3, amount = $4, date = $5, month = $6, day = $7, year = $8
WHERE id = $1



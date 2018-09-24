UPDATE budgets
SET type = $4, amount
= $5
WHERE type = $1 AND light_color = $2 AND amount = $3

UPDATE budgets
SET active = true
WHERE type = $1 AND light_color = $2 AND amount = $3

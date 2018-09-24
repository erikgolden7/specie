module.exports = {
  addBudgetType: async (req, res) => {
    const db = req.app.get('db');

    const {
      type,
      color: { light },
      color: { dark },
      amount
    } = req.body;

    await db.budgets
      .add_budget_type([type, light, dark, amount, false])
      .catch(err => res.status(500).json(err));

    const allTypes = await db.budgets
      .get_all_budget_types()
      .catch(err => res.status(500).json(err));

    res.status(200).json(allTypes);
  },

  getBudgetTypes: async (req, res) => {
    const db = req.app.get('db');

    const types = await db.budgets
      .get_all_budget_types()
      .catch(err => res.status(500).json(err));

    res.status(200).json(types);
  },

  getCurrentBudgets: async (req, res) => {
    const db = req.app.get('db');

    const budgets = await db.budgets
      .get_all_current_budgets()
      .catch(err => res.status(500).json(err));

    res.status(200).json(budgets);
  },

  setCurrentBudget: async (req, res) => {
    const db = req.app.get('db');
    const { type, light, amount } = req.query;

    await db.budgets
      .add_current_budget([type, light, amount])
      .catch(err => res.status(500).json(err));

    const budgets = await db.budgets
      .get_all_current_budgets()
      .catch(err => res.status(500).json(err));

    res.status(200).json(budgets);
  },

  editCurrentBudget: async (req, res) => {
    const db = req.app.get('db');
    const { type, light, amount, newName, newAmount } = req.query;

    await db.budgets
      .edit_current_budget([
        type,
        light,
        amount,
        newName || type,
        newAmount || amount
      ])
      .catch(err => res.status(500).json(err));

    const budgets = await db.budgets
      .get_all_current_budgets()
      .catch(err => res.status(500).json(err));

    res.status(200).json(budgets);
  }
};

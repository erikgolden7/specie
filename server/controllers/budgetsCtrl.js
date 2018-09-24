module.exports = {
  addBudgetType: async (req, res) => {
    const db = req.app.get('db');

    const {
      type,
      color: { light },
      color: { dark },
      amount
    } = req.body;

    await db
      .add_budget_type([type, light, dark, amount, false])
      .catch(err => console.log(err));

    const allTypes = await db.get_all_budget_types();

    res.status(200).json(allTypes);
  },

  getBudgetTypes: async (req, res) => {
    const db = req.app.get('db');

    const types = await db
      .get_all_budget_types()
      .catch(err => res.status(500).json(err));

    res.status(200).json(types);
  },

  getCurrentBudgets: async (req, res) => {
    const db = req.app.get('db');

    const budgets = await db
      .get_all_current_budgets()
      .catch(err => res.status(500).json(err));

    res.status(200).json(budgets);
  }
};

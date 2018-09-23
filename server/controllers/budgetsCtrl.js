module.exports = {
  addBudgetType: (req, res) => {
    const db = req.app.get('db');

    const {
      type,
      color: { light },
      color: { dark },
      amount
    } = req.body.type;

    console.log(type, light, dark, amount);

    db.add_budget_type([type, light, dark, amount, false])
      .then(res => {})
      .catch(err => console.log(err));
  },
  getBudgetTypes: async (req, res) => {
    const db = req.app.get('db');

    const types = await db
      .get_all_budget_types()
      .catch(err => res.status(500).send(err));

    res.status(200).json(types);
  }
};

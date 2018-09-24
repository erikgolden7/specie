module.exports = {
  addBudgetType: async (req, res) => {
    const db = req.app.get('db');

    const {
      type,
      color: { light },
      color: { dark },
      amount
    } = req.body.type;

    await db
      .add_budget_type([type, light, dark, amount, false])
      .catch(err => console.log(err));

    const allTypes = await db.get_all_budget_types();

    // console.log(allTypes);
    res.status(200).json(allTypes);
  },
  getBudgetTypes: async (req, res) => {
    const db = req.app.get('db');

    const types = await db
      .get_all_budget_types()
      .catch(err => res.status(500).send(err));

    res.status(200).json(types);
  }
};

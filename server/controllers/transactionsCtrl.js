module.exports = {
  getAllTransactions: async (req, res) => {
    const db = req.app.get('db');

    const transactions = await db.transactions.get_all_transactions().catch(err => console.log(err));

    if (transactions) {
      return res.status(200).json(transactions);
    } else {
      return res.status(500).json('error getting transactions');
    }
  },

  setTransactionData: async (req, res) => {
    const db = req.app.get('db');
    const { type, date, formatDate, location, amount } = req.body;

    await db.transactions
      .post_product([type, date, location, amount, formatDate.month, formatDate.day, formatDate.year])
      .catch(console.log);

    res.status(200).json('Successfully added new transaction');
  },

  editTransactionData: async (req, res) => {
    const db = req.app.get('db');
    const { id, type, location, amount, date, formatDate } = req.body;

    await db.transactions
      .edit_transaction([id, type, location, amount, date, formatDate.month, formatDate.day, formatDate.year])
      .catch(console.log);

    res.status(200).json('success');
  },

  getColorTotal: async (req, res) => {
    const db = req.app.get('db');

    const response = await db.transactions.get_type_total(req.body.type);
  }
};

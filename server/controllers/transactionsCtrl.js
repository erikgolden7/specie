module.exports = {
  getAllTransactions: async (req, res) => {
    const db = req.app.get('db');

    const transactions = await db.transactions.get_all_transactions();

    if (transactions) {
      return res.status(200).json(transactions);
    }
    res.status(500).json('error getting transactions');
  },

  setTransactionData: (req, res) => {
    const db = req.app.get('db');
    const { type, date, location, amount } = req.body;

    db.post_product([type, date, location, amount])
      .then(res => console.log(res))
      .catch(err => console.log(err));

    res.status(200).json(req.body);
  }
};

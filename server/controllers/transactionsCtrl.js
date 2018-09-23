module.exports = {
  setTransactionData: (req, res) => {
    const db = req.app.get('db');
    const { type, date, location, amount } = req.body;

    db.post_product([type, date, location, amount])
      .then(res => console.log(res))
      .catch(err => console.log(err));

    res.status(200).json(req.body);
  }
};

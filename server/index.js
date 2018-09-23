require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
const transactionCtrl = require('./controllers/transactionsCtrl');
const budgetCtrl = require('./controllers/budgetsCtrl');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set('db', dbInstance);
  })
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  console.log('----PRODUCTION MODE----');
  app.use(express.static(path.join(__dirname, '../build')));
} else {
  console.log('----DEVELOPMENT MODE----');
  app.use(express.static(path.join(__dirname, '../public')));
}

// --------------------
// ENDPOINTS
// --------------------

app.post('/api/setTransactions', transactionCtrl.setTransactionData);

app.post('/api/setBudgetType', budgetCtrl.addBudgetType);
app.get('/api/getBudgetTypes', budgetCtrl.getBudgetTypes);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.js'));
  });
} else {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
const transactionsCtrl = require('./controllers/transactionsCtrl');
const budgetCtrl = require('./controllers/budgetsCtrl');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(json());
app.use(cors());

// app.use((req,res,next) => {
//   if(req.method === 'GET'){
//     next()
//   }
//   else {
//     res.sendStatus(401)
//   }
// })

// massive(process.env.CONNECTION_STRING)
//   .then(dbInstance => {
//     app.set('db', dbInstance);
//   })
//   .catch(err => console.log(err));

// if (process.env.NODE_ENV === 'production') {
//   console.log('----PRODUCTION MODE----');
app.use(express.static(path.join(__dirname, '../build')));
// } else {
//   console.log('----DEVELOPMENT MODE----');
//   app.use(express.static(path.join(__dirname, '../public')));
// }

// --------------------
// ENDPOINTS
// --------------------

app.post('/api/setTransactions', transactionsCtrl.setTransactionData);

// Budget Endpoints
// ----------------
app.post('/api/setBudgetType', budgetCtrl.addBudgetType);
app.get('/api/getBudgetTypes', budgetCtrl.getBudgetTypes);
app.get('/api/getCurrentBudgets', budgetCtrl.getCurrentBudgets);
app.put('/api/setCurrentBudget', budgetCtrl.setCurrentBudget);
app.put('/api/editCurrentBudget', budgetCtrl.editCurrentBudget);
app.delete('/api/removeCurrentBudget', budgetCtrl.deleteCurrentBudget);

app.get('/api/getTransactionData', transactionsCtrl.getAllTransactions);
app.put('/api/editTransactionData', transactionsCtrl.editTransactionData);

app.get('/api/getColorTotal', transactionsCtrl.getColorTotal);

// app.get('/test', (req, res) => res.status(418).send({ message: 'this is an error' }));

// if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.js'));
});
// } else {
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
//   });
// }

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

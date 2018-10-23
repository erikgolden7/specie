import React from 'react';
import { create } from 'react-test-renderer';
import { Budgets } from '../../components/Budgets/Budgets';

test('snapshot', () => {
  const c = create(<Budgets currentBudgets="test" />);
  expect(c.toJSON()).toMatchSnapshot();
});

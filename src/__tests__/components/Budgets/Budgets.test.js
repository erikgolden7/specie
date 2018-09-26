import React from 'react';
import { Budgets } from '../../../../src/components/Budgets/Budgets';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Budgets />).toJSON();
  expect(tree).toMatchSnapshot();
});

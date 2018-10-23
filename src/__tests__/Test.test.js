import React from 'react';
import { create } from 'react-test-renderer';
import Test from '../Test';

test('snapshot', () => {
  const c = create(<Test />);
  expect(c.toJSON()).toMatchSnapshot();
});

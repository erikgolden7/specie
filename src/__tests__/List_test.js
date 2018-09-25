import React from 'react';
import List from '../List';
import { shallow, mount, render } from 'enzyme';

if (
  ('renders successfully',
  () => {
    shallow(<List />);
  })
);

// describe('List tests', () => {
//   it('renders list-items', () => {
//     react;
//     const items = ['one', 'two', 'three'];
//     const wrapper = shallow(<List items={items} />);

//     // Expect the wrapper object to be defined
//     expect(wrapper.find('.list-items')).toBeDefined();
//     expect(wrapper.find('.item')).toHaveLength(items.length);
//   });

//   it('renders a list item', () => {
//     const items = ['Thor', 'Loki'];
//     const wrapper = shallow(<List items={items} />);

//     // Check if an element in the Component exists
//     expect(
//       wrapper.contains(
//         <li key="Thor" className="item">
//           Thor
//         </li>
//       )
//     ).toBeTruthy();
//   });

//   it('renders correct text in item', () => {
//     const items = ['John', 'James', 'Luke'];
//     const wrapper = shallow(<List items={items} />);

//     //Expect the child of the first item to be an array
//     expect(wrapper.find('.item').get(0).props.children).toEqual('John');
//   });
// });

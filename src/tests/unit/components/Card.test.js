import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../../components/Card';

test('Card renders title prop', () => {
  const wrapper = shallow(<Card title="Test title" />);
  expect(wrapper.text()).toContain('Test title');
});

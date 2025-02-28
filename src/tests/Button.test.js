import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Button from '../components/Button';

// Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  const children = 'give me more';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give Me More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const component = renderer.create(
    <Button>Give Me More</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('shows children as button message', () => {
  //   const element = shallow(
  //   <Button { ...children } />
  //   );
  //   expect(element.find('.table-row').length).toBe(2);
  //   });
});

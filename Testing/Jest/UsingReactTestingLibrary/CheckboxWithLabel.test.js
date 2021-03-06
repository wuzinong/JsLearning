
import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import CheckboxWithLabel from './CheckboxWithLabel';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('ReactTestingLibrary: CheckboxWithLabel changes the text after click', () => {
  const {queryByLabelText, getByLabelText,debug} = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

  debug();
  // console.log(render(
  //   <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  // ))

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
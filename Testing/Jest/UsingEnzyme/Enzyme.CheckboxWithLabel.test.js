import React from 'react';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxWithLabel from '../UsingReactTestingLibrary/CheckboxWithLabel';


describe("Start enzyme testing",function(){

    configure({
        adapter:new Adapter()
    })
    
    test('CheckboxWithLabel changes the text after click', () => {
      // Render a checkbox with label in the document
      const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
    
      expect(checkbox.text()).toEqual('Off');
    
      checkbox.find('input').simulate('change');
    
      expect(checkbox.text()).toEqual('On');
    });
    
})
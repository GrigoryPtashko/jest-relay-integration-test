// jest.unmock('../src/components/SignIn');

jest.disableAutomock();

import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SignIn from '../src/components/SignIn';

xdescribe('SignIn', () => {
  it('shows the social login buttons', () => {
    const signin = TestUtils.renderIntoDocument(
      <div><SignIn /></div>
    );
    expect(signin).not.toBe(null);

    const signinNode = ReactDom.findDOMNode(signin);

    expect(signinNode).not.toBe(null);
    expect(signinNode.textContent).toMatch(/Sign In with Facebook/);
  });
});

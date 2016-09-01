jest.mock('jsdom/lib/jsdom/browser/Window');

import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SignIn from '../src/components/SignIn';

describe('SignIn', () => {
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

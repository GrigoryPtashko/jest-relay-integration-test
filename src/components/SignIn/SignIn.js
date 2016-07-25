import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SignIn.scss';

class SignIn extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <a className={`button u-pull-right ${s['btn-facebook']}`} href="/auth/facebook">Sign In with Facebook</a>
        </div>

        <br/>
        <br/>

        <div className="row">
          <a className={`button ${s['btn-google']}`} href="/auth/google">Sign In with Google</a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SignIn);

import React from 'react'; // eslint-disable-line import/imports-first
import Relay from 'react-relay'; // eslint-disable-line import/imports-first
import renderer from 'react-test-renderer';
import RelayStore from '../src/RelayStore';
import { createRenderer } from '../src/RelayUtils';

RelayStore.reset(new Relay.DefaultNetworkLayer('http://hashnews.cfapps.io/q'));

const delay = value => new Promise(resolve => setTimeout(() => resolve(), value));

const RootQuery = {
  root: () => Relay.QL`
    query {
      root
    }
  `,
};

class AppRoot extends React.Component {
  static propTypes = {
    root: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.root.me.authorities[0].authority}
      </div>
    );
  }
}

it('can make request to /q anyway', async () => {
  const AppCnt = createRenderer(AppRoot, {
    queries: RootQuery,
    fragments: {
      root: () => Relay.QL`
        fragment on Root {
          me {
            firstName
            email
            authorities {
              authority
            }
          }
        }
      `,
    },
  });

  const tree = renderer.create(<AppCnt />);

  await delay(3000);

  expect(tree.toJSON()).toMatchSnapshot();
});


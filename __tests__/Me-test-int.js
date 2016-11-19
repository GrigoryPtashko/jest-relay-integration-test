import React from 'react'; // eslint-disable-line import/imports-first
import Relay from 'react-relay'; // eslint-disable-line import/imports-first
import renderer from 'react-test-renderer';
import RelayStore from '../src/RelayStore';


RelayStore.reset(new Relay.DefaultNetworkLayer('http://hashnews.cfapps.io/q'));

const delay = value => new Promise(resolve => setTimeout(() => resolve(), value));

class RootRoute extends Relay.Route {
  static queries = {
    root: (Component) => Relay.QL`
        query {
            root {
                ${Component.getFragment('root')}
            }
        }
    `,
  };

  static routeName = 'RootRoute';
}

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

const AppContainer = Relay.createContainer(AppRoot, {
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


it('can make request to /q anyway', async () => {
  const tree = renderer.create(
    <Relay.Renderer
      Container={AppContainer}
      queryConfig={new RootRoute()}
      environment={Relay.Store}
      forceFetch={true}
      render={({ error, props }) => {
        if (error) {
          return <div>error</div>;
        } else if (props) {
          return <AppContainer {...props} />;
        }

        return <div>loading</div>;
      }}
    />);

  await delay(3000);

  expect(tree.toJSON()).toMatchSnapshot();
});


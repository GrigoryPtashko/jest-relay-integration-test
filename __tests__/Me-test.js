jest.disableAutomock();

import React from 'react';
import Relay from 'react-relay';
import TestUtils from 'react-addons-test-utils';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://hashnews.cfapps.io/q')
);

describe('Me', () => {
  it('can make request to /q anyway', () => {
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
        console.log('in render');

        expect(this.props.root).not.toBe(null);
        expect(this.props.root.me).not.toBe(null);
        expect(this.props.root.me.firstName).not.toBe(null);
        expect(this.props.root.me.authorities[0]).not.toBe(null);
        expect(this.props.root.me.authorities[0].authority).toEqual('ROLE_ANONYMOUS_AAA');

        return (
          <div>
            {this.props.root.me.firstName}
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

    const container = TestUtils.renderIntoDocument(
      <Relay.Renderer
        Container={AppContainer}
        queryConfig={new RootRoute()}
        environment={Relay.Store}
        render={({ done, error, props, retry, stale }) => {

          if (error) {

            return <div>error</div>;
          } else if (props) {

            return <AppContainer {...props} />;
          } else {

            return <div>loading</div>;
          }
        }}
      />
    );

    expect(container).not.toBe(null);
  });
});

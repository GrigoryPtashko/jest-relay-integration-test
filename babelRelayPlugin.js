var babelRelayPlugin   = require('babel-relay-plugin');
var request            = require('sync-request');

var url = 'http://localhost:10000/q';

var response = request('POST', url, {
  json: { query: "query IntrospectionQuery {__schema {queryType { name } mutationType { name } subscriptionType { name } types {...FullType } directives {name description args {...InputValue } onOperation onFragment onField } } } fragment FullType on __Type {kind name description fields(includeDeprecated: true) {name description args {...InputValue } type {...TypeRef } isDeprecated deprecationReason } inputFields {...InputValue } interfaces {...TypeRef } enumValues(includeDeprecated: true) {name description isDeprecated deprecationReason } possibleTypes {...TypeRef } } fragment InputValue on __InputValue {name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type {kind name ofType {kind name ofType {kind name ofType {kind name } } } }" },
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  }
});

var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = babelRelayPlugin(schema.data, {
  abortOnError: true,
});

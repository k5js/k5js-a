const { Keystone } = require('@k5js/keystone');
const { Text, Password, Checkbox } = require('@k5js/fields');
const { GraphQLApp } = require('@k5js/app-graphql');
const { AdminUIApp } = require('@k5js/app-admin-ui');
const { StaticApp } = require('@k5js/app-static');

const { staticRoute, staticPath } = require('./config');

const { MongooseAdapter } = require('@k5js/adapter-mongoose');

const keystone = new Keystone({
  name: 'Cypress Test Project Client Validation',
  adapter: new MongooseAdapter(),
});

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    password: { type: Password, isRequired: true },
    isAdmin: { type: Checkbox },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: staticRoute, src: staticPath }),
    new AdminUIApp({ enableDefaultRoute: true }),
  ],
};

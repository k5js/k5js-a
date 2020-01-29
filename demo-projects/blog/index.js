//imports for Keystone app core
const { Keystone } = require('@ksjs/keystone');
const { PasswordAuthStrategy } = require('@ksjs/auth-password');
const { MongooseAdapter } = require('@ksjs/adapter-mongoose');
const { GraphQLApp } = require('@ksjs/app-graphql');
const { AdminUIApp } = require('@ksjs/app-admin-ui');
const { NextApp } = require('@ksjs/app-next');
const { StaticApp } = require('@ksjs/app-static');

const { staticRoute, staticPath, distDir } = require('./config');
const { User, Post, PostCategory, Comment } = require('./schema');

const keystone = new Keystone({
  name: 'Keystone Demo Blog',
  adapter: new MongooseAdapter(),
  onConnect: async () => {
    // Initialise some data.
    // NOTE: This is only for demo purposes and should not be used in production
    const users = await keystone.lists.User.adapter.findAll();
    if (!users.length) {
      const initialData = require('./initialData');
      await keystone.createItems(initialData);
    }
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

keystone.createList('User', User);
keystone.createList('Post', Post);
keystone.createList('PostCategory', PostCategory);
keystone.createList('Comment', Comment);

const adminApp = new AdminUIApp({
  adminPath: '/admin',
  hooks: require.resolve('./admin/'),
  authStrategy,
  isAccessAllowed: ({ authentication: { item: user } }) => !!user && !!user.isAdmin,
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: staticRoute, src: staticPath }),
    adminApp,
    new NextApp({ dir: 'app' }),
  ],
  distDir,
};

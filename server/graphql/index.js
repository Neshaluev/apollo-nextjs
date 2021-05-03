const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const {
  userMutations,
  userQueries,
  portfolioMutations,
  portfoliosQueries,
  forumQueries,
  mixedQueries,
  forumMutations,
} = require('./resolvers');
const { userTypes, portfolioTypes, forumTypes } = require('./types');
const { buildAuthContext } = require('./context');

const User = require('./controllsers/User');
const Portfolio = require('./controllsers/Portfolio');
const ForumCategory = require('./controllsers/ForumCategory');
const Topic = require('./controllsers/Topic');
const Post = require('./controllsers/Post');

exports.createApolloServer = () => {
  const typeDefs = gql(`
        ${userTypes}
        ${portfolioTypes}
        ${forumTypes}

        type Query {
            user: User
            
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
            userPortfolios: [Portfolio]

            forumCategories: [ForumCategory]
            topicsByCategory(category: String): [Topic]
            topicBySlug(slug: String): Topic
            postsByTopic(slug: String, pageNum: Int, pageSize: Int): PagPosts

            highlight(limit: Int): HighlightRes
        }

        type Mutation { 
            createPortfolio(input: PortfolioInput): Portfolio
            updatePortfolio(id: ID, input: PortfolioInput): Portfolio
            deletePortfolio(id: ID): ID

            signUp(input: SignUpInput): String
            signIn(input: SignInInput): User
            signOut: Boolean

            createTopic(input: TopicInput): Topic
            createPost(input: PostInput): Post
            createForumCategory(input: ForumCategoryInput): ForumCategory
        }
        
    `);

  const resolvers = {
    Query: {
      ...userQueries,
      ...portfoliosQueries,
      ...forumQueries,
      ...mixedQueries,
    },
    Mutation: {
      ...userMutations,
      ...portfolioMutations,
      ...forumMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        ...buildAuthContext(req),
        models: {
          User: new User(mongoose.model('User')),
          Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
          ForumCategory: new ForumCategory(
            mongoose.model('ForumCategory'),
            req.user,
          ),
          Topic: new Topic(mongoose.model('Topic'), req.user),
          Post: new Post(mongoose.model('Post'), req.user),
        },
      };
    },
  });

  return apolloServer;
};

exports.mixedQueries = {
  highlight: async (root, { limit = 3 }, ctx) => {
    const portfolios = await ctx.models.Portfolio.getRandoms(limit);
    const topics = await ctx.models.Topic.getRandoms(limit);
    return {
      portfolios,
      topics,
    };
  },
};

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

exports.portfoliosQueries = {
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
  portfolio: (root, { id }, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  userPortfolios: async (root, args, ctx) => {
    const portfolios = await ctx.models.Portfolio.getAllByUser();
    return portfolios;
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }, ctx) => {
    const createdPortfolio = await ctx.models.Portfolio.create(input);
    return createdPortfolio;
  },
  updatePortfolio: async (root, { id, input }, ctx) => {
    const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
      id,
      input,
    );
    return updatedPortfolio;
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
    return deletedPortfolio._id;
  },
};

exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, data, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

exports.forumQueries = {
  forumCategories: async (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },
  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
    if (!forumCategory) {
      return null;
    }
    const categories = await ctx.models.Topic.getAllByCategory(
      forumCategory._id,
    );
    return categories;
  },
  topicBySlug: (root, { slug }, ctx) => {
    return ctx.models.Topic.getBySlug(slug);
  },
  postsByTopic: async (root, { slug, ...pagination }, ctx) => {
    const topic = await ctx.models.Topic.getBySlug(slug);
    return ctx.models.Post.getAllByTopic({ topic, ...pagination });
  },
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(
      input.forumCategory,
    );
    input.forumCategory = category._id;
    const topic = await ctx.models.Topic.create(input);
    return topic;
  },
  createPost: async (root, { input }, ctx) => {
    const post = await ctx.models.Post.create(input);
    return post;
  },
  createForumCategory: async (root, { input }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.create(input);
    return forumCategory;
  },
};

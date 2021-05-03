exports.userTypes = `
    enum UserRole {
        guest
        admin
        instructor
    }

    type User {
        _id: ID
        username: String
        name: String
        login: String
        email: String
        role: String
    }

    input SignUpInput {
        username: String!
        name: String!
        email: String!
        password: String!
        passwordConfirmation: String!
    }

    input SignInInput {
        email: String!
        password: String!
    }
`;

const portfolioFields = `
    title: String,
    company: String,
    companyWebsite: String,
    location: String,
    jobTitle: String,
    description: String,
    startDate: String,
    endDate: String
`;
exports.portfolioTypes = `
  type Portfolio {
    _id: ID,
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`;

exports.forumTypes = `
  type ForumCategory {
    _id: ID
    title: String
    subTitle: String
    slug: String
  }

  type Author {
    avatar: String
    username: String
  }

  type Topic {
    _id: ID
    slug: String
    title: String
    content: String
    forumCategory: ForumCategory
    user: Author
    createdAt: String
  }

  input TopicInput {
    title: String
    content: String
    forumCategory: String
  }

  type Post {
    _id: ID
    content: String
    slug: String
    fullSlug: String
    topic: Topic
    user: User
    parent: Post
    createdAt: String
  }

  type PagPosts {
    posts: [Post]
    count: Int
  }

  input PostInput {
    content: String
    parent: String
    topic: String
  }

  input ForumCategoryInput {
    title: String
    subTitle: String
    slug: String
  }

  type HighlightRes {
    portfolios: [Portfolio]
    topics: [Topic]
  }
`;

import { gql } from 'apollo-boost';

// Authentication ------------------------------------

export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        name: $name
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    )
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      role
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;

// Portfolios -----------------------------------

export const GET_HIGHLIGHT = gql`
  query Highlight($limit: Int) {
    highlight(limit: $limit) {
      topics {
        _id
        title
        content
        slug
        user {
          username
          avatar
        }
        createdAt
      }
      portfolios {
        _id
        title
        description
        jobTitle
        startDate
        endDate
      }
    }
  }
`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolios {
    userPortfolios {
      _id
      title
      jobTitle
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      daysOfExperience @client
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String!
    $company: String!
    $companyWebsite: String!
    $location: String!
    $jobTitle: String!
    $description: String!
    $startDate: String!
    $endDate: String!
  ) {
    createPortfolio(
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio(
    $id: ID
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    updatePortfolio(
      id: $id
      input: {
        title: $title
        company: $company
        companyWebsite: $companyWebsite
        location: $location
        jobTitle: $jobTitle
        description: $description
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      _id
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;
export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

// Forums ----------------------------------------

const topicResponse = `
  _id
  slug
  title
  content
  user {
    username
  }
  forumCategory {
    _id
    title
    slug
  }
`;
export const TOPICS_BY_CATEGORY = gql`
  query TopicsByCategory($category: String) {
    topicsByCategory(category: $category) {
      ${topicResponse}
    }
  }
`;
export const TOPIC_BY_SLUG = gql`
  query TopicBySlug($slug: String) {
    topicBySlug(slug: $slug) {
      ${topicResponse}
    }
  }
`;

export const FORUM_CATEGORIES = gql`
  query ForumCategories {
    forumCategories {
      slug
      title
      subTitle
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic(
    $title: String
    $content: String
    $forumCategory: String
  ) {
    createTopic(input:{
      title: $title,
      content: $content
      forumCategory: $forumCategory
    }){
      ${topicResponse}
    }
  }
`;
export const CREATE_FORUM_CATEGORY = gql`
  mutation CreateForumCategory(
    $title: String
    $subTitle: String
    $slug: String
  ) {
    createForumCategory(
      input: { title: $title, subTitle: $subTitle, slug: $slug }
    ) {
      title
      subTitle
      slug
    }
  }
`;

const postResponse = `
  _id
  content
  slug
  createdAt
  user {
    username
  }
  parent {
    content
    user {
      username
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $content: String
    $topic: String
    $parent: String
  ) {
    createPost(input: {
      content: $content
      topic: $topic
      parent: $parent
    }) {
      ${postResponse}
    }
  }
`;

export const POSTS_BY_TOPIC = gql`
    query PostsByTopic($slug: String, $pageNum: Int, $pageSize: Int) {
      postsByTopic(slug: $slug, pageNum: $pageNum, pageSize: $pageSize) {
        posts {
          ${postResponse}
        }
        count
      }
    }
`;

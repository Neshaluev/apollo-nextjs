import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  SIGN_IN,
  GET_USER,
  GET_PORTFOLIOS,
  CREATE_PORTFOLIO,
  GET_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  GET_USER_PORTFOLIOS,
  FORUM_CATEGORIES,
  TOPICS_BY_CATEGORY,
  CREATE_TOPIC,
  CREATE_FORUM_CATEGORY,
  TOPIC_BY_SLUG,
  CREATE_POST,
  POSTS_BY_TOPIC,
  GET_HIGHLIGHT,
  SIGN_OUT,
} from '../queries';

// Authentication action ----------------------

export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signedInUser },
      });
    },
  });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useGetUser = () => useQuery(GET_USER);
export const useLazyGetUser = () => useLazyQuery(GET_USER);

// Portfolios ------------------------------
export const useGetHighlight = (options) => useQuery(GET_HIGHLIGHT, options);
export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetPortfolio = (options) => useQuery(GET_PORTFOLIO, options);
export const useCreatePortfolios = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
  });

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { userPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS,
      });
      const newPortfolios = userPortfolios.filter(
        (p) => p._id !== deletePortfolio,
      );
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        data: { userPortfolios: newPortfolios },
      });
    },
  });

// Forums ---------------------------------------------

export const useGetForumCategories = () => useQuery(FORUM_CATEGORIES);
export const useGetTopicsByCategory = (options) =>
  useQuery(TOPICS_BY_CATEGORY, options);
export const useGetTopicBySlug = (options) => useQuery(TOPIC_BY_SLUG, options);
export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: TOPICS_BY_CATEGORY,
          variables: {
            category: createTopic.forumCategory.slug,
          },
        });
        cache.writeQuery({
          query: TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topicsByCategory, createTopic] },
          variables: {
            category: createTopic.forumCategory.slug,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

export const useCreateForumCategory = () =>
  useMutation(CREATE_FORUM_CATEGORY, {
    update(cache, { data: { createForumCategory } }) {
      const { forumCategories } = cache.readQuery({ query: FORUM_CATEGORIES });
      cache.writeQuery({
        query: FORUM_CATEGORIES,
        data: { forumCategories: [...forumCategories, createForumCategory] },
      });
    },
  });

export const useCreatePost = () =>
  useMutation(CREATE_POST, {
    update(cache) {
      try {
        Object.keys(cache.data.data).forEach((key) => {
          key.match(/^Post/) && cache.data.delete(key);
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
export const useGetPostsByTopic = (options) =>
  useQuery(POSTS_BY_TOPIC, options);

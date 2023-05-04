import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const postCount = 5;

export const postsApi = createApi({
  tagTypes: ['post', 'tag'],
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: (page) => ({
        url: 'articles',
        method: 'get',
        params: {
          limit: postCount,
          offset: (page - 1) * postCount,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
      }),
      providesTags: ['post'],
    }),
    getPost: build.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
      }),
      providesTags: ['tag'],
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    checkAuth: build.query({
      query: () => ({
        url: 'user',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: 'user',
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
        body,
      }),
    }),
    addPost: build.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
        body,
      }),
      invalidatesTags: ['post'],
    }),
    updatePost: build.mutation({
      query: ({ body, slug }) => ({
        url: `articles/${slug}`,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
        body: body,
      }),
      invalidatesTags: ['tag', 'post'],
    }),
    deletePost: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
      }),
      invalidatesTags: ['post'],
    }),
    favoritePost: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
      }),
      invalidatesTags: ['tag', 'post'],
    }),
    unfavoritePost: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${Cookies.get('Token')}`,
        },
      }),
      invalidatesTags: ['tag', 'post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddUserMutation,
  useCheckAuthQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useFavoritePostMutation,
  useUnfavoritePostMutation,
} = postsApi;

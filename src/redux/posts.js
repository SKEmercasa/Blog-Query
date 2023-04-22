import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const postsApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: (page) => `articles?limit=5&offset=${(page - 1) * 5}`,
    }),
    getPost: build.query({
      query: (slug) => `articles/${slug}`,
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
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddUserMutation,
  useCheckAuthQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
} = postsApi;

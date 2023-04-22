import { configureStore } from '@reduxjs/toolkit';

import { postsApi } from './posts';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(postsApi.middleware),
});

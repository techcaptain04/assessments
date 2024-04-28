
import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: 'MY_ACCESS_KEY',
  fetch: fetch,
});
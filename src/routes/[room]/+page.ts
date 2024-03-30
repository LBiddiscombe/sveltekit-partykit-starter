import type { PageLoad } from './$types';

export const load = (async ({ params, url }) => {
  return { params, url };
}) satisfies PageLoad;
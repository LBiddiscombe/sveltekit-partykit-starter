import type { LayoutServerLoad } from './$types';
import { getCode, getName } from '$lib';

export const load = (async () => {
  return { userName: getName(), roomId: getCode() };
}) satisfies LayoutServerLoad;
import { plugin } from './plugins';

/**
 * @description
 * Create a vue plugin for petite-pulse
 */
export const createPulse = function () {
  return plugin();
};

export * from './atom';
export * from './store';
export * from './types';


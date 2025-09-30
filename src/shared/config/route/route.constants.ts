import { CacheStrategy } from './route.enums';

/**
 * Cache time constants (in milliseconds)
 */
export const CACHE_TIMES = {
  [CacheStrategy.NO_CACHE]: 0,
  [CacheStrategy.CACHE]: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

/**
 * Default minimum display times (in milliseconds)
 */
export const MIN_DISPLAY_TIMES = {
  FAST: 300,
  NORMAL: 800,
  SLOW: 2000,
} as const;

/**
 * Route patterns for dynamic matching
 */
export const ROUTE_PATTERNS = {
  DYNAMIC: {
    USER_PROFILE: '/profile/[userId]',
    WORKSPACE_PROJECT: '/workspace/[projectId]',
    ADMIN_USER: '/admin/users/[userId]',
  },
  WILDCARD: {
    API: '/api/*',
    ADMIN: '/admin/*',
    WORKSPACE: '/workspace/*',
  },
} as const;

/**
 * Cache key prefixes
 */
export const CACHE_KEY_PREFIXES = {
  ROUTE: 'route-cache',
  LOADER: 'loader-cache',
  USER: 'user-cache',
  APP: 'app-cache',
} as const;

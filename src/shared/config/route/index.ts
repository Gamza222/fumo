/**
 * Route Configuration Exports
 */

// Main configuration functions
export { getCurrentRouteConfig, getRouteConfig } from './route.config';

// Route enums (needed for route identification)
export { AppRoute, LoaderType, CacheStrategy } from './route.enums';

// Essential types (needed for TypeScript)
export type { RouteConfig, CurrentRouteInfo } from './route.types';

// Constants (needed for cache management)
export { CACHE_TIMES, MIN_DISPLAY_TIMES } from './route.constants';

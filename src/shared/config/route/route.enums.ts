/**
 * Route Configuration Enums
 * Centralized route identifiers and types
 */

/**
 * Application routes - all available routes in the app
 */
export enum AppRoute {
  HOME = '/',
  ABOUT = '/about',
}

/**
 * Route types - categories for different route behaviors
 */
export enum RouteType {
  PUBLIC = 'public',
  PROTECTED = 'protected',
  ADMIN_ONLY = 'admin-only',
  AUTH = 'auth',
}

/**
 * Loader types - different loading behaviors
 */
export enum LoaderType {
  NONE = 'none',
  FULL = 'full',
  CUSTOM = 'custom',
}

/**
 * Cache strategies for routes
 */
export enum CacheStrategy {
  NO_CACHE = 'no-cache',
  CACHE = 'long-cache',
}

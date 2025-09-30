import { AppRoute, RouteType, LoaderType, CacheStrategy } from './route.enums';

/**
 * Loader configuration for a specific route
 */
export interface RouteLoaderConfig {
  type: LoaderType;
  enabled: boolean;
  minDisplayTime?: number;
  showProgress?: boolean;
  showStepDetails?: boolean;
  customMessage?: string;
}

/**
 * Cache configuration for a specific route
 */
export interface RouteCacheConfig {
  strategy: CacheStrategy;
  enabled: boolean;
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
}

/**
 * Route metadata and behavior configuration
 */
export interface RouteConfig {
  route: AppRoute;
  type: RouteType;
  loader: RouteLoaderConfig;
  cache: RouteCacheConfig;
  metadata?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
    layout?: string;
  };
}

/**
 * Default configuration that applies to all routes
 */
export interface DefaultRouteConfig {
  loader: RouteLoaderConfig;
  cache: RouteCacheConfig;
}

/**
 * Route configuration selector function type
 */
export type RouteConfigSelector = (route: string) => RouteConfig | null;

/**
 * Current route information
 */
export interface CurrentRouteInfo {
  route: AppRoute;
  pathname: string;
  config: RouteConfig;
  isMatched: boolean;
}

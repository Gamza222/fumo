import { AppRoute, RouteType, LoaderType, CacheStrategy } from './route.enums';
import {
  RouteConfig,
  DefaultRouteConfig,
  RouteConfigSelector,
  CurrentRouteInfo,
} from './route.types';
import { CACHE_TIMES, MIN_DISPLAY_TIMES, CACHE_KEY_PREFIXES } from './route.constants';

/**
 * Default configuration that applies to all routes
 */
export const defaultRouteConfig: DefaultRouteConfig = {
  loader: {
    type: LoaderType.CUSTOM,
    enabled: true,
    minDisplayTime: MIN_DISPLAY_TIMES.NORMAL,
    showProgress: true,
    showStepDetails: false,
  },
  cache: {
    strategy: CacheStrategy.CACHE,
    enabled: true,
    ttl: CACHE_TIMES[CacheStrategy.CACHE],
  },
};

/**
 * Route-specific configurations
 * Override defaults for specific routes
 */
export const routeConfigs: Record<AppRoute, Partial<RouteConfig>> = {
  [AppRoute.HOME]: {
    route: AppRoute.HOME,
    type: RouteType.PUBLIC,
    loader: {
      type: LoaderType.FULL,
      enabled: true,
      minDisplayTime: MIN_DISPLAY_TIMES.SLOW,
      showProgress: true,
      showStepDetails: true,
      customMessage: 'Loading...',
    },
    cache: {
      strategy: CacheStrategy.CACHE,
      enabled: true,
      key: `${CACHE_KEY_PREFIXES.ROUTE}-home`,
    },
    metadata: {
      title: 'Home - Fumo',
      description: 'Fumo main page',
      requiresAuth: false,
    },
  },

  [AppRoute.ABOUT]: {
    route: AppRoute.ABOUT,
    type: RouteType.PUBLIC,
    ...defaultRouteConfig,
    metadata: {
      title: 'About - Fumo',
      description: 'Learn more about Fumo',
      requiresAuth: false,
    },
  },
};

/**
 * Get route configuration for a specific route
 * Merges route-specific config with defaults
 */
export const getRouteConfig = (route: AppRoute): RouteConfig => {
  const specificConfig = routeConfigs[route];

  return {
    route,
    type: specificConfig.type || RouteType.PUBLIC,
    loader: {
      ...defaultRouteConfig.loader,
      ...specificConfig.loader,
    },
    cache: {
      ...defaultRouteConfig.cache,
      ...specificConfig.cache,
      ttl:
        specificConfig.cache?.ttl ||
        CACHE_TIMES[specificConfig.cache?.strategy || CacheStrategy.CACHE],
    },
    metadata: specificConfig.metadata || {},
  };
};

/**
 * Get current route configuration based on pathname
 * Handles dynamic routes and fallbacks
 */
export const getCurrentRouteConfig = (pathname: string | null | undefined): CurrentRouteInfo => {
  // Handle null/undefined pathname
  const safePathname = pathname || '/';

  // Try exact match first
  const exactRoute = Object.values(AppRoute).find((route) => route === (safePathname as AppRoute));

  if (exactRoute) {
    return {
      route: exactRoute,
      pathname: safePathname,
      config: getRouteConfig(exactRoute),
      isMatched: true,
    };
  }

  // Handle dynamic routes and patterns
  for (const route of Object.values(AppRoute)) {
    if (safePathname.startsWith(route) && route !== AppRoute.HOME) {
      return {
        route: route as AppRoute,
        pathname: safePathname,
        config: getRouteConfig(route as AppRoute),
        isMatched: true,
      };
    }
  }

  // Fallback to home route
  return {
    route: AppRoute.HOME,
    pathname: safePathname,
    config: getRouteConfig(AppRoute.HOME),
    isMatched: false,
  };
};

/**
 * Create a route configuration selector
 * Useful for components that need to react to route changes
 */
export const createRouteConfigSelector = (): RouteConfigSelector => {
  return (pathname: string) => {
    const currentRoute = getCurrentRouteConfig(pathname);
    return currentRoute.isMatched ? currentRoute.config : null;
  };
};

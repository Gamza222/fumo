import { AppRoute, getCurrentRouteConfig } from "@/shared/config/route";
import { useMemo } from "react";

export const useRouteVisibility = (
  pathname: string,
  route: AppRoute
): boolean => {
  return useMemo(() => {
    const routeConfig = getCurrentRouteConfig(pathname).config;
    return routeConfig.route === route;
  }, [pathname]);
};

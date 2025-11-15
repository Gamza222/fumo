import { AppRoute, getRouteConfig, RouteType } from "@/shared/config/route";
import { INavLink } from "../types/types";

export const getNavigationLinks = (): INavLink[] => {
  return Object.values(AppRoute)
    .map((route) => {
      const config = getRouteConfig(route);

      if (config.type !== RouteType.PUBLIC) {
        return null;
      }

      const title = config.metadata?.title || route;
      const cleanLabel = title.replace(/ - Fumo$/, "").trim();

      return {
        href: route,
        label: cleanLabel,
      };
    })
    .filter((link): link is INavLink => link !== null);
};

export const NAV_LINKS: INavLink[] = getNavigationLinks();

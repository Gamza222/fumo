import { AppRoute } from "@/shared/config/route";
import { INavLink } from "../../model/types/types";

/**
 * Check if a navigation link is active based on current path
 *
 * @param linkHref - The link's target route
 * @param currentPath - The current active route
 * @returns boolean indicating if link is active
 */
export const isLinkActive = (
  linkHref: AppRoute,
  currentPath: AppRoute
): boolean => {
  return linkHref === currentPath;
};

/**
 * Get navigation links with active state computed
 *
 * @param links - Array of navigation links
 * @param currentPath - Current active route
 * @returns Links with isActive property set
 */
export const getLinksWithActiveState = (
  links: INavLink[],
  currentPath: AppRoute
): INavLink[] => {
  return links.map((link) => ({
    ...link,
    isActive: isLinkActive(link.href, currentPath),
  }));
};

// NO "use client" - Server Component
import { headers } from "next/headers";
import { getCurrentRouteConfig } from "@/shared/config/route";
import { NAV_LINKS } from "../model/constants/constants";
import { getLinksWithActiveState } from "../lib/links/links";
import { NavbarDesktop } from "./NavbarDesktop/NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile/NavbarMobile";
import type { NavbarProps } from "../model/types/types";
import { NavbarClientWrapper } from "./NavbarClientWrapper/NavbarClientWrapper";

/**
 * Main Navbar - Server Component
 * Computes navigation data on server, renders both mobile/desktop
 * CSS media queries control which navbar shows
 */
export const Navbar = async ({ className }: NavbarProps) => {
  // SERVER: Get current pathname
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  // SERVER: Compute active links based on current route
  const currentRoute = getCurrentRouteConfig(pathname);
  const navLinks = getLinksWithActiveState(NAV_LINKS, currentRoute.route);

  // Render both navbars - CSS handles responsive visibility
  return <NavbarClientWrapper links={navLinks} className={className} />;
};

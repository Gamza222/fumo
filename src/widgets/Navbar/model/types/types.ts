import { AppRoute } from "@/shared/config/route";
import { ReactNode } from "react";

export interface NavbarProps {
  className?: string;
}

export interface INavLink {
  href: AppRoute;
  label: string;
  icon?: ReactNode;
  isActive?: boolean;
}

export interface NavbarDesktopProps {
  className?: string;
  currentPath: AppRoute;
  isVisible: boolean;
}

export interface NavbarMobileProps {
  className?: string;
  currentPath: AppRoute;
  isVisible: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

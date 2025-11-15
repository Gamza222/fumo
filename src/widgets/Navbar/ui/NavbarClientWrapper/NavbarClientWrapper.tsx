"use client";

import { useState } from "react";
import { NavbarDesktop } from "../NavbarDesktop/NavbarDesktop";
import { NavbarMobile } from "../NavbarMobile/NavbarMobile";
import type { INavLink } from "../../model/types/types";

interface NavbarClientWrapperProps {
  links: INavLink[];
  className?: string;
}

export const NavbarClientWrapper = ({
  links,
  className,
}: NavbarClientWrapperProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggle = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <>
      <NavbarDesktop links={links} className={className} />
      <NavbarMobile
        links={links}
        className={className}
        isOpen={isMobileOpen}
        onToggle={handleToggle}
      />
    </>
  );
};

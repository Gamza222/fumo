"use client";

import styles from "./NavbarDesktop.module.scss";
import { classNames } from "@/shared/lib/utils/classNames";
import { Mods } from "@/shared/lib/utils/classNames/classNames";

import { memo } from "react";
import { useNavbarVisibility } from "../../hooks/useNavbarVisibility/useNavbarVisibility";

import { NavLink } from "../NavLink/NavLink";

import type { INavLink } from "../../model/types/types";

interface NavbarDesktopProps {
  links: INavLink[];
  className?: string;
}

export const NavbarDesktop = memo<NavbarDesktopProps>(
  ({ links, className }) => {
    const isVisible = useNavbarVisibility();

    const desktopMods: Mods = {
      [styles.visible || ""]: isVisible,
    };

    return (
      <nav
        className={classNames(styles.navbarDesktop || "", desktopMods, [
          className,
        ])}
      >
        <div className={styles.content}>
          <ul className={styles.navLinks}>
            {links.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <NavLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
);

NavbarDesktop.displayName = "NavbarDesktop";

"use client";

import styles from "./NavbarMobile.module.scss";
import { classNames } from "@/shared/lib/utils/classNames";
import { Mods } from "@/shared/lib/utils/classNames/classNames";

import { memo, useEffect, useCallback } from "react";
import { useNavbarVisibility } from "../../hooks/useNavbarVisibility/useNavbarVisibility";

import type { INavLink } from "../../model/types/types";

import { NavLink } from "../NavLink/NavLink";

interface NavbarMobileProps {
  links: INavLink[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const NavbarMobile = memo<NavbarMobileProps>(
  ({ links, isOpen, onToggle, className }) => {
    const isVisible = useNavbarVisibility();

    // Close menu on Escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onToggle();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden"; // Prevent scroll
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }, [isOpen, onToggle]);

    const handleLinkClick = useCallback(() => {
      if (isOpen) {
        onToggle();
      }
    }, [isOpen, onToggle]);

    const mobileMods: Mods = {
      [styles.visible || ""]: isVisible,
    };

    const overlayMods: Mods = {
      [styles.open || ""]: isOpen,
    };

    const hamburgerMods: Mods = {
      [styles.open || ""]: isOpen,
    };

    return (
      <div
        className={classNames(styles.navbarMobile || "", { ...mobileMods }, [
          className,
        ])}
      >
        {/* Hamburger Button */}
        <button
          className={classNames(styles.hamburger || "", hamburgerMods)}
          onClick={onToggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          type="button"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
        {/* Mobile Menu */}
        <div className={classNames(styles.menu || "", overlayMods)}>
          <ul className={styles.navLinks}>
            {links.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <NavLink link={link} onClick={handleLinkClick} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

NavbarMobile.displayName = "NavbarMobile";

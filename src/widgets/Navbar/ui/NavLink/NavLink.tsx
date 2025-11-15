"use client";

import styles from "./NavLink.module.scss";
import { Mods } from "@/shared/lib/utils/classNames/classNames";
import { classNames } from "@/shared/lib/utils/classNames";

import { memo } from "react";
import { INavLink } from "../../model/types/types";

import { Text, TextSize } from "@/shared/ui/Text";

import Link from "next/link";
import { TextColor, TextVariant } from "@/shared/ui/Text/Text.types";

interface NavLinkProps {
  link: INavLink;
  onClick?: () => void;
  className?: string;
}

export const NavLink = memo<NavLinkProps>(({ link, onClick, className }) => {
  const navLinkMods: Mods = {
    [styles.active || ""]: link.isActive,
  };

  return (
    <Link
      href={link.href}
      className={classNames(styles.navLink || "", { ...navLinkMods }, [
        className,
      ])}
      onClick={onClick}
    >
      {link.icon && <span className={styles.icon}>{link.icon}</span>}
      <Text
        size={TextSize.SM}
        color={TextColor.BLACK}
        variant={TextVariant.PRIMARY}
        as="span"
        className={styles.label}
      >
        {link.label}
      </Text>
    </Link>
  );
});

NavLink.displayName = "NavLink";

"use client";

import { classNames } from "@/shared/lib/utils/classNames";
import { useHomePageAnimation } from "../hooks/useHomePageAnimation/useHomePageAnimation";
import styles from "./HomePage.module.scss";
import { Mods } from "@/shared/lib/utils/classNames/classNames";
import { HomeHero } from "./HomeHero/HomeHero";

interface HomePageProps {
  className?: string;
}

const HomePage = ({ className }: HomePageProps) => {
  const { isVisible, style } = useHomePageAnimation();

  const homePageMods: Mods = {
    [styles.homePageVisible || ""]: isVisible,
  };

  return (
    <div
      className={classNames(styles.homePage || "", { ...homePageMods }, [
        className,
      ])}
      style={style}
    >
      <HomeHero />
    </div>
  );
};

export default HomePage;

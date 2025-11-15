"use client";

import { memo } from "react";
import { Window } from "@/shared/ui/Window";
import styles from "./HomeHero.module.scss";
import { classNames } from "@/shared/lib/utils/classNames";

interface HomeHeroProps {
  className?: string;
}

export const HomeHero = memo<HomeHeroProps>(({ className }) => {
  return (
    <section className={classNames(styles.homeHero || "", {}, [className])}>
      <Window title="Welcome to Fumo" showTitleBar showCloseButton={false}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Welcome to Fumo!</h1>
          <p className={styles.description}>ROMA I OWN U</p>
          <p className={styles.description}>Your workspace is ready to use.</p>
        </div>
      </Window>
    </section>
  );
});

HomeHero.displayName = "HomeHero";

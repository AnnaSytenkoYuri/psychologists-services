"use client";

import Link from "next/link";
import css from "./Navigation.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type NavVariant = "header" | "burger";

interface NavigationProps {
  variant?: NavVariant;
  onClick?: () => void;
}

export default function Navigation({
  variant = "header",
  onClick,
}: NavigationProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  // if (loading && !user) return null;

  return (
    <nav className={`${css.nav} ${css[variant]}`} aria-label="Main Navigation">
      <ul className={css.navList}>
        <li className={css.navigationItem}>
          <Link
            href="/"
            prefetch={false}
            className={`${css.navigationLink} ${
              pathname === "/" ? css.active : ""
            }`}
            onClick={onClick}
          >
            Home
          </Link>
        </li>

        <li className={css.navigationItem}>
          <Link
            className={`${css.navigationLink} ${
              pathname === "/psychologists" ? css.active : ""
            }`}
            href="/psychologists"
            prefetch={false}
            onClick={onClick}
          >
            Psychologists
          </Link>
        </li>
        {user && (
          <li className={css.navigationItem}>
            <Link
              className={`${css.navigationLink} ${
                pathname === "/favorites" ? css.active : ""
              }`}
              href="/favorites"
              prefetch={false}
              onClick={onClick}
            >
              Favorites
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

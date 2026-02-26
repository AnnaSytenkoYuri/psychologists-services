"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./Navigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";

type NavVariant = "header" | "burger";

interface NavigationProps {
  variant?: NavVariant;
  onClick?: () => void;
}

export type PublicUser = {
  _id: number;
  name: string;
  avatar?: string;
};

export default function Navigation({
  variant = "header",
  onClick,
}: NavigationProps) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return null;
  }

  const handleLogout = () => {
    onClick?.();
    router.push("/confirm/logout");
  };

  const currentUser = user as PublicUser | null;
  const firstLetter = currentUser?.name?.charAt(0).toUpperCase();
  const avatarSrc = currentUser?.avatar?.trim() || "";
  const hasImage = avatarSrc.startsWith("http");

  return (
    <nav className={`${css.nav} ${css[variant]}`} aria-label="Main Navigation">
      {isAuthenticated ? (
        <>
          <ul className={css.navList}>
            <li className={css.navigationItem}>
              <Link
                href="/"
                prefetch={false}
                className={css.navigationLink}
                onClick={onClick}
              >
                Home
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                className={css.navigationLink}
                href="/psychologists"
                prefetch={false}
                onClick={onClick}
              >
                Psychologists
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                className={css.navigationLink}
                href="/favorites"
                prefetch={false}
                onClick={onClick}
              >
                Favorites
              </Link>
            </li>
          </ul>

          <div className={css.userContainer}>
            <div className={css.userBox}>
              <div className={css.avatar}>
                {hasImage ? (
                  <Image
                    src={avatarSrc}
                    alt={`${currentUser?.name} avatar`}
                    width={32}
                    height={32}
                    className={css.avatar}
                    priority
                  />
                ) : (
                  <div className={css.avatarPlaceholder} aria-hidden="true">
                    {firstLetter}
                  </div>
                )}
              </div>
              <p className={css.username}>{currentUser?.name}</p>
            </div>
            <span className={css.divider} aria-hidden="true" />
            <button
              type="button"
              className={css.logoutBtn}
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <ul className={css.navList}>
            <li className={css.navigationItem}>
              <Link
                href="/"
                prefetch={false}
                className={css.navigationLink}
                onClick={onClick}
              >
                Home
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                className={css.navigationLink}
                href="/psychologists"
                prefetch={false}
                onClick={onClick}
              >
                Psychologists
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                className={css.navigationLink}
                href="/auth/login"
                prefetch={false}
                onClick={onClick}
              >
                Login
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                className={`${css.navigationLinkBtn} button button--primary`}
                href="/auth/register"
                prefetch={false}
                onClick={onClick}
              >
                Register
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

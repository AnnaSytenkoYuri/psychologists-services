"use client";
import Link from "next/link";
import css from "./Header.module.css";
import Navigation from "./Navigation/Navigation";
import UserMenu from "./UserMenu/UserMenu";
import AuthButtons from "./AuthButtons/AuthButtons";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerContainer}>
          <Link href="/" className={css.logo}>
            <svg
              width="218"
              height="28"
              viewBox="0 0 346 32"
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-psychologistsservices" />
            </svg>
          </Link>
          {/* Desktop navigation */}

          <div className={css.navDesktop}>
            <Navigation variant="header" />
            {user ? <UserMenu /> : <AuthButtons />}
          </div>
        </div>
      </div>
    </header>
  );
}

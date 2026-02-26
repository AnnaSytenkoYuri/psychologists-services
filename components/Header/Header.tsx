import Link from "next/link";
import css from "./Header.module.css";
import Navigation from "./Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerContainer}>
          <Link href="/" className={css.logo}>
            <svg width="83" height="15" viewBox="0 0 177 32" aria-hidden="true">
              <use href="/sprite.svg#icon-psychologistsservices" />
            </svg>
          </Link>
          {/* Desktop navigation */}

          <div className={css.navDesktop}>
            <Navigation variant="header" />
          </div>
        </div>
      </div>
    </header>
  );
}

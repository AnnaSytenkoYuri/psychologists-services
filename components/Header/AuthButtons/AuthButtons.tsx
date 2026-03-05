import Link from "next/link";
import css from "./AuthButtons.module.css";

export default function AuthButtons({ onClick }: { onClick?: () => void }) {
    return (
        <div className={css.authButtons}>
        <Link
          className={css.loginBtn}
          href="/auth/login"
          prefetch={false}
          onClick={onClick}
        >
          Login
        </Link>
      
        <Link
          className={`${css.registerBtn} button button--primary`}
          href="/auth/register"
          prefetch={false}
          onClick={onClick}
        >
          Register
        </Link>
  </div>
    )
}

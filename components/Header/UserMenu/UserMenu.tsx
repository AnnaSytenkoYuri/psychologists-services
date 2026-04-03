import Image from "next/image";
import css from "./UserMenu.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/auth";

export type PublicUser = {
  _id: number;
  name: string;
  avatar?: string;
};

export default function UserMenu() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {

    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const currentUser = {
    name: user?.displayName || user?.email,
    avatar: user?.photoURL,
  };

  if (!currentUser) return null;
  // const firstLetter = currentUser?.name?.charAt(0).toUpperCase();
  const avatarSrc = currentUser?.avatar?.trim() || "";
  const hasImage = avatarSrc.startsWith("http");

  return (
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z"
                  fill="#FBFBFB"
                />
              </svg>
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
        aria-label="Log out"
      >
        Log out
      </button>
    </div>
  );
}

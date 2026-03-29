import Image from "next/image";
import css from "./UserMenu.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export type PublicUser = {
  _id: number;
  name: string;
  avatar?: string;
};

export default function UserMenu({ onClick }: { onClick?: () => void }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    onClick?.();
    router.push("/confirm/logout");
  };

  const currentUser = {
    name: user?.displayName || user?.email,
    avatar: user?.photoURL,
  };

  if (!currentUser) return null;
  const firstLetter = currentUser?.name?.charAt(0).toUpperCase();
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
  );
}

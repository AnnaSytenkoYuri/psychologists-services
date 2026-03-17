"use client";
import { useRouter } from "next/navigation";
import css from "./layout.module.css";

export default function ModalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={css.overlay}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.modal}
      >
        {children}
      </div>
    </div>
  )
}
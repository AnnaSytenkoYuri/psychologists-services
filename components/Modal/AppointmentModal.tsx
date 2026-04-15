"use client";

import {
  AppointmentFormData,
  appointmentSchema,
} from "@/validation/appointment.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import css from "./AppointmentModal.module.css";
import Image from "next/image";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist: { name: string; avatar: string };
}

export default function AppointmentModal({
  isOpen,
  onClose,
  psychologist,
}: AppointmentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Form data:", data);
    onClose();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {/* ❌ close */}
        <button className={css.closeBtn} onClick={onClose}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M24 8L8 24"
            stroke="#191A15"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M8 8L24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </svg>
        </button>

        <h2 className={css.title}>Make an appointment with a psychologists</h2>

        <p className={css.text}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        {/* 👩‍⚕️ */}
        <div className={css.psychologist}>
          <Image
            className={css.avatar}
            src={psychologist.avatar}
            alt={psychologist.name}
            width={44}
            height={44}
          />
          <div className={css.info}>
            <p className={css.label}>Your psychologists</p>
            <p className={css.name}>{psychologist.name}</p>
          </div>
        </div>

        {/* 📝 FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <input className={css.input} placeholder="Name" {...register("name")} />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}

          <div className={css.row}>
            <input className={css.input} placeholder="+380" {...register("phone")} />
            <input className={css.input} placeholder="00:00" {...register("time")} />
          </div>

          {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
          {errors.time && <p className={css.error}>{errors.time.message}</p>}

          <input className={css.input} placeholder="Email" {...register("email")} />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}

          <textarea placeholder="Comment" {...register("comment")} className={css.textarea} />
          {errors.comment && (
            <p className={css.error}>{errors.comment.message}</p>
          )}

          <button type="submit" className={css.submit}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

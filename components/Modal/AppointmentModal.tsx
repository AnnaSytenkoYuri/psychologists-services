"use client";

import {
  AppointmentFormData,
  appointmentSchema,
} from "@/validation/appointment.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
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

  const [showTime, setShowTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

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
          <div className={css.formGroup}>
            <input
              className={css.input}
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.row}>
            <div className={css.formGroup}>
              <input
                className={css.input}
                placeholder="+380"
                {...register("phone")}
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </div>

            <div className={css.formGroup}>
              <div className={css.timeWrapper}>
                <input
                  className={css.input}
                  placeholder="00:00"
                  {...register("time")}
                  value={selectedTime}
                  readOnly
                  onClick={() => setShowTime(!showTime)}
                />
                {/* Icon */}
                <svg
                  className={css.timeIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_42_1350)">
                    <path
                      d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6024 18.3337 10C18.3337 5.39763 14.6027 1.66667 10.0003 1.66667C5.39795 1.66667 1.66699 5.39763 1.66699 10C1.66699 14.6024 5.39795 18.3333 10.0003 18.3333Z"
                      stroke="#191A15"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 5V10L13.3333 11.6667"
                      stroke="#191A15"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_42_1350">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                {showTime && (
                  <div className={css.timeDropdown}>
                    <p className={css.timeTitle}>Meeting time</p>
                    {["09:00", "10:00", "11:00", "14:00"].map((time) => (
                      <p
                        key={time}
                        className={css.timeOption}
                        onClick={() => {
                          setSelectedTime(time);
                          setShowTime(false);
                        }}
                      >
                        {time}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              {errors.time && (
                <p className={css.error}>{errors.time.message}</p>
              )}
            </div>
          </div>
          <div className={css.formGroup}>
            <input
              className={css.input}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.formGroup}>
            <textarea
              placeholder="Comment"
              {...register("comment")}
              className={css.textarea}
            />
            {errors.comment && (
              <p className={css.error}>{errors.comment.message}</p>
            )}
          </div>

          <button type="submit" className={css.submit}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

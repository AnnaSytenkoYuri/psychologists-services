import { Psychologist } from "@/types/psychologists";
import Image from "next/image";
import css from "./PsychologistsCard.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/lib/api/favorites";
import { useRouter } from "next/navigation";
import AppointmentModal from "../Modal/AppointmentModal";

export default function PsychologistCard({ item }: { item: Psychologist }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const ids = await getFavorites(user.uid);
        if (ids.includes(item.id)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    checkFavorite();
  }, [user, item.id]);

  const toggleFavorite = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    try {
      if (isFavorite) {
        await removeFromFavorites(user.uid, item.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(user.uid, item.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };
  return (
    // <div className="container">
    <div className={`${css.card} ${expanded ? css.expanded : ""}`}>
      <div className={css.rightSide}>
        <Image
          src={item.avatar_url}
          alt={item.name}
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      <div className={css.leftSide}>
        <div className={css.top}>
          <p className={css.text}>Psychologist</p>
          <div className={css.rightTop}>
            <div className={css.ratingContainer}>
              <p className={css.textRating}>
                <span>
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.88965 4.12576C9.0488 4.42728 9.33887 4.63789 9.6748 4.69608L13.4746 5.35233L10.7871 8.1199C10.5496 8.36447 10.4388 8.70529 10.4873 9.04276L11.0361 12.8601L7.5752 11.159L7.45801 11.1092C7.21993 11.0246 6.95976 11.0246 6.72168 11.1092L6.60449 11.159L3.14258 12.8601L3.69238 9.04276C3.74091 8.70529 3.6301 8.36447 3.39258 8.1199L0.704102 5.35233L4.50488 4.69608C4.84082 4.63789 5.13088 4.42728 5.29004 4.12576L7.08984 0.71463L8.88965 4.12576Z"
                      fill="#FFC531"
                      stroke="#FFC531"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
                <span>Rating: {item.rating}</span>
              </p>
              <span className={css.divider}>
                <svg
                  width="1"
                  height="16"
                  viewBox="0 0 1 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.5 0V16" stroke="#191A15" strokeOpacity="0.2" />
                </svg>
              </span>
              <p className={css.textPrice}>
                Price / 1 hour:{" "}
                <span className={css.textSpan}>{item.price_per_hour}$</span>
              </p>
            </div>
            <div className={css.heart} onClick={toggleFavorite}>
              {!loading && (
                <svg
                  className={isFavorite ? css.heartActive : ""}
                  width="25"
                  height="22"
                  viewBox="0 0 25 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.8989 2.74614C21.3456 2.19257 20.6886 1.75343 19.9655 1.45382C19.2425 1.15421 18.4674 1 17.6847 1C16.902 1 16.127 1.15421 15.4039 1.45382C14.6809 1.75343 14.0239 2.19257 13.4706 2.74614L12.3222 3.89448L11.1739 2.74614C10.0562 1.62848 8.54035 1.00058 6.95973 1.00058C5.37911 1.00058 3.86323 1.62848 2.74557 2.74614C1.6279 3.86381 1 5.37969 1 6.96031C1 8.54093 1.6279 10.0568 2.74557 11.1745L3.8939 12.3228L12.3222 20.7511L20.7506 12.3228L21.8989 11.1745C22.4525 10.6212 22.8916 9.96419 23.1912 9.24111C23.4908 8.51803 23.645 7.74301 23.645 6.96031C23.645 6.17762 23.4908 5.40259 23.1912 4.67951C22.8916 3.95643 22.4525 3.29946 21.8989 2.74614Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        <h3 className={css.name}>{item.name}</h3>
        <ul className={css.list}>
          <li className={css.listItem}>{item.experience}</li>
          <li className={css.listItem}>{item.license}</li>
          <li className={css.listItem}>{item.specialization}</li>
          <li className={css.listItem}>{item.initial_consultation}</li>
        </ul>
        <p className={css.textAbout}>{item.about}</p>
        <button
          className={css.readMoreBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
        {expanded && (
          <div className={css.reviews}>
            {item.reviews.map((review, index) => (
              <div key={index} className={css.reviewItem}>
                <div className={css.reviewHeader}>
                  <div className={css.avatarSmall}>
                    {review.reviewer.charAt(0)}
                  </div>

                  <div>
                    <p className={css.reviewName}>{review.reviewer}</p>
                    <p className={css.reviewRating}>⭐ {review.rating}</p>
                  </div>
                </div>

                <p className={css.reviewText}>{review.comment}</p>
              </div>
            ))}

            <button
              className={css.bookBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Make an appointment
            </button>
            <AppointmentModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              psychologist={{
                name: item.name,
                avatar: item.avatar_url,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

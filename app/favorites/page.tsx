"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { getPsychologists } from "@/lib/api/api";
import PsychologistsList from "@/components/Psychologists/PsychologistsList";
import Fillter from "@/components/Psychologists/Fillter";
import { useRouter } from "next/navigation";
import { getFavorites } from "@/lib/api/favorites";
import css from "./FavoritesPage.module.css";
import { Psychologist } from "@/types/psychologists";

export default function FavoritesPage() {
  const { user, isAuthChecked } = useAuth();
  const router = useRouter();
  const [limit, setLimit] = useState(3);

  const [data, setData] = useState<Psychologist[]>([]);
  const [sort, setSort] = useState("name-asc");

  useEffect(() => {
    if (!isAuthChecked) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchFavorites = async () => {
      const ids = await getFavorites(user.uid);
      const all = await getPsychologists(limit);

      const filtered = all.filter((p) => ids.includes(p.id));
      setData(filtered);
    };

    fetchFavorites();
  }, [user, isAuthChecked, router, limit]);

  if (data.length === 0) {
    return <p className={css.noData}>No favorites yet</p>;
  }

  if (!isAuthChecked) {
    return (
      <div className={css.loaderWrapper}>
        <p className={css.loader}>Loading...</p> 
      </div>
  ); 
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <Fillter onChange={setSort} />

      <PsychologistsList data={data} sort={sort} />
      <div className={css.btnContainer}>
        <button
          className={css.loadMoreBtn}
          onClick={() => setLimit((prev) => prev + 3)}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

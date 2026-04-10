"use client";

import Fillter from "@/components/Psychologists/Fillter";
import PsychologistsList from "@/components/Psychologists/PsychologistsList";
import { getPsychologists } from "@/lib/api/api";
import { Psychologist } from "@/types/psychologists";
import { useEffect, useState } from "react";
import css from "./PsychologistsPage.module.css"

export default function Page() {
  const [data, setData] = useState<Psychologist[]>([]);
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("name-asc");
  

  useEffect(() => {
    getPsychologists(limit).then(setData);
  }, [limit]);

  return (
    <div className="container">
      <Fillter onChange={setSort} />

      <PsychologistsList data={data} sort={sort} />
     <div className={css.btnContainer}>
      <button className={css.loadMoreBtn} onClick={() => setLimit((prev) => prev + 3)}>
        Load more
      </button>
     </div>
    </div>
  );
}
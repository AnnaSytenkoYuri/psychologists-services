"use client";

import Fillter from "@/components/Psychologists/Fillter";
import PsychologistsList from "@/components/Psychologists/PsychologistsList";
import { getPsychologists } from "@/lib/api/api";
import { Psychologist } from "@/types/psychologists";
import { useEffect, useState } from "react";


export default function Page() {
  const [data, setData] = useState<Psychologist[]>([]);
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("name-asc");

  useEffect(() => {
    getPsychologists(limit).then(setData);
  }, [limit]);

  return (
    <div >
      <Fillter onChange={setSort} />

      <PsychologistsList data={data} sort={sort} />

      <button onClick={() => setLimit((prev) => prev + 3)}>
        Load more
      </button>
    </div>
  );
}
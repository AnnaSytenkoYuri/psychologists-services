// PsychologistsList.tsx

import { Psychologist } from "@/types/psychologists";
import PsychologistCard from "./PsychologistCard";


export default function PsychologistsList({
  data,
  sort,
}: {
  data: Psychologist[];
  sort: string;
}) {
  const sorted = [...data].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);

      case "price-asc":
        return a.price_per_hour - b.price_per_hour;
      case "price-desc":
        return b.price_per_hour - a.price_per_hour;

      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });

  return (
    <div>
      {sorted.map((item) => (
        <PsychologistCard key={item.id} item={item} />
      ))}
    </div>
  );
}
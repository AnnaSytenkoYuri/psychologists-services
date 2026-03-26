"use client";
import { useState } from "react";
import css from "./Fillter.module.css";

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "price-desc", label: "Less than 10$ ↓" },
  { value: "price-asc", label: "Greater than 10$ ↑" },
  { value: "rating-asc", label: "Popular" },
  { value: "rating-desc", label: "Not popular" },
  { value: "all", label: "Show all" },
];

export default function Fillter({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(options[0]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div className={css.filterContainer}>
    <div className="container">
      <div className={css.wrraper}>
        <p className={css.text}>Filters</p>
        <button
          className={css.trigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          {selected.label}
          <span className={open ? css.arrowUp : css.arrow} />
        </button>

        {open && (
          <div className={css.dropdown}>
            <div className={css.optionsContainer}>
            {options.map((option) => (
              <div
                className={css.option}
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

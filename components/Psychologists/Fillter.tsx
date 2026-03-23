interface SortSelectProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Fillter({ value, onChange }: SortSelectProps) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="name-asc">A → Z</option>
        <option value="name-desc">Z → A</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="rating-asc">Rating ↑</option>
        <option value="rating-desc">Rating ↓</option>
      </select>
    )

}
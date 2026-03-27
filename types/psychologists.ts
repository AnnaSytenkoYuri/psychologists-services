export type Psychologist = {
  id: string;
  name: string;
  avatar_url: string;
  experience: number;
  reviews: Reviews[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: boolean;
  about: string;
};

export type Reviews = {
  reviewer: string;
  rating: number;
  comment: string;
};

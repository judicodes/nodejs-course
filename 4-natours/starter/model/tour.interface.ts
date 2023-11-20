interface TourDto {
  id: number;
  name: string;
  duration: number;
  price: number;
  maxGroupSize?: number;
  difficulty?: string;
  rating?: number;
  summary?: string;
  description?: string;
  imageCover?: string;
  images?: string[];
  startDates?: string[];
}

export { TourDto };

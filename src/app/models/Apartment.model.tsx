export interface Apartment {
  id: number;
  unitName: string;
  unitNumber: number;
  project: string;
  price: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

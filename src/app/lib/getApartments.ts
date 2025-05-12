import { Apartment } from "../models/Apartment.model";

export default async function getApartments() {
  const res = await fetch("http://localhost:3001/apartments", {
    method: "GET",
  });

  const data: Apartment[] = await res.json();

  return data;
}

import { Apartment } from "../models/Apartment.model";

export default async function getApartments(
  apiUrl: string = process.env.NEXT_PUBLIC_API_URL!.replace("api", "localhost")
) {
  const res = await fetch(`${apiUrl}/apartments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  const data: Apartment[] = await res.json();

  return data;
}

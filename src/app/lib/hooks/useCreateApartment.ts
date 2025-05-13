import { useMutation } from "@tanstack/react-query";

type ApartmentForm = {
  formData: {
    unitName: string;
    unitNumber: string;
    project: string;
    price: string;
  };
  urls: string[]; // image URLs
};

export function useCreateApartment() {
  return useMutation({
    mutationFn: async ({ formData, urls }: ApartmentForm) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!.replace(
          "api",
          "localhost"
        )}/apartments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            unitNumber: Number(formData.unitNumber),
            price: parseFloat(formData.price),
            images: urls,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create apartment");

      return response.json(); // return created apartment or confirmation
    },
  });
}

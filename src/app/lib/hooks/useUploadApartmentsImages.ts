import { useMutation } from "@tanstack/react-query";

export function useUploadApartmentsImages() {
  return useMutation({
    mutationFn: async (formDataImages: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!.replace(
          "api",
          "localhost"
        )}/apartments/upload`,
        {
          method: "POST",
          body: formDataImages,
        }
      );

      if (!res.ok) throw new Error("Upload failed");
      return res.json(); // should return { urls }
    },
  });
}

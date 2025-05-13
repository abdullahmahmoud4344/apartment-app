"use client";

import { useCreateApartment } from "@/app/lib/hooks/useCreateApartment";
import { useUploadApartmentsImages } from "@/app/lib/hooks/useUploadApartmentsImages";
import { useState } from "react";

export default function CreateApartmentModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    unitName: "",
    unitNumber: "",
    project: "",
    price: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreviews, setImagePreviews] = useState<
    { file: File; url: string }[]
  >([]);

  const { mutate: uploadImages } = useUploadApartmentsImages();

  const { mutateAsync: createApartment } = useCreateApartment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      const newPreviews = selectedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataImages = new FormData();
      imagePreviews.forEach((p) => formDataImages.append("images", p.file));

      uploadImages(formDataImages, {
        onSuccess: (data) => {
          const { urls } = data;
          createApartment(
            {
              formData,
              urls,
            },
            {
              onSuccess: () => {
                onSuccess();
                onClose();
              },
              onError: () => {
                alert("Failed to create apartment.");
              },
            }
          );
        },
        onError: (err) => {
          throw err;
        },
      });
    } catch (error) {
      console.error(error);
      alert(`An error occurred.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Apartment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="unitName"
            placeholder="Unit Name"
            className="w-full p-2 border"
            onChange={handleChange}
            required
          />
          <input
            name="unitNumber"
            type="number"
            placeholder="Unit Number"
            className="w-full p-2 border"
            onChange={handleChange}
            required
          />
          <input
            name="project"
            placeholder="Project"
            className="w-full p-2 border"
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            className="w-full p-2 border"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border"
          />

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview.url}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

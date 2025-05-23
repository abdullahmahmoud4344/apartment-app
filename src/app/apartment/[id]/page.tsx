import { Apartment } from "@/app/models/Apartment.model";
import Image from "next/image";

export default async function ApartmentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/apartments/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    return <div>Apartment not found.</div>;
  }

  const apartment: Apartment = await res.json();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Image */}
        {apartment.images.length > 0 && (
          <div className="relative w-full h-80 sm:h-96">
            <Image
              src={apartment.images[0]}
              alt={`${apartment.unitName} hero`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Details */}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {apartment.unitName}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <p className="text-gray-600 text-lg">
              <span className="font-medium">Unit Number:</span>{" "}
              {apartment.unitNumber}
            </p>
            <p className="text-xl font-semibold text-blue-600 mt-2 sm:mt-0">
              {apartment.price}
            </p>
          </div>

          {/* Image Grid */}
          {apartment.images.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {apartment.images.map(
                (img, index) =>
                  index > 0 && (
                    <div
                      key={index}
                      className="relative h-48 rounded overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`Apartment image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

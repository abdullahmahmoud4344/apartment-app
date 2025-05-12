import { Apartment } from "@/app/models/Apartment.model";
import Image from "next/image";
import Link from "next/link";

type ApartmentCardProps = {
  apartment: Apartment;
};

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mt-4">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={apartment.images[0]}
          alt="Apartment"
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold">{apartment.unitName}</h2>
      <p className="text-gray-600 font-bold">
        Unit number: <span>{apartment.unitNumber}</span>
      </p>
      <p className="text-gray-600">{apartment.price}</p>

      {apartment.project && (
        <p className="text-gray-600 font-bold truncate max-w-full">
          Project:{" "}
          <span className="block overflow-hidden text-ellipsis">
            {apartment.project}
          </span>
        </p>
      )}

      <Link href={`/apartment/${apartment.id}`}>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          View Details
        </button>
      </Link>
    </div>
  );
}

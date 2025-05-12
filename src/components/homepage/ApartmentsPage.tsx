"use client";
import classes from "./homepage.module.css";
import { Apartment } from "@/app/models/Apartment.model";
import getApartments from "@/app/lib/getApartments";
import ApartmentCard from "./ApartmentCard";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import ApartmentModal from "../ApartmentModal";

const PAGE_SIZE = 8;

export default function ApartmentsPage() {
  const queryClient = useQueryClient();

  const {
    data: apartments,
    isLoading,
    error,
  } = useQuery<Apartment[]>({
    queryKey: ["apartments"],
    queryFn: getApartments,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshApartments = () => {
    queryClient.invalidateQueries({ queryKey: ["apartments"] });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!apartments) return null;

  const filteredApartments = apartments.filter((apt) => {
    const term = searchTerm.toLowerCase();
    return (
      apt.unitName.toLowerCase().includes(term) ||
      apt.project?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(apartments.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedApartments = filteredApartments.slice(
    start,
    start + PAGE_SIZE
  );

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      title="Apartments"
    >
      <div className="text-center my-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
          Discover Your New Home
        </h1>
        <p className="text-gray-600 mb-4">
          Helping 100 million renters find their perfect fit.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search for apartments"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            Create Apartment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedApartments.map((apartment) => (
          <ApartmentCard apartment={apartment} key={apartment.id} />
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {showModal && (
        <ApartmentModal
          onClose={() => setShowModal(false)}
          onSuccess={refreshApartments}
        />
      )}
    </section>
  );
}

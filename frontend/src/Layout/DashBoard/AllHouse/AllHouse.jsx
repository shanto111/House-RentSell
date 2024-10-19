import React, { useState, useEffect } from "react";
import UseAxoisPublic from "../../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";

const AllHouse = () => {
  const { count } = useLoaderData();
  const [itemPerPage, setItemPerPages] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosPublic = UseAxoisPublic();

  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Fetch paginated properties
  const { data: Property, refetch } = useQuery({
    queryKey: ["propertys", currentPage, itemPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/propertys?page=${currentPage}&size=${itemPerPage}`
      );
      return res.data;
    },
  });

  // Handle items per page change
  const handleItemPerPages = (e) => {
    const val = parseInt(e.target.value);
    setItemPerPages(val);
    setCurrentPage(0);
    refetch();
  };

  // Handle pagination controls
  const handleNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filters and Page Size Select */}
      <div className="flex justify-between mb-6">
        {/* <button className="bg-gray-200 px-4 py-2 rounded-md shadow-md flex items-center">
          <span className="mr-2">Filters</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12.414 10l3.293 3.293A1 1 0 0116 14v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.414 10 5.707 7.293A1 1 0 015 7V5a1 1 0 011-1h12V4z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}

        {/* Page Size Selector */}
        <select value={itemPerPage} onChange={handleItemPerPages}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      {/* Grid Layout for Houses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Property?.map((house) => (
          <div
            key={house._id}
            className="bg-white shadow-lg rounded-lg relative"
          >
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 text-xs font-bold rounded-md shadow-md">
              FOR {house.purpose?.toUpperCase()}
            </div>
            <img
              className="w-full h-48 object-cover"
              src={house.image}
              alt={`House in ${house.purpose}`}
            />
            <div className="p-4">
              <p className="text-gray-800 font-bold text-xl mb-2">
                {house.price}
              </p>
              <p className="text-gray-600 mb-2">{house.address}</p>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-semibold"> {house.bedroom} BEDS</span>
                </p>
                <p>
                  <span className="font-semibold">{house.washroom} BATHS</span>
                </p>
                <p>
                  <span className="font-semibold">{house.sqft} SQ.FT.</span>
                </p>
              </div>
              <Link to={`/dashboard/showdetails/${house._id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 w-full rounded-md mt-2 shadow-md hover:bg-blue-700 transition">
                  Show Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="btn btn-outline"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            className={`btn btn-outline ${
              currentPage === page ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages - 1}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllHouse;

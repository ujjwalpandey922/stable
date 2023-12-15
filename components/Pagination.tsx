// Import necessary dependencies and components
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useApi } from "@/context/Api.Context";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

// Pagination component
const Pagination = () => {
  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Possible pages for navigation
  const pages = ["pre", "next"];

  // Access API context for account details and setAccountDetails function
  const { accountDetails, setAccountDetails } = useApi();

  // Function to fetch new transaction details based on the page
  const newTransactionDetails = async (page: string) => {
    // Update the current page based on the navigation direction
    setCurrentPage((pre) => (page === "pre" ? pre - 1 : pre + 1));

    try {
      // Fetch transactions from the etherscan API
      const res = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${accountDetails?.address}&startblock=0&endblock=99999999&page=${currentPage}&offset=10&sort=asc&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`
      );

      // Update account details with the new transaction details
      setAccountDetails({
        type: "ADD_NORMAL_TRANSACTION",
        payload: res?.data?.result,
      });
    } catch (error) {
      // Handle any errors during the API request
      console.log(error);
    }
  };

  // Render the pagination buttons
  return (
    <div className="flex flex-wrap justify-center mt-4 gap-8">
      {currentPage !== 1 && (
        <button
          onClick={() => newTransactionDetails("pre")}
          className={
            "p-4 font-extrabold border border-gray-800 bg-yellow-400 text-gray-800 rounded-md cursor-pointer transition duration-300 hover:text-base hover:scale-95 flex items-center gap-4"
          }
        >
          <GrLinkPrevious /> Pre
        </button>
      )}
      <span className="border rounded-lg bg-transparent shadow-xl text-[#FFD700] p-4">
        Page {currentPage}
      </span>
      <button
        onClick={() => newTransactionDetails("next")}
        className={
          " font-extrabold border border-gray-800 bg-yellow-400 text-gray-800 rounded-md cursor-pointer transition duration-300 hover:text-base hover:scale-95 p-4 flex items-center gap-4"
        }
      >
        Next <GrLinkNext />
      </button>
    </div>
  );
};

// Export the Pagination component
export default Pagination;

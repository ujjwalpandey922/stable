// Import necessary dependencies and components
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useApi } from "@/context/Api.Context";

// Search component
const Search = () => {
  // State to manage the input value
  const [input, setInput] = useState("");

  // Access API context for setTokenDetails and setAccountDetails functions
  const { setTokenDetails, setAccountDetails } = useApi();

  // Function to handle form submission
  const onSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    try {
      // Check the length of the input to determine if it's an address or contract hash
      const isContractHash = input.length === 40;
      const isAddress = input.length === 42;

      if (isContractHash || isAddress) {
        // Perform API requests based on whether it's a contract hash or address
        if (isContractHash) {
          const contractSupplyEndpoint = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${input}&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`;
          const balanceEndpoint = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${input}&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`;

          const [resTotalSupply, resTokenBalance] = await Promise.all([
            axios(contractSupplyEndpoint),
            axios(balanceEndpoint),
          ]);

          // Update token details in the context
          setTokenDetails({
            type: "SET_TOKEN_DETAILS",
            payload: {
              totalSupply: resTotalSupply.data.result,
              tokenBalance: resTokenBalance.data.result,
              contactAddress: input,
            },
          });
        } else {
          // API endpoints for account details
          const balanceEndpoint = `https://api.etherscan.io/api?module=account&action=balance&address=${input}&tag=latest&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`;
          const normalTransactionEndpoint = `https://api.etherscan.io/api?module=account&action=txlist&address=${input}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`;
          const ercEndpoint = `https://api.etherscan.io/api?module=account&action=tokentx&address=${input}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`;

          const [resBalance, resNormalTranscation, resERC] = await Promise.all([
            axios(balanceEndpoint),
            axios(normalTransactionEndpoint),
            axios(ercEndpoint),
          ]);

          // Update account details in the context and reset input
          setAccountDetails({
            type: "SET_ACCOUNT_DETAILS",
            payload: {
              etherBalance: resBalance.data.result,
              normalTransactionList: resNormalTranscation.data.result,
              tokenList: resERC.data.result,
              address: input,
            },
          });
          setInput("");
        }
      } else {
        // Handle the case when the input is neither an address nor a contract hash
        console.error(
          "Invalid input. Please enter a valid Ethereum address or contract hash."
        );
      }
    } catch (error) {
      // Handle errors during API requests
      console.error("An error occurred:", error);
    }
  };

  // Render the search form
  return (
    <div className="flex justify-center px-4">
      <div className="max-w-[80rem] w-full">
        <form className="-top-7 relative " onSubmit={(e) => onSubmit(e)}>
          {/* Search label */}
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            {/* Search input */}
            <div className="absolute bg-transparent inset-y-0 start-0 flex items-center pointer-events-none p-3">
              🔎
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm border rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700] bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="Search By Address/Txn Hash/Token ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            {/* Search button */}
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the Search component
export default Search;

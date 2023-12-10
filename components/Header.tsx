"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Header = () => {
  // State for gas price and Ethereum price
  const [gasPrice, setGasPrice] = useState(0 || "");
  const [ethPrice, setEthPrice] = useState(0 || "");

  // Fetch gas and Ethereum prices on component mount
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch gas price from Etherscan API
        const resgas = await axios(
          `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`
        );

        // Fetch Ethereum price from Etherscan API
        const reseth = await axios(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_API_KEY_TOKEN}`
        );

        // Set state with fetched prices
        setEthPrice(reseth.data.result.ethusd);
        setGasPrice(resgas.data.result.suggestBaseFee);
      } catch (error) {
        console.log("Error fetching prices:", error);
      }
    };

    // Call the fetchPrices function
    fetchPrices();
  }, []);

  // Log the gasPrice as an integer to the console
  console.log(parseInt(gasPrice));

  return (
    <>
      {/* Navigation bar */}
      <nav>
        <div className="flex justify-between max-w-[80rem] m-auto p-4 items-center">
          <div className="flex gap-8 items-center">
            {/* Display Ethereum price */}
            <h3 className="font-bold text-2xl text-[#FFD700] items-end">
              Ether Price :{" "}
              <span className="font-medium text-xl text-blue-300">
                $
                {ethPrice &&
                  parseFloat(parseFloat(ethPrice).toFixed(2)).toLocaleString()}
              </span>
            </h3>
            {/* Display Gas price */}
            <h3 className="font-bold text-2xl text-[#FFD700]  flex items-end ">
              ⛽ Gas :
              <span className="font-medium text-lg text-blue-300 ">
                &nbsp;
                {gasPrice && parseInt(gasPrice)} Gwei
              </span>
            </h3>
          </div>
          {/* Connect Wallet button */}
          <w3m-button />
        </div>
      </nav>{" "}
      {/* Hero section */}
      <div className="bg-cover bg-top h-96 bg-header-pattern w-full aspect-video text-center p-8 ">
        <h3 className="bg-transparent uppercase text-5xl font-extrabold">
          {" "}
          welcome to ether scan
        </h3>
        <p className="bg-transparent capitalize text-lg font-normal text-gray-300 mt-8">
          A place where you can find all your Ethereum Info
        </p>
      </div>
    </>
  );
};

export default Header;

// Import necessary dependencies and components
"use client";
import React, { useState } from "react";
import { useApi } from "@/context/Api.Context";
import Card from "./Card";
import Table from "./Table";

// Result component
const Result = () => {
  // State to manage the active tab
  const [tab, setTab] = useState(1);

  // Access API context for account details
  const { accountDetails } = useApi();

  // Calculate ETH balance in a readable format
  const EthBalance = accountDetails?.etherBalance
    ? parseFloat(accountDetails.etherBalance) / Math.pow(10, 18)
    : 0;

  // Render the component if accountDetails is available
  if (accountDetails) {
    return (
      <div className="w-full flex items-center justify-center p-4">
        <div className="flex flex-col gap-4 p-4 w-full max-w-[80rem]">
          {/* Display account details cards */}
          <div className="flex gap-8 items-center justify-center flex-wrap">
            <Card>
              <h5 className="mb-2 text-2xl font-bold tracking-tight bg-transparent truncate text-white">
                Account Details
              </h5>
              <p className="font-normal text-blue-300 bg-transparent truncate">
                {accountDetails?.address}
              </p>
            </Card>
            <Card>
              <h5 className="mb-2 text-2xl font-bold tracking-tight bg-transparent truncate text-white">
                ETH Balance
              </h5>
              <p className="font-normal text-blue-300 bg-transparent">
                {EthBalance.toLocaleString()} ETH
              </p>
            </Card>
            <Card>
              <h5 className="mb-2 text-2xl font-bold tracking-tight bg-transparent truncate text-white">
                ETH Value
              </h5>
              <p className="font-normal text-blue-300 bg-transparent">
                $ {(EthBalance * 2286.79).toLocaleString()} /- (@ $2,286.79/ETH)
              </p>
            </Card>
          </div>

          {/* Tab navigation */}
          <div className="mb-4 w-full border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              role="tablist"
            >
              {/* Transactions Tab */}
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 rounded-t-lg hover:border-gray-300 hover:text-gray-300 ${
                    tab === 1 && "text-blue-300 border-b-2 border-blue-300"
                  }`}
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  onClick={() => setTab(1)}
                >
                  Transactions
                </button>
              </li>
              {/* Token Transfer Tab */}
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 rounded-t-lg hover:border-gray-300 hover:text-gray-300 ${
                    tab === 2 && "text-blue-300 border-b-2 border-blue-300"
                  }`}
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                  onClick={() => setTab(2)}
                >
                  Token transfer
                </button>
              </li>
            </ul>
          </div>

          {/* Tab content */}
          <div id="default-tab-content">
            {/* Transactions Table */}
            <div
              className={`${
                tab === 1 ? "flex" : "hidden"
              } p-4 rounded-lg bg-gray-800`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Table transactionList={accountDetails.normalTransactionList} />
            </div>

            {/* Token Transfer Table */}
            <div
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
              className={`${
                tab === 2 ? "flex" : "hidden"
              } p-4 rounded-lg bg-gray-800`}
            >
              <Table tokenList={accountDetails.tokenList} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render null if accountDetails is not available yet
  return null;
};

// Export the Result component
export default Result;

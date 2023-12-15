"use client";
import { useApi } from "@/context/Api.Context";
import React, { useState } from "react";
import Table from "./Table";
import Card from "./Card";

const Result = () => {
  const [tab, setTab] = useState(1);
  const { accountDetails } = useApi();
  const EthBalance = accountDetails?.etherBalance
    ? parseFloat(accountDetails.etherBalance) / Math.pow(10, 18)
    : 0;
  console.log(accountDetails);
  if (accountDetails) {
    return (
      <div className=" w-full  flex items-center justify-center p-4">
        <div className="flex flex-col gap-4 p-4 w-full max-w-[80rem]">
          <div className="flex gap-8 items-center justify-center">
            <Card>
              <h5 className="mb-2 text-2xl font-bold tracking-tight bg-transparent truncate  text-white">
                Account Details
              </h5>
              <p className="font-normal text-blue-300 bg-transparent truncate">
                {accountDetails?.address}
              </p>
            </Card>
            <Card>
              <h5 className="mb-2 text-2xl font-bold tracking-tight bg-transparent truncate  text-white">
                ETH Balance
              </h5>
              <p className="font-normal text-blue-300 bg-transparent">
                {EthBalance.toLocaleString()} ETH
              </p>
            </Card>
            <Card>
              <h5 className="mb-2 text-2xl font-bold tracking-tight bg-transparent truncate  text-white">
                ETH Value
              </h5>
              <p className="font-normal text-blue-300 bg-transparent">
                $ {(EthBalance * 2286.79).toLocaleString()} /- (@ $2,286.79/ETH)
              </p>
            </Card>
          </div>

          <div className="mb-4 w-full  border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4  rounded-t-lg hover:border-gray-300 hover:text-gray-300 ${
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
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4  rounded-t-lg hover:border-gray-300 hover:text-gray-300 ${
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
          <div id="default-tab-content" >
            <div
              className={`${
                tab == 1 ? "flex" : "hidden"
              } p-4 rounded-lg  bg-gray-800 `}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Table transactionList={accountDetails.normalTransactionList} />
            </div>
            <div
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
              className={`${
                tab == 2 ? "flex" : "hidden"
              } p-4 rounded-lg  bg-gray-800`}
            >
              {" "}
              <Table tokenList={accountDetails.tokenList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Result;

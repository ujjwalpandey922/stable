import { TokenTransaction, Transaction } from "@/context/type";
import React from "react";
import Pagination from "./Pagination";

// Table component for displaying transaction and token lists
const Table = ({
  transactionList,
  tokenList,
}: {
  transactionList?: Transaction[];
  tokenList?: TokenTransaction[];
}) => {
  return (
    <div className="overflow-x-auto w-full shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        {/* Render table header if there are transaction or token lists */}
        {transactionList?.length === 0 && tokenList?.length === 0 ? null : (
          <thead className="text-lg font-bold uppercase bg-[#FFD700] text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Hash
              </th>
              <th scope="col" className="px-6 py-3">
                Method Id
              </th>
              <th scope="col" className="px-6 py-3">
                Block
              </th>
              <th scope="col" className="px-6 py-3">
                Age
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {/* Render transaction list if available */}
          {transactionList?.length !== 0 ? (
            transactionList?.map((trans) => (
              <tr
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 truncate text-lg"
                key={trans.hash}
              >
                <th className="px-6 py-4 font-medium max-w-[15rem] text whitespace-nowrap text-white truncate">
                  {trans.hash}
                </th>
                <td className="px-6 py-4">{trans.methodId}</td>
                <td className="px-6 py-4">{trans.blockNumber}</td>
                <td className="px-6 py-4">
                  {new Date(
                    Number(trans.timeStamp) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 max-w-[10rem] truncate">
                  {trans.from}
                </td>
                <td className="px-6 py-4 max-w-[10rem] truncate">{trans.to}</td>
                <td className="px-6 py-4">
                  ${" "}
                  {(
                    (parseFloat(trans.value) / Math.pow(10, 18)) *
                    2286.79
                  ).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            // Display a message if no transaction list found
            <tr className="text-center font-bold text-2xl ">
              No Transaction List Found
            </tr>
          )}

          {/* Render token list if available */}
          {tokenList?.length !== 0 ? (
            tokenList?.map((trans) => (
              <tr
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 truncate text-lg"
                key={trans.hash}
              >
                <th className="px-6 py-4 font-medium max-w-[15rem] text whitespace-nowrap text-white truncate">
                  {trans.hash}
                </th>
                <td className="px-6 py-4 truncate max-w-[10rem]">
                  {trans.blockHash}
                </td>
                <td className="px-6 py-4">{trans.blockNumber}</td>
                <td className="px-6 py-4">
                  {" "}
                  {new Date(
                    Number(trans.timeStamp) * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 max-w-[10rem] truncate">
                  {trans.from}
                </td>
                <td className="px-6 py-4 max-w-[10rem] truncate">{trans.to}</td>
                <td className="px-6 py-4">
                  ${" "}
                  {(
                    (parseFloat(trans.value) / Math.pow(10, 18)) *
                    2286.79
                  ).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            // Display a message if no token list found
            <tr className="font-bold text-2xl w-full p-8 ">
              No Token List Found
            </tr>
          )}
        </tbody>
      </table>

      {/* Render pagination component for transaction list */}
      {transactionList && <Pagination />}
    </div>
  );
};

export default Table;

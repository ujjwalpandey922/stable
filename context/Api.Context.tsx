"use client";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { TokenTransaction, Transaction } from "./type";

// Define types
type ApiContextProps = {
  accountDetails: AccountDetails | null;
  tokenDetails: TokenDetails | null;
  setAccountDetails: Dispatch<Action>;
  setTokenDetails: Dispatch<Action>;
};

type Action =
  | { type: "SET_ACCOUNT_DETAILS"; payload: AccountDetails | null }
  | { type: "ADD_NORMAL_TRANSACTION"; payload: Transaction[] | null }
  | { type: "SET_TOKEN_DETAILS"; payload: TokenDetails | null };
type AccountDetails = {
  etherBalance: string;
  normalTransactionList: Transaction[];
  tokenList: TokenTransaction[];
  address: string;
};

type TokenDetails = {
  tokenBalance: string;
  totalSupply: string;
  contactAddress: string;
};

// Initial state
const initialState: ApiContextProps = {
  accountDetails: null,
  tokenDetails: null,
  setAccountDetails: () => {},
  setTokenDetails: () => {},
};

// Create context
const ApiContext = createContext<ApiContextProps>(initialState);

// Reducer function
const reducer = (state: ApiContextProps, action: Action): ApiContextProps => {
  switch (action.type) {
    case "SET_ACCOUNT_DETAILS":
      return { ...state, accountDetails: action.payload };
    case "SET_TOKEN_DETAILS":
      return { ...state, tokenDetails: action.payload };
    case "ADD_NORMAL_TRANSACTION":
      return {
        ...state,
        // @ts-ignore
        accountDetails: {
          ...state?.accountDetails,
          normalTransactionList: action?.payload || [], // Assuming action.payload contains the new transaction
        },
      };
    default:
      return state;
  }
};

// Context provider component
type ApiProviderProps = {
  children: ReactNode;
};

const ApiProvider: React.FC<ApiProviderProps> = ({
  children,
}: ApiProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ApiContext.Provider
      value={{
        accountDetails: state.accountDetails,
        tokenDetails: state.tokenDetails,
        setAccountDetails: dispatch,
        setTokenDetails: dispatch,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook for using the context
const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export { ApiProvider, useApi };

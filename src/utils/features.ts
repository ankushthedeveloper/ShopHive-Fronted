import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NavigateFunction } from "react-router-dom";
import { messageTypeResponse } from "../types/api-types";
import toast from "react-hot-toast";
import moment from "moment";
type ResType =
  | { data: messageTypeResponse }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const err = res.error as FetchBaseQueryError;
    const message = (err.data as messageTypeResponse).message;
    toast.error(message);
  }
};

export const lastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const currentMonth = monthDate.format("MMMM");
    last6Months.unshift(currentMonth);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const currentMonth = monthDate.format("MMMM");
    last12Months.unshift(currentMonth);
  }

  return {
    last6Months,
    last12Months,
  }
};

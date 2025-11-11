import type { FC } from "react";
import { RequestBin } from "../types";
import LampIcon from "./LampIcon";
import { Link } from "react-router-dom";

export const RequestBinIcon: FC<RequestBin> = ({ request_id, item_count }) => {
  return (
    <Link
      className={
        "request-bin" + ((request_id == 0 && " request-bin_disabled") || "")
      }
      to={`/light-request/${request_id}`}
    >
      <LampIcon className="request-bin__icon" />
      {request_id != 0 && (
        <div className="request-bin__items">
          <p>{item_count}</p>
        </div>
      )}
    </Link>
  );
};

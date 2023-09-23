import { FC, useContext } from "react";
import { StateContext } from "../../App";

interface SummaryProps {
  viewAllReviews: () => void;
}
export const Summary: FC<SummaryProps> = ({ viewAllReviews }) => {
  const state = useContext(StateContext);

  return (
    <>
      {state.company && (
        <>
          <div className="summary--info">
            <div className="rating--box bold">
              {state.company.averageRating}
            </div>

            <p className="small summary--counter">
              from {state.company.reviewCount} review
              {state.company.reviewCount !== 1 && "s"}
            </p>

            {state.latestReviews.length > 0 && state.company && (
              <a className="blue right" onClick={viewAllReviews}>
                View all reviews
              </a>
            )}
          </div>
          <hr />
        </>
      )}
    </>
  );
};

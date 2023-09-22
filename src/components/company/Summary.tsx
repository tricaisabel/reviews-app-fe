import { useContext } from "react";
import { StateContext } from "../../App";

export const Summary = () => {
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
              <a className="blue right">View all reviews</a>
            )}
          </div>
          <hr />
        </>
      )}
    </>
  );
};

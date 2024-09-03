import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import ReviewData from "../../../config/ReviewData.json";
import { useState, ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/Routes";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
});

interface Review {
  customerName: string;
  rating: number;
  ratingDescription: string;
  reviewedDate: string;
  colorChosen: string;
  verifiedPurchase: boolean;
  ReviewedCountry: string;
  customerReview: string;
  helpfulCount: number;
}

export default function ReviewsCont() {
  const [sortOption, setSortOption] = useState("Most Recent Reviews");

  const { reviews } = ReviewData;

  const location = useLocation();

  const [allReviews, setAllReviews] = useState<Review[]>(reviews);

  useEffect(() => {
    if (location.state) {
      console.log("line 42", location.state);
      const newReview: Review = {
        customerName: location.state.name,
        rating: location.state.rating,
        ratingDescription: "good",
        colorChosen: "blue",
        customerReview: location.state.comment,
        verifiedPurchase: true,
        reviewedDate: new Date().toISOString().split("T")[0],
        ReviewedCountry: "USA",
        helpfulCount: 0,
      };
      setAllReviews((prevReviews) => [newReview, ...prevReviews]);
    }
  }, [location]);

  const sortedReviews = [...allReviews].sort((a, b) => {
    if (sortOption === "Most Recent Reviews") {
      return (
        new Date(b.reviewedDate).getTime() - new Date(a.reviewedDate).getTime()
      );
    } else if (sortOption === "Top Reviews") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.WRITE_REVIEW);
  };

  return (
    <>
      <div className="flex justify-center flex-col gap-y-6 2xl:w-4/5 xl:w-11/12 lg:w-11/12">
        <div className="flex justify-center flex-col gap-y-2">
          <div className="border-t-2 border-slate-300 py-10">
            <h1 className="text-primary-text font-bold  md:text-2xl xl:text-2xl lg:text-xl sm:text-2xl xs:text-xl ">
              Customer Reviews
            </h1>
          </div>

          <div className="pb-8 md:px-4">
            <select
              className="p-2 bg-gray-50 outline-none rounded shadow shadow-anchor text-gray-700"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option>Most Recent Reviews</option>
              <option>Top Reviews</option>
            </select>
          </div>

          {/* <div className="pb-9 px-4" onClick={handleNavigate}>
            <button className="border-2 w-fit px-16 rounded-xl shadow-md bg-[#2fafc5] text-white py-2 cursor-pointer">
                <p>Write a Review</p>
            </button>
          </div> */}

          <div className="flex flex-col sm:px-4 gap-y-9">
            {sortedReviews.map((review, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-4 rounded-lg py-1 px-2"
              >
                <div className="flex gap-x-5 items-center">
                  <AccountCircleIcon 
                    sx={{
                      fontSize: {
                        md: '2.9rem', 
                        xs: '2.3rem'   
                      }
                    }}
                    />
                  <p className="sm:text-lg xs:text-base">{review.customerName}</p>
                </div>

                <div className="flex items-center gap-x-3">
                  <StyledRating
                    name="simple-controlled"
                    className="px-1"
                    defaultValue={review.rating}
                    // sx={{
                    //   fontSize: "1.5rem",
                    //   "& .MuiRating-icon": {
                    //     width: "0.6rem",
                    //   },
                    // }}
                    readOnly
                  />
                  <p className="font-semibold text-primary-text">
                    {review.ratingDescription}
                  </p>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="flex gap-x-3 text-secondary-text text-md">
                    <p>{review.ReviewedCountry}</p>
                    <p>{review.reviewedDate}</p>
                  </div>
                  <div className="flex gap-x-3 text-secondary-text">
                    <p>Color: {review.colorChosen}</p> |{" "}
                    <p className="font-semibold">
                      Verified Purchase {review.verifiedPurchase ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="text-primary-text py-3">
                  <p>{review.customerReview}</p>
                </div>
                <div className="text-secondary-text flex flex-col gap-y-4 text-sm">
                  <p>{review.helpfulCount} people found this helpful</p>
                  <div className="flex items-center gap-x-3">
                    <button className="border p-2 rounded-xl shadow-sm">
                      Helpful
                    </button>{" "}
                    |<button>Report</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="py-6 px-2 border-b-2 text-base">
            <button type="submit" className="text-[#2fafc5]">
              See more Reviews
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

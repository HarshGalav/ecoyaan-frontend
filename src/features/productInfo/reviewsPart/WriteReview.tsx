import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useState } from "react";
import { ROUTES } from "../../../utils/Routes";

export default function WriteReview() {
  const navigate = useNavigate();

  const [review, setReview] = useState({
    name: "",
    comment: "",
    rating: 0,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("line 18", review);
    navigate(ROUTES.PRODUCT_INFO, { state: review });
  };

  const handleRatingChange = (event: any, newValue: number | null) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: newValue || 0,
    }));
  };

  return (
    <div className="flex justify-center  items-center pt-8 xl:px-20 lg:px-14 md:px-24 sm:px-16 xs:px-4">
      <div className="flex border p-4 justify-center border-t-2 flex-col gap-y-2 px-9">
        <div className=" flex gap-x-4 items-center border-slate-300 py-10">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ fontSize: "2rem" }} />
          </div>
          <h1 className="text-primary-text font-bold text-2xl">
            Write your Reviews
          </h1>
        </div>
        <form>
          <div className="flex flex-col gap-y-8 px-14  ">
            <div className="flex gap-y-3 gap-x-7 items-center ">
              <label>Choose a Name :</label>

              <div className="flex flex-col gap-y-2">
                <input
                  required
                  className="border-2 outline-none p-2"
                  type="text"
                  value={review.name}
                  onChange={(e) =>
                    setReview({ ...review, name: e.target.value })
                  }
                ></input>
                <p className="text-xs text-gray-500">
                  Your reviews will be posted under this name
                </p>
              </div>
            </div>

            <div className="flex gap-y-3 gap-x-5 items-center ">
              <label>Write your Review</label>
              <input
                required
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                className="border-2 outline-none p-3  h-28"
                type="text"
              ></input>
            </div>
            <div className="flex gap-y-3 gap-x-5 items-center">
              <label>Rate the Product</label>
              <Rating
                name="rating"
                value={review.rating}
                onChange={handleRatingChange}
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="p-2 px-7 bg-[#2fafc5] text-white rounded"
              >
                Submit Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

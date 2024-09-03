import { useNavigate } from "react-router-dom";
import Challenges from "./AllChallenge";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import Challenge from "../../../config/Challenges.json";
import SearchIcon from "@mui/icons-material/Search";
import GoToBackButton from "../../../components/GoBackButton/GoBackButton";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "77AEBF",
  },
});

export default function FilterPart() {
  const { filterCategories } = Challenge;

  const [open, setOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectRatingImpact, setSelectRatingImpact] = useState<number | null>(
    0,
  );
  const [selectRatingDifficulty, setSelectRatingDifficulty] = useState<
    number | null
  >(0);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelectType = (cat: string) => {
    const unSelected = selectedTypes.includes(cat);
    const updatedTypes = unSelected
      ? selectedTypes.filter((type) => type !== cat)
      : [...selectedTypes, cat];
    setSelectedTypes(updatedTypes);
  };

  const handleApplyFilters = () => {
    console.log("Selected Types:", selectedTypes);
    console.log("Impact Rating:", selectRatingImpact);
    console.log("Difficulty Rating:", selectRatingDifficulty);
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectRatingDifficulty(0);
    setSelectRatingImpact(0);
  };

  return (
    <>
      <div
        className={`bg-white relative gap-y-2 pt-7 flex flex-col z-10 ${open === true ? "opacity-60" : " "}`}
      >
        <div className="flex 2xl:px-16 xl:px-14 lg:px-16 md:px-12 sm:px-10 xs:px-1 xs:py-7 justify-between items-center">
          <div className="flex items-center sm:gap-x-2 xs:gap-x-1">
           <GoToBackButton />

            <h1
              className="xl:text-4xl lg:text-4xl  md:text-3xl sm:text-2xl m-0
                        xs:text-xl font-semibold"
            >
              Weekly Eco Challenges
            </h1>
          </div>

          <button
            className=" flex  items-center border-2 border-slate-500 sm:py-1 xs:py-0 rounded-3xl xl:px-4 lg:px-4 md:px-4 sm:px-4 sm:text-xl xs:text-base xs:px-2 gap-x-1"
            onClick={handleClick}
          >
            <p className="m-0 ">Filter</p>
            <KeyboardArrowDownIcon />
          </button>
        </div>

        <Challenges
          selectedTypes={selectedTypes}
          selectRatingImpact={selectRatingImpact}
          selectRatingDifficulty={selectRatingDifficulty}
        />
      </div>
      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
          <div className="bg-transparent w-full fixed top-20 left-0 mt-16 z-20 flex items-center justify-center py-3 xs:px-2 md:px-14 xl:px-24 2xl:px-48 ">
            <div
              className="rounded-xl xs:w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-5/12 xl:h-5/6 lg:h-4/5 md:h-2/3 sm:h-fit
                             xs:h-fit bg-white min-w-[35vw]
                             flex flex-col xl:px-5 lg:px-5 md:px-2 sm:px-5 xs:px-1 py-3  shadow-2xl"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
              }}
            >
              <div
                className="flex  justify-end px-3"
                onClick={() => setOpen(false)}
              >
                <ClearIcon
                  sx={{ fontSize: "27px" }}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex justify-between w-full py-6 border-b border-gray-400 2xl:px-4 xl:px-4 lg:px-4 md:px-4 sm:px-4 xs:px-4  items-center">
                <div className="flex gap-x-4 items-center">
                  <h1 className="sm:text-3xl xs:text-2xl font-semibold m-0">
                    Filters
                  </h1>
                </div>
                <button
                  className="sm:text-2xl xs:text-xl text-anchor"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="xl:px-5  lg:px-5 md:px-5 sm:px-2 xs:px-3 py-4  flex flex-col gap-y-6 xs:w-full md:w-full  sm:w-full">
                  <h1 className="p-1 m-0 sm:text-2xl xs:text-xl">
                    Choose your Challenges
                  </h1>

                  <div className="border border-gray-400 rounded-xl p-2 gap-y-5 flex flex-col xl:!px-7 lg:!px-7 md:!px-5 sm:!px-3 xs:!px-2  py-4">
                    <p className="m-0 text-xl">Type</p>
                    <div className=" flex md:gap-x-4 sm:gap-x-2 xs:gap-x-1 flex-wrap gap-y-2">
                      {filterCategories.map((challenge, index) => (
                        <button
                          key={index}
                          className={`hover:bg-anchor hover:text-white rounded-2xl border-gray-400 border p-1 lg:!px-5 md:!px-4 sm:!px-5 xs:!px-3 xs:text-base ${
                            selectedTypes.includes(challenge.name)
                              ? "bg-anchor text-white"
                              : ""
                          }`}
                          onClick={() => handleSelectType(challenge.name)}
                        >
                          {challenge.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border  w-fit  rounded-lg  border-slate-400 flex flex-col gap-y-3 py-2 xl:px-5 lg:px-5 md:px-5 sm:px-5 xs:px-2 ">
                    <p className="sm:text-xl xs:text-lg m-0">Difficulty</p>
                    <StyledRating
                      name="difficulty-rating"
                      value={selectRatingDifficulty}
                      onChange={(event, newValue) => {
                        setSelectRatingDifficulty(newValue);
                      }}
                      sx={{
                        fontSize: {
                          xs: "1.9rem",
                          sm: "1.9rem",
                        },
                        "& .MuiRating-icon": {
                          width: {
                            xs: "1.4rem",
                            sm: "2.2rem",
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="border w-fit border-slate-400 rounded-lg flex flex-col gap-y-3 py-2 xl:px-5 lg:px-5 md:px-5 sm:px-5 xs:px-2  ">
                    <p className="sm:text-xl xs:text-lg m-0">Impact</p>
                    <StyledRating
                      name="impact-rating"
                      value={selectRatingImpact}
                      onChange={(event, newValue) => {
                        setSelectRatingImpact(newValue);
                      }}
                      sx={{
                        fontSize: {
                          xs: "1.9rem",
                          sm: "1.9rem",
                        },
                        "& .MuiRating-icon": {
                          width: {
                            xs: "1.4rem",
                            sm: "2.2rem",
                          },
                        },
                      }}
                    />
                  </div>

                  <div>
                    <button
                      onClick={handleApplyFilters}
                      className="rounded-xl bg-primary text-white  border px-9 xl:text-2xl xs:text-xl py-1"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

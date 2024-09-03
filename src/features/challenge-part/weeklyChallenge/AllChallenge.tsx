import { styled } from "@mui/material";
import Rating from "@mui/material/Rating";
import Challenge from "../../../config/Challenges.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../../../utils/Routes";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: "#77AEBF",
  },
  "& .MuiRating-iconHover": {
    color: "#77AEBF",
  },
  "& .MuiRating-icon": {
    width: "8px",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  fontSize: "2.1rem",
  [theme.breakpoints.down("xl")]: {
    fontSize: "1.6rem",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.9rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}));

interface ChallengesProps {
  selectedTypes: string[];
  selectRatingImpact: number | null;
  selectRatingDifficulty: number | null;
}

export default function Challenges({
  selectedTypes,
  selectRatingImpact,
  selectRatingDifficulty,
}: ChallengesProps) {
  const navigate = useNavigate();
  const { weeklyChallenges } = Challenge;
  const [filteredChallenges, setFilteredChallenges] =
    useState(weeklyChallenges);

  useEffect(() => {
    let filtered = weeklyChallenges;
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((challenge) =>
        selectedTypes.includes(challenge.category),
      );
    }
    if (selectRatingImpact) {
      filtered = filtered.filter(
        (challenge) => challenge.impact === selectRatingImpact,
      );
    }
    if (selectRatingDifficulty) {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === selectRatingDifficulty,
      );
    }
    setFilteredChallenges(filtered);

    console.log("line 61", filtered);
  }, [
    selectedTypes,
    selectRatingImpact,
    selectRatingDifficulty,
    weeklyChallenges,
  ]);

  const handleClick = (title: string) => {
    navigate(ROUTES.ALL_ECO_CHALLENGE_DETAIL.replace(":title",title ));
  };

  return (
    <div className="flex py-6 items-center 2xl:px-24 xl:px-16 lg:px-20 md:px-16 sm:px-11 xs:px-1 justify-center">
      <div className="flex w-full xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col items-center gap-y-16 justify-between flex-wrap">
        {filteredChallenges.map((challenge, index) => (
          <div
            className="relative flex flex-col xl:w-[43vw] lg:w-[85vw] md:w-full sm:w-full xs:w-full items-center justify-start rounded-3xl shadow !shadow-green-300 p-3 sm:px-9 xs:!px-2"
            key={index}
          >
            <img
              className="rounded-2xl 2xl:h-[62vh] xl:h-[58vh] lg:h-[58vh] md:h-[53vh] sm:h-[42vh] xs:h-[32vh] opacity-95 object-fill xl:w-[47vw] lg:w-full md:w-full sm:w-full xs:w-full"
              src={challenge.challengeImage}
            />
            <div className="absolute top-5 left-5 text-slate-900 border-2 rounded-full px-7 text-xl py-1 opacity-65  bg-slate-50">
              <button>{challenge.category}</button>
            </div>
            <div className="py-5 xl:px-2 lg:px-5 md:px-2 sm:px-2 xs:px-0 flex flex-col gap-y-4 w-full">
              <div className="flex justify-between items-center xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-row gap-y-5">
                <h1 className="xl:text-3xl 2xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl xs:text-xl font-semibold m-0 text-pretty">
                  {challenge.title}
                </h1>
                <div className="flex justify-end xl:w-fit lg:w-fit md:w-fit sm:w-fit xs:w-fit items-end">
                  <button
                    onClick={() => handleClick(challenge.title)}
                    className="rounded-xl bg-primary text-white border xl:px-9 xs:w-32 sm:w-44 lg:px-9 md:px-9 sm:px-9 xs:px-3 sm:py-2 xs:py-1 text-lg"
                  >
                    Take this up
                  </button>
                </div>
              </div>
              <div className="pr-14 px-1">
                <p className="text-xl text-left break-words">
                  {challenge.description}
                </p>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="border-2 border-gray-300 rounded-lg flex flex-col gap-y-3 py-2 xl:px-3 lg:px-5 md:px-4 sm:px-2 xs:px-2">
                  <p className="text-xl mb-0">Impact</p>
                  <StyledRating
                    name="impact-rating"
                    value={challenge.impact}
                    readOnly
                    sx={{
                      fontSize: {
                        xs: "1.4rem",
                        sm: "2rem",
                      },
                      "& .MuiRating-icon": {
                        width: {
                          xs: "1.6rem",
                          sm: "2rem",
                        },
                      },
                    }}
                  />
                </div>
                <div className="rounded-lg border-2 border-gray-300 flex flex-col gap-y-3 py-2 xl:px-5 lg:px-5 md:px-4 sm:px-2 xs:px-2">
                  <p className="text-xl mb-0">Difficulty</p>
                  <StyledRating
                    name="difficulty-rating"
                    value={challenge.difficulty}
                    readOnly
                    sx={{
                      fontSize: {
                        xs: "1.4rem",
                        sm: "2rem",
                      },
                      "& .MuiRating-icon": {
                        width: {
                          xs: "1.8rem",
                          sm: "2rem",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredChallenges.length === 0 &&
          weeklyChallenges.map((challenge, index) => (
            <div
              className="relative flex flex-col xl:w-[43vw] lg:w-[85vw] md:w-full sm:w-full xs:w-full items-center justify-start rounded-3xl shadow !shadow-green-300 p-3 sm:px-9 xs:px-3"
              key={index}
            >
              <img
                className="rounded-2xl xl:h-[62vh] lg:h-[58vh] md:h-[53vh] sm:h-[42vh] xs:h-[32vh] opacity-95 object-fill xl:w-[47vw] lg:w-full md:w-full sm:w-full xs:w-full"
                src={challenge.challengeImage}
              />
              <div className="absolute top-5 left-5 text-slate-900 border-2 rounded-full px-7 text-xl py-1 bg-slate-200">
                <button>{challenge.category}</button>
              </div>
              <div className="py-5 xl:px-2 lg:px-5 md:px-2 sm:px-2 xs:px-0 flex flex-col gap-y-4 w-full">
                <div className="flex justify-between items-center xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-row gap-y-5">
                  <h1 className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl xs:text-2xl font-semibold">
                    {challenge.title}
                  </h1>
                  <div className="flex justify-end  xs:w-fit items-end">
                    <button
                      onClick={() => handleClick(challenge.title)}
                      className="rounded-xl bg-primary text-white border xl:px-9 lg:px-9 md:px-9 sm:px-9 xs:px-3 sm:py-2 xs:py-1 text-lg"
                    >
                      Take this up
                    </button>
                  </div>
                </div>
                <div className="pr-14 px-2">
                  <p className="text-xl">{challenge.description}</p>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="border-2 border-gray-300 rounded-lg flex flex-col gap-y-3 py-2 xl:px-3 lg:px-5 md:px-4 sm:px-2 xs:px-1">
                    <p className="text-xl mb-0">Impact</p>
                    <StyledRating
                      name="impact-rating"
                      value={challenge.impact}
                      readOnly
                      sx={{
                        fontSize: "2rem",
                        "& .MuiRating-icon": {
                          width: "2rem",
                        },
                      }}
                    />
                  </div>
                  <div className="rounded-lg border-2 border-gray-300 flex flex-col gap-y-3 py-2 xl:px-5 lg:px-5 md:px-4 sm:px-2 xs:px-1">
                    <p className="text-xl mb-0">Difficulty</p>
                    <StyledRating
                      name="difficulty-rating"
                      value={challenge.difficulty}
                      readOnly
                      sx={{
                        fontSize: "2rem",
                        "& .MuiRating-icon": {
                          width: "2rem",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

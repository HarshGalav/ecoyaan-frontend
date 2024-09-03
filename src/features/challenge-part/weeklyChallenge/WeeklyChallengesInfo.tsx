import { Navigate, useNavigate } from "react-router-dom";
import Challenge from "../../../config/Challenges.json";
import { ROUTES } from "../../../utils/Routes";

export default function WeeklyChallengesInfo() {
  const navigate = useNavigate();

  const { weeklyChallenges } = Challenge;

  const handleClick = () => {
    navigate(ROUTES.ALL_WEEK_CHALLENGE);
  };

  const handleClickDetail = (title: string) => {
    navigate(ROUTES.ALL_ECO_CHALLENGE_DETAIL.replace(":title",title ));
  };

  return (
    <>
      <div className=" flex items-center justify-center ">
        <div className="px-4 md:pt-8 xs:pt-2 flex flex-col gap-y-3 xl:w-[95vw] lg:w-[98vw] md:w-[97vw] sm:w-[99vw] xs:w-[98vw] ">
          <div className="flex justify-between pb-0 md:pr-5 xs:pr-0">
            <h1 className="text-primary-text font-bold lg:text-4xl md:text-2xl xs:text-xl m-0">
              Weekly Challenges
            </h1>
            <button
              onClick={handleClick}
              className="text-anchor hover:text-[#2ea5c9] lg:text-3xl md:text-xl sm:text-xl xs:text-lg"
            >
              See all
            </button>
          </div>

          <div className="flex sm:gap-x-5 xs:gap-x-3 sm:py-4 xs:py-1 overflow-y-hidden overflow-x-scroll hide-scrollbar ">
            {weeklyChallenges.map((challenge, index) => (
              <div key={index} className=" flex flex-col gap-y-3 ">
                <div
                  onClick={() => handleClickDetail(challenge.title)}
                  className="flex justify-center cursor-pointer items-center 2xl:w-full xl:w-96 2xl:min-w-[22.5vw] md:w-[29.7vw] xl:h-[33vh] lg:w-80 lg:h-[23vh] md:h-[23vh] sm:h-[18vh] sm:w-[29.8vw] xs:h-[13vh] xs:w-[34vw]  relative overflow-hidden "
                >
                  <img
                    className="rounded-xl  opacity-85 object-fill h-full w-full"
                    src={challenge.challengeImage}
                    alt={challenge.title}
                  />
                </div>
                <div className="">
                  <p className="2xl:text-3xl lg:text-2xl md:text-xl sm:text-lg xs:text-sm text-balance  text-center font-semibold  text-black !p-0 ">
                    {challenge.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

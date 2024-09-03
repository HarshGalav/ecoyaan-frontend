import Challenge from "../../config/Challenges.json";

export default function EcoChallenge() {
  const { weeklyChallenges } = Challenge;

  return (
    <>
      <div className=" flex items-center justify-center ">
        <div className="px-4 pt-5 flex flex-col gap-y-1 xl:w-[95vw] lg:w-[98vw] md:w-[97vw] sm:w-[99vw] xs:w-[98vw] ">
          <div className="flex justify-between ">
            <h1 className="text-primary-text font-bold md:text-4xl xs:text-2xl m-0">
              List of Eco Challenges
            </h1>
            <button className="text-anchor hover:text-[#2ea5c9] md:text-4xl xs:text-xl">
              See all
            </button>
          </div>

          <div className="flex sm:gap-x-5 xs:gap-x-3 py-4 overflow-y-hidden overflow-x-auto hide-scrollbar ">
            {weeklyChallenges.map((challenge, index) => (
              <div key={index} className=" flex flex-col gap-y-3 ">
                <div className="flex justify-center cursor-pointer items-center xl:w-[22.6vw] min-w-[20.8vw] md:w-[29.7vw] xl:h-[33vh] lg:w-[23vw] lg:h-[23vh] md:h-[23vh] sm:h-[18vh] sm:w-[29.8vw] xs:h-[13vh] xs:w-[34vw]  relative overflow-hidden ">
                  {/* <img  
                            className="rounded-xl  opacity-85 object-fill h-full w-full"
                            src= {challenge.challengeImage}
                            alt={challenge.title}
                            /> */}
                  <div className="rounded-xl  opacity-85 object-fill h-full w-full bg-anchor"></div>
                </div>
                <div className="">
                  <p className="xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl text-center font-semibold  break-all text-black !p-0 ">
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

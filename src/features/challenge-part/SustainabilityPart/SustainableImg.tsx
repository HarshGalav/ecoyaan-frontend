import React from "react";
import Challenge from "../../../config/Challenges.json";

interface Challenge {
  title: string;
  challengeImage: string;
}

const SustainabilityImg: React.FC = () => {
  const { sustainabilityContent } = Challenge;

  return (
    <div className="md:mt-20 xs:mt-2">
      <div>
        <div className="relative flex flex-col items-center  lg:px-0 xs:px-3">
          <img
            className="lg:h-[65vh] md:h-[54vh]  xl:h-[69vh] sm:h-96 xs:h-64 w-full object-cover xs:rounded-2xl lg:rounded-none opacity-90"
            src={sustainabilityContent.imageUrl}
          />

          <div
            className="absolute bottom-0 xs:left-3 lg:left-0 md:w-full xs:w-11/12 text-white p-2 xl:!py-5 lg:!py-5 md:!py-5 sm:!py-5 xs:!py-2 xl:!px-7 lg:!px-5 md:!px-5 sm:px-5 xs:px-4 flex flex-col xl:gap-y-5 lg:gap-y-3 md:gap-y-3 sm:gap-y-3 xs:gap-y-1 lg:rounded-none xs:rounded-bl-2xl"
            style={{
              background:
                "linear-gradient(to left, rgba(0, 0.85, 0.85, 0), #1c1a1aba, #4CAF50)",
            }}
          >
            <h1 className="xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl xs:text-2xl font-bold !mb-0">
              Towards Sustainability
            </h1>
            <p className="xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl xs:text-xs font-semibold md:tracking-wider xs:tracking-wide">
              Strategize & reduce greenhouse gas emissions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityImg;

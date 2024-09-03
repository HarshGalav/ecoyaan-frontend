import { Helmet } from "react-helmet-async";
import SustainabilityImg from "./SustainabilityPart/SustainableImg";
import EcoChallengeInfo from "./EcoChallenge/EcoChallengeInfo";
import WeeklyChallengesInfo from "./weeklyChallenge/WeeklyChallengesInfo";

export default function ChallengeInfo() {
  return (
    <>
      <Helmet>
        <title>Challenges</title>
        <meta name="product" content="Product Details" />
      </Helmet>
      <div className="flex flex-row justify-center items-start gap-8 pb-7">
        <div className="w-full flex flex-col  sm:gap-y-3 xs:gap-y-5">
          <SustainabilityImg />
          <WeeklyChallengesInfo />
          <EcoChallengeInfo />
        </div>
      </div>
    </>
  );
}

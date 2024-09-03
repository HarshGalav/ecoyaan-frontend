import { useNavigate, useParams } from "react-router-dom";
import ChallengeData from "../../../config/Challenges.json";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoToBackButton from "../../../components/GoBackButton/GoBackButton";

export default function ChallengeDetail() {

  const { title } = useParams<{ title: string }>();

  console.log("lline 10", title);

  const challenge = ChallengeData.weeklyChallenges.find(
    (challenge) => challenge.title === title,
  );

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  const [shareOpen, setShareOpen] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [takeChallenge, setTakeChallenge] = useState(false);

  const handleShareClick = () => {
    // console.log("line 24 , share open", shareOpen);
    setShareOpen(!shareOpen);
  };

  const copyToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(
      () => {
        setCopyLink(true);
        setTimeout(() => setCopyLink(false), 3000);
      },
      (err) => {
        setCopyLink(err);
      },
    );
  };

  const handleChallenge = () => {
    setTakeChallenge(true);
  };

  return (
    <div className="bg-white relative gap-y-6 pt-7 flex flex-col z-10 py-6">
      <div className="flex flex-col 2xl:px-12 xl:px-10 lg:px-7 xs:px-2 md:px-8 py-7 justify-between md:gap-y-9 xs:gap-y-6">
        <div className="flex items-center md:gap-x-4 xs:gap-x-1">
         <GoToBackButton />
          <h1 className="md:text-3xl xs:text-2xl m-0 font-semibold">
            Weekly Eco Challenges
          </h1>
        </div>
        <div className="flex 2xl:px-30 xl:px-2 lg:px-5 xs:px-0 items-start justify-around  ">
          <div className="flex xl:flex-row xs:flex-col-reverse items-start justify-around py-5 gap-y-8 xs:gap-x-5 lg:gap-x-2 2xl:px-10 xl:px-2 lg:px-14 md:px-6 sm:px-4 xs:px-1  bg-blue-50 rounded-3xl ">
            <div className="flex flex-col items-start justify-between 2xl:w-7/12 lg:w-full xl:w-7/12 xs:w-full xs:px-1 md:px-3 py-2  md:gap-y-12 xs:gap-y-6 xl:gap-y-10">
              <div className="flex  xs:gap-y-4 xs:gap-x-2 xl:gap-x-4 xs:justify-between xs:items-center  md:items-center md:justify-between w-full">
                <h1 className="md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl sm:text-3xl xs:text-xl m-0 font-semibold text-wrap">
                  {challenge.title}
                </h1>

                <div className="flex relative items-center sm:gap-x-6 lg:gap-x-3 2xl:gap-x-6 xl:gap-x-2 xs:gap-x-1">
                  <div>
                    {takeChallenge ? (
                      <button className="rounded-xl bg-white text-green-700 border border-green-500 md:px-9 xs:px-3 md:text-2xl xs:text-lg md:py-3 xs:py-1">
                        Active
                      </button>
                    ) : (
                      <button
                        onClick={handleChallenge}
                         className="rounded-xl bg-primary text-white border md:px-9 xl:px-2  xl:w-36 lg:w-48 xs:w-28 sm:w-44  xs:px-2 md:text-lg lg:text-xl xl:text-base xs:text-sm md:py-3 xs:py-2"
                      >
                        Take this up
                      </button>
                    )}
                  </div>
                  <div>
                    <IosShareIcon
                      onClick={handleShareClick}
                      sx={{
                        fontSize: {
                          sm: "2.5rem",
                          xs: "1.8rem",
                        },
                        color: "grey",
                      }}
                      className="cursor-pointer"
                    />

                    {shareOpen && (
                      <div className="absolute md:top-16 lg:top-16 lg:-left-18 2xl:-left-20 xl:-left-24 xl:top-14 xs:top-12 mt-2 md:-left-14 sm:-left-14 xs:-left-14 border border-gray-300 xs:w-58 sm:w-72 bg-white rounded-2xl">
                        <div className="sm:px-4 xs:px-3 py-2 text-gray-600 ">
                          {copyLink && (
                            <div className="relative">
                              <div className="bg-gray-400 text-sm  text-white rounded-lg px-3  py-2 xs:w-28 shadow-md text-center absolute bottom-full left-1/3 transform -translate-x-1/2 z-30">
                                <p className="text-center">Link copied!</p>
                              </div>
                              <div className="absolute bottom-0 left-1/3  transform -translate-x-1/2 mb-1 z-20">
                                <div className="w-10 h-5 bg-gray-400 rotate-45"></div>
                              </div>
                            </div>
                          )}

                          <div
                            className="flex xs:gap-x-4 sm:gap-x-6 sm:px-2 xs:px-1 py-3 items-center cursor-pointer xs:text-sm sm:text-base"
                            onClick={copyToClipboard}
                          >
                            <img
                              src="/images/link.png"
                              className=" sm:w-6 xs:w-5"
                            />
                            <p className="text-left py-1">Copy Link</p>
                          </div>

                          <div className="flex xs:gap-x-4 sm:gap-x-6 items-center cursor-pointer sm:px-2 xs:px-1 py-3 xs:text-sm sm:text-base  ">
                            <InstagramIcon
                              sx={{
                                color: "gray",
                                width: {
                                  sm: "1.5rem",
                                  xs: "1.25rem",
                                },
                              }}
                            />
                            <p className="text-left py-1">Share on Instagram</p>
                          </div>
                          <div
                            className="flex xs:gap-x-4 sm:gap-x-6   items-center cursor-pointer sm:px-2 xs:px-1 py-3
                          xs:text-sm sm:text-base"
                          >
                            <img
                              src="/images/more.png"
                              className="sm:w-6 xs:w-5"
                            />
                            <p className="text-left py-1">More</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl sm:text-2xl xs:text-xl text-green-800 ">
                {challenge.description}
              </div>

              <div className="lg:text-xl 2xl:text-xl xl:text-xl md:text-xl xs:text-lg flex flex-col xs:!leading-8 sm:!leading-9 2xl:!leading-[2.7rem] xl:!leading-9  px-0">
                {challenge.about}
              </div>
            </div>
            <div className="relative flex flex-col 2xl:w-[49vw] xl:w-1/2 sm:px-2  md:w-full sm:w-full xs:w-full items-center justify-start rounded-3xl">
              <img
                className="rounded-3xl xl:h-[57vh] lg:h-[58vh] md:h-[53vh] sm:h-[52vh] xs:h-[34vh] opacity-95 object-fill 2xl:w-11/12 xl:w-full lg:w-full md:w-full sm:w-full xs:w-full"
                src={challenge.challengeImage}
                alt={challenge.title}
              />
            </div>
          </div>
        </div>
        <div className="2xl:px-12 xl:px-7 lg:px-12 md:px-6 xs:px-3 flex flex-col md:gap-y-8 xs:gap-y-5">
          <h1 className="lg:text-4xl xs:text-2xl md:text-3xl font-semibold ">
            Instructions -
          </h1>

          <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-x-7 gap-y-5">
            {challenge.instructions?.steps.map((step, index) => (
              <div
                key={index}
                className="flex border-green-100 border-2 rounded-3xl flex-col gap-y-4 md:px-9 xs:px-2 py-7"
              >
                <h1 className="md:text-2xl lg:text-3xl sm:text-2xl xs:text-xl m-0 list-decimal font-semibold text-green-800">
                  {step.heading}
                </h1>
                <h1 className="px-7 sm:text-xl xs:text-base m-0">
                  {step.description}
                </h1>
                <div
                  className="sm:px-10 xs:px-6 md:px-8 sm:text-lg xs:text-base !leading-9
                            "
                >
                  <ul>
                    {step.substeps.map((list, index) => (
                      <li key={index} className=" list-disc">
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

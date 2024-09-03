import { useEffect, useRef, useState } from "react";
import Pledge from "../../../../config/PledgePart.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PledgePart() {

  return (
    <div className="flex flex-col xs:gap-y-5 md:gap-y-8 relative">
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base  font-semibold">
          {Pledge.sectionTitle}
        </h1>
        <button className="m-0 text-anchor md:text-xl xs:text-base cursor-pointer">
          See All
        </button>
      </div>
      <div className="relative flex items-center justify-start w-full">
        <div
          className="flex items-center xl:overflow-visible xs:overflow-x-auto pb-8 gap-x-3"
        >
          <div className="flex xs:gap-x-3  xs:flex-row xl:flex-col gap-y-3">

            {Pledge.pledgePart1.map((pledge1, index) => (
              <div className="border relative rounded-2xl xl:w-[28vw] xl:h-64  2xl:w-[27vw]   xs:h-48 md:h-80 md:w-[29rem] xs:w-[17rem] 2xl:h-72  group">
                <img className="w-full h-full opacity-80 rounded-2xl" src={pledge1.imageUrl} />
                <div className="absolute inset-0 bg-black rounded-2xl opacity-20"></div>
                <div className="absolute inset-0 flex items-end justify-center p-2 text-white">
                  <div className="text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h1 className=" font-extrabold xs:text-lg md:text-2xl xl:text-2xl text-white bg-black bg-opacity-50 rounded-2xl xs:px-2 md:px-4 py-1">
                      {pledge1.title}
                    </h1>
                  </div>

                  <div className="absolute bottom-0 w-full xs:p-2 md:p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-y-3">
                    <div className="flex items-center">
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-y-3">
                          <h1 className="font-semibold xs:text-lg xl:text-3xl">
                            {pledge1.title}
                          </h1>
                          <p className="line-clamp-2 font-semibold text-left xs:text-xs md:text-base">
                            {pledge1.description}
                          </p>
                        </div>
                        <button className="bg-green-500 xs:p-1 md:p-2 rounded-full">
                          <ArrowForwardIcon sx={{ fontSize: {
                            xs :"1rem",
                            sm: "1.2rem"
                          } , color: "black" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Pledge.pledgePart2.map((pledge2, index) => (
              <div className="border relative rounded-2xl  2xl:w-[27vw] xl:w-[28vw]  md:h-80 md:w-[29rem] xs:h-48 xs:w-[17rem] 2xl:h-[22rem] group">
                <img className="w-full h-full rounded-2xl  object-cover opacity-80" src={pledge2.imageUrl} />

                <div className="absolute inset-0 bg-black rounded-2xl  opacity-15"></div>
                <div className="absolute inset-0 flex items-end justify-center p-2 rounded-2xl text-white">
                  <div className="text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h1 className="font-extrabold xs:text-lg md:text-2xl xl:text-2xl text-white bg-black bg-opacity-50 rounded-2xl xs:px-2 md:px-4 py-1"  >{pledge2.title}</h1>
                  </div>
                  <div className="absolute  bottom-0 w-full xs:p-2 md:p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-y-3">
                    <div className="flex items-center">
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-y-3">
                        <h1 className="font-semibold xs:text-lg xl:text-3xl">
                            {pledge2.title}
                          </h1>
                          <p className="line-clamp-2 font-semibold text-left xs:text-xs md:text-base">
                            {pledge2.description}
                          </p>
                        </div>

                        <button className="bg-green-500 xs:p-1 md:p-2 rounded-full">
                          <ArrowForwardIcon sx={{ fontSize: {
                            xs :"1rem",
                            sm: "1.2rem"
                          }, color: "black" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

          <div className="flex xs:gap-x-3 xs:flex-row xl:flex-col gap-y-3">
            {Pledge.pledgePart3.map((pledge3, index) => (
              <div className="border relative rounded-2xl 2xl:w-[27vw] xl:w-[28vw]  md:h-80 md:w-[29rem] xs:h-48 xs:w-[17rem] 2xl:h-[22rem] group">
                <img className="w-full opacity-80 h-full rounded-2xl"
                  src={pledge3.imageUrl} />
                <div className="absolute inset-0 bg-black rounded-2xl opacity-15"></div>
                <div className="absolute inset-0 flex items-end justify-center p-2 text-white">
                  <div className="text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h1 className="font-extrabold xs:text-lg md:text-2xl xl:text-2xl text-white bg-black bg-opacity-50 rounded-2xl xs:px-2 md:px-4 py-1 "  >
                      {pledge3.title}</h1>
                  </div>
                  <div className="absolute bottom-0 w-full xs:p-2 md:p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-y-3">
                    <div className="flex items-center">
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-y-3">
                        <h1 className="font-semibold xs:text-lg xl:text-3xl">
                            {pledge3.title}
                          </h1>
                          <p className="line-clamp-2 font-semibold text-left xs:text-xs md:text-base">
                            {pledge3.description}
                          </p>
                        </div>
                        <button className="bg-green-500 xs:p-1 md:p-2 rounded-full">
                          <ArrowForwardIcon sx={{ fontSize: {
                            xs :"1rem",
                            sm: "1.2rem"
                          }, color: "black" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Pledge.pledgePart4.map((pledge4, index) => (
              <div className="border relative rounded-2xl  2xl:w-[27vw] xl:w-[28vw]  md:h-80 md:w-[29rem] xs:h-48 xs:w-[17rem] 2xl:h-72 xl:h-64  group">
                <img className="w-full opacity-80 h-full rounded-2xl"
                  src={pledge4.imageUrl} />
                <div className="absolute inset-0 bg-black rounded-2xl opacity-15"></div>
                <div className="absolute inset-0 flex items-end justify-center p-2 text-white">
                  <div className="text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h1 className=" font-extrabold xs:text-lg md:text-2xl xl:text-2xl text-white bg-black bg-opacity-50 rounded-2xl xs:px-2 md:px-4 py-1 "  >
                      {pledge4.title}</h1>
                  </div>
                  <div className="absolute bottom-0 w-full xs:p-2 md:p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-y-3">
                    <div className="flex items-center">
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-y-3">
                        <h1 className="font-semibold xs:text-lg xl:text-3xl">
                            {pledge4.title}
                          </h1>
                          <p className="line-clamp-2 font-semibold text-left xs:text-xs md:text-base">
                            {pledge4.description}
                          </p>
                        </div>
                        <button className="bg-green-500 xs:p-1 md:p-2 rounded-full">
                          <ArrowForwardIcon sx={{ fontSize: {
                            xs :"1rem",
                            sm: "1.2rem"
                          }, color: "black" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>

          <div className="flex xs:flex-row xs:gap-x-3 xl:flex-col gap-y-3">

            {Pledge.pledgePart5.map((pledge5, index) => (
              <div className="border relative rounded-2xl  2xl:w-[27vw] xl:w-[28vw]  md:h-80 md:w-[29rem] xs:h-48 xs:w-[17rem] 2xl:h-72  xl:h-64 group">
                <img className="w-full h-full opacity-80 rounded-2xl" src={pledge5.imageUrl} />
                <div className="absolute inset-0 bg-black rounded-2xl opacity-15"></div>
                <div className="absolute inset-0 flex items-end justify-center p-2 text-white">
                  <div className="text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h1 className="font-extrabold xs:text-lg md:text-2xl xl:text-2xl text-white bg-black bg-opacity-50 rounded-2xl xs:px-2 md:px-4 py-1 "  >
                      {pledge5.title}
                    </h1>
                  </div>
                  <div className="absolute bottom-0 w-full xs:p-2 md:p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-y-3">
                    <div className="flex items-center">
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-y-3">
                        <h1 className="font-semibold xs:text-lg xl:text-3xl">
                            {pledge5.title}
                          </h1>
                          <p className="line-clamp-2 font-semibold text-left xs:text-xs md:text-base">
                            {pledge5.description}
                          </p>
                        </div>
                        <button className="bg-green-500 xs:p-1 md:p-2 rounded-full">
                          <ArrowForwardIcon sx={{ fontSize: {
                            xs :"1rem",
                            sm: "1.2rem"
                          }, color: "black" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Pledge.pledgePart6.map((pledge6, index) => (
              <div className="border relative rounded-2xl  2xl:w-[27vw] xl:w-[28vw]  md:h-80 md:w-[29rem] xs:h-48 xs:w-[17rem] 2xl:h-[22rem] group">
                <img className="w-full h-full rounded-2xl" src={pledge6.imageUrl} />
                <div className="absolute inset-0 bg-black rounded-2xl opacity-15"></div>
                <div className="absolute inset-0 flex items-end justify-center p-2 text-white">
                  <div className="text-center transition-opacity duration-300 group-hover:opacity-0">
                    <h1 className="font-extrabold xs:text-lg md:text-2xl xl:text-2xl text-white bg-black bg-opacity-50 rounded-2xl xs:px-2 md:px-4 py-1 "  >
                      {pledge6.title}
                    </h1>
                  </div>
                  <div className="absolute bottom-0 w-full xs:p-2 md:p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-y-3">
                    <div className="flex items-center">
                      <div className="flex flex-row items-end">
                        <div className="flex flex-col gap-y-3">
                        <h1 className="font-semibold xs:text-lg xl:text-3xl">
                            {pledge6.title}
                          </h1>
                          <p className="line-clamp-2 font-semibold text-left xs:text-xs md:text-base">
                            {pledge6.description}
                          </p>
                        </div>
                        <button className="bg-green-500 xs:p-1 md:p-2 rounded-full">
                          <ArrowForwardIcon sx={{ fontSize: {
                            xs :"1rem",
                            sm: "1.2rem"
                          }, color: "black" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>


      </div>
    </div>
  );
}


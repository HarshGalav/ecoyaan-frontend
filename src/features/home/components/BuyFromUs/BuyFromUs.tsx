import BuyFrom from "../../../../config/BuyFromUs.json";

export default function BuyFromUs() {
  return (
    <div className="flex flex-col gap-y-7  xs:pt-3 md:pt-0 relative">
      <div className="flex ">
        <h1 className="m-0 md:text-2xl xs:text-base  font-semibold">
          {BuyFrom.sectionTitle}
        </h1>
      </div>
      <div className="flex xs:flex-col md:flex-row gap-y-5 items-center justify-between md:gap-x-5 xs:gap-x-8 md:px-1 xs:px-1 md:overflow-scroll pb-8">
        {BuyFrom.buyFromUs.map((buyFrom, index) => (
          <div
            key={index}
            className={`border p-1 px-5 justify-evenly border-gray-200 xs:w-[300px] lg:w-[43rem] md:w-[400px] md:h-[310px] flex  items-center lg:min-w-80 md:min-w-[33rem] xs:min-w-64 xs:h-[329px]   xs:flex-col md:flex-row  rounded-2xl  `}
            style={{ backgroundColor: buyFrom.color }}
          >
            <div className="">
              <img
                className="border border-gray-200 rounded-3xl md:w-[50rem] xs:w-64 xs:h-44 md:h-60  h-60"
                src={buyFrom.imageSrc}
              />
            </div>
            <div className="xs:px-5 md:px-5 xl:px-6  flex flex-col gap-y-3 md:py-1 xl:py-3 xs:py-1 ">
              <h1 className=" xs:text-sm md:text-lg">{buyFrom.title}</h1>
              <div className="flex flex-col xs:gap-y-2 xl:gap-y-3">
                <h1 className="xs:text-base md:text-xl  xl:text-xl line-clamp-3 ">
                  {buyFrom.descriptionTitle} 
                </h1>
                <h3 className=" xs:line-clamp-2 xs:!leading-6 md:!leading-7 xs:text-sm md:text-sm lg:text-sm 2xl:text-base  md:line-clamp-4">
                  {buyFrom.descriptionText}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import EcoyaanImpact from "../../../../config/EcoyaanImpactPart.json";
export default function EcoyaanImpactPart() {

  return (
    <div className="flex flex-col xs:gap-y-5 md:gap-y-8 relative">
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base font-semibold">
          {EcoyaanImpact.sectionTitle}
        </h1>
        <button className="m-0 md:text-xl xs:text-base text-anchor">
          See All
        </button>
      </div>
      <div className="relative flex items-center xs:justify-center lg:justify-between md:gap-x-5 xs:gap-x-5 md:px-1 xs:px-1">
        <div className="flex xs:flex-col lg:flex-row overflow-x-scroll gap-x-2 gap-y-7 pb-7">
          {EcoyaanImpact.impacts.map((impact, index) => (

              <div  key={index} className="flex flex-col shadow-xl bg-white border items-center justify-evenly border-gray-200 md:gap-y-1 xs:gap-y-2 rounded-3xl xs:pt-2 md:pt-2 py-2 relative lg:min-w-[30rem]">
                <div className="flex xs:flex-col md:flex-row items-center justify-between w-full px-3 xs:gap-y-2 lg:gap-y-8 lg:py-3 xs:py-1 rounded-3xl">
                  <div className="flex xs:p-3 lg:p-2 xs:w-80 flex-col xs:gap-y-3 lg:gap-y-6">
                    <h1 className="xs:text-lg lg:text-2xl font-bold">{impact.title}</h1>
                    <ul className="text-sm space-y-3 animate-fade-in-up">
                    {impact.details.map((detail, idx) => (
                        <li key={idx} className="flex md:flex-row items-center justify-between">
                          <span className="xs:text-base">{detail.heading}:</span>
                          <span className="font-semibold text-lg">{detail.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex xs:w-full lg:w-[11rem] lg:h-[12rem] md:w-[16rem] items-end justify-end">
                    <img
                      className="opacity-80 md:p-0 md:h-full md:w-full xs:w-48 lg:h-28 xs:h-24"
                      src={impact.image}
                    />
                  </div>
                </div>
                <div className="xs:pb-3">
                  <button className="bg-primary p-2 lg:py-3 text-white font-semibold xs:w-72 lg:w-80 rounded-full text-base">{impact.buttonText}</button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

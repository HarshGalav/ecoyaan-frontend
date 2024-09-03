import myImpact from "../../config/MyImpactPart.json"

export default function MyImpactInfo() {
    return (
        <div className=" xs:py-7 ">
            <div className=" flex flex-col gap-y-7">
                <div className="flex items-center gap-x-5 ">
                    <h1 className='font-semibold xs:text-base md:text-2xl'>
                        {myImpact.impact.title}
                    </h1>
                </div>
                <div className="flex gap-x-8 overflow-scroll pb-8">
                <div className='flex gap-x-8 px-2 '>
                    {myImpact.impact.images.map((img, index) => (
                        <div key={index} className='relative xs:w-52 xs:h-56 md:h-64 md:w-72'>
                            <img className=' border border-gray-400 opacity-85 rounded-2xl h-full w-full' src={img.src} />

                            {img.metrics.map((heading, index) => (
                                <div className=' text-white rounded-br-2xl rounded-bl-2xl absolute bottom-0 flex gap-y-3  py-6 flex-col items-center  justify-center w-full'
                                    style={{
                                        "background": "linear-gradient(179.93deg, rgba(255, 255, 255, 0) 0.06%, #000000 101.54%)"
                                    }}>
                                    <p className='md:text-2xl font-semibold'>
                                        {heading.amount}
                                    </p>
                                    <p>{heading.description}</p>
                                </div>
                            ))}

                        </div>
                    ))}
                </div>
                <div>
                   
                </div>
                </div>
            </div>
        </div>
    )
}




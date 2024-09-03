import pledgeStatus from "../../../../config/PledgeStatus.json";;

export default function PledgeLoginStatus(){

    const {heading, active, completed} = pledgeStatus.pledgeStatus;

    return (
        <div className="">
            <div className="flex flex-col xs:gap-y-4 md:gap-y-8 ">
                <div>
                    <h1 className="font-semibold xs:text-base md:text-2xl" >{heading}</h1>
                </div>
                <div className="flex gap-x-9 px-2">
                    <div className="border rounded-2xl flex flex-col justify-between items-center xs:gap-y-3 md:gap-y-6 p-3 md:w-36 xs:w-28">
                        <p className="font-semibold md:text-2xl">
                            {active.count}</p>
                        <p className="text-base">{active.description}</p>
                    </div>
                    <div className="border rounded-2xl md:gap-y-6 flex flex-col justify-between xs:gap-y-3  items-center p-3 md:w-36 xs:w-28">
                    <p className="font-semibold md:text-2xl">
                        {completed.count}
                    </p>
                    <p className="text-base">{completed.description}</p>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
import { KeyboardArrowDown } from "@mui/icons-material";

export default function ProductOffer() {
  return (
    <>
      <div className=" border-t-2  border-gray-300 px-2 py-4">
        <div className="flex justify-between px-1">
          <h1 className="sm:text-base xs:text-lg px-2 font-bold">Offers</h1>
          <KeyboardArrowDown className="cursor-pointer" />
        </div>
      </div>
    </>
  );
}

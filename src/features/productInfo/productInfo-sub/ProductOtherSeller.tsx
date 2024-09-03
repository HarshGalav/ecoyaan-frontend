import { KeyboardArrowRight } from "@mui/icons-material";

export default function ProductOtherSeller() {
  return (
    <>
      <div className=" border-t-2 border-b-2  border-gray-300 px-2 py-4">
        <div className=" px-1 gap-y-4 grid">
          <h1 className="text-lg px-2 font-bold">Other Sellers</h1>
          <div className="flex justify-between">
            <p className="text-base text-gray-500 px-2">
              Compare new 4 sellers
            </p>
            <KeyboardArrowRight className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

import { KeyboardArrowDown } from "@mui/icons-material";
import productData from "../../../config/productData.json";
import ProductOffer from "./ProductOffer";

export default function ProductDetails() {
  const { product } = productData;

  return (
    <>
      <div className=" border-t-2 border-gray-300 md:px-1 py-5">
        <div className="grid gap-y-4">
          <h1 className="sm:text-xl xs:text-xl text-primary-text px-2 font-bold">
            Product Details
          </h1>
          <div className="text-primary-text">
            <table>
              <tbody>
                <tr className="p-1">
                  <td className="p-2 font-bold xs:text-sm md:text-lg ">Capacity</td>
                  <td>{product.details.capacity}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold xs:text-sm md:text-lg">Care Instructions</td>
                  <td>{product.details.care_instructions}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold xs:text-sm md:text-lg">Recommended Use</td>
                  <td>{product.details.recommended_uses}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold xs:text-sm md:text-lg">Country of Origin</td>
                  <td>{product.details.country_of_origin}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className=" border-t-2  border-gray-300 px-2 py-4">
              <div className="flex justify-between px-1">
                <h1 className="sm:text-base xs:text-lg px-2 font-bold">Certifications</h1>
                <KeyboardArrowDown className="cursor-pointer" />
              </div>
            </div>

            <ProductOffer />
            {/* <ProductOtherSeller /> */}

            <div className="flex pt-6 border-t-2  border-gray-300 justify-between   px-2">
              {product.attributes.map((att, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-y-4  items-center"
                >
                  <div className="w-10 p-1 rounded-full">
                    <img src={att.img} className=" h-10 " />
                  </div>
                  <p className="text-sm font-semibold sm:text-lg xs:text-xs text-green-700">
                    {att.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

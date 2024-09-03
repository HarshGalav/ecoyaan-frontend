import { useEffect, useState } from "react";
import ProductOffer from "./ProductOffer";
import ProductDetails from "./ProductDetails";
import { CONSTANTS } from "../../../utils/constants";

interface ProductPriceDetailProps {
  selectedProduct: {
    discount: string;
    price: number;
    mrp: number;
    colors: {
      img: string;
      available: boolean;
    }[];
    sizes: {
      size: string;
      available: boolean;
    }[];
  };
}

const ProductPriceDetail: React.FC<ProductPriceDetailProps> = ({
  selectedProduct,
}) => {
  const [count, setCount] = useState(1);
  const [locationAvailable, setLocationAvailable] = useState(true);

  const [pincode, setPincode] = useState<string>("Fetching...");;

  const [userData, setUserData] = useState({
    state: "",
    city: "",
    address_line: "",
    pincode: ""
  });

  const handlePincodeChange = (event: any) => {
    setPincode(event.target.value);
  };


  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       successFunction,
  //       errorFunction,
  //       { enableHighAccuracy: true }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  // const successFunction = (position: GeolocationPosition) => {
  //   const { latitude, longitude } = position.coords;
  //   console.log("latitiude" , latitude)
  //   console.log("longitude" , longitude)
  //   console.log("position" , position)

  // };

  //    // console.log("line 76", data.city)

  //    const errorFunction = (error: GeolocationPositionError) => {
  //     alert(`Error getting geolocation: ${error.message}`);
  //   };

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await fetch(
          `${CONSTANTS.API_ENDPOINT}/v1/guests/ip_address`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("line 66", data)
        setUserData(prevUserData => ({
          ...prevUserData,
          address_line: data.address_line,
          city: data.city,
          pincode: data.pincode,
          state: data.state
        }))

        setPincode(data.pincode || "Unknown");
      } catch (error) {
        console.error("Error fetching pincode:", error);

      }
    };
    handleGetData();
  }, [])


  //   // Latitude 29.2445491, Longitude 79.5293005

  return (
    <>
      <section className="flex  items-center justify-center gap-y-6 md:px-28 sm:px-16 xs:px-1 lg:px-0">
        <div className="flex flex-col gap-y-7 w-full">
          <div className="flex flex-col w-full self-center gap-y-7 border border-gray-300 rounded-xl py-4 pb-6 shadow-sm px-4">
            <div className="flex flex-col px-3 gap-y-4">
              <div className="flex gap-x-3 items-end">
                <span className="text-md text-red-700">
                  {selectedProduct.discount}
                </span>
                <p className="text-3xl font-semibold">
                  &#8377;{selectedProduct.price}
                </p>
              </div>
              <p className="text-gray-500 flex gap-x-3">
                M.R.P
                <span className="line-through">
                  &#8377;{selectedProduct.mrp}
                </span>
              </p>
              <p className="text-sm text-gray-700">Inclusive of all taxes</p>
            </div>

            {selectedProduct.colors &&
              selectedProduct.colors.some((color) => color.available) && (
                <div className="px-2 gap-y-3 flex flex-col">
                  <p>More Colors:</p>
                  <div className="flex gap-x-3 gap-y-2 px-2 flex-wrap">
                    {selectedProduct.colors.map(
                      (color, index) =>
                        color.available && (
                          <img
                            key={index}
                            className="h-20 w-20 hover:border cursor-pointer"
                            src={color.img}
                            alt={`Color option ${index + 1}`}
                          />
                        ),
                    )}
                  </div>
                </div>
              )}

            {selectedProduct.sizes &&
              selectedProduct.sizes.some((size) => size.available) && (
                <div className="px-2 gap-y-3 flex flex-col">
                  <p>Available Sizes:</p>
                  <div className="flex gap-x-5">
                    {selectedProduct.sizes.map(
                      (size, index) =>
                        size.available && (
                          <div
                            key={index}
                            className="border p-1 px-3 border-gray-300"
                          >
                            <div>{size.size}</div>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

            <div className="flex items-center gap-x-5 xl:px-7 lg:px-7 md:px-7 sm:px-7 xs:px-3">
              <p className="text-xl text-[#000000]">Quantity: </p>
              <div className="flex border items-center p-1 gap-x-2">
                {count > 1 ? (
                  <button
                    onClick={() => setCount(count - 1)}
                    className="text-3xl text-gray-400 font-bold px-3"
                  >
                    -
                  </button>
                ) : (
                  <button
                    disabled
                    onClick={() => setCount(count - 1)}
                    className="text-3xl text-gray-400 font-bold px-3"
                  >
                    -
                  </button>
                )}
                <p className="m-0">{count}</p>
                <button
                  onClick={() => setCount(count + 1)}
                  className="text-2xl text-gray-400 font-bold px-4"
                >
                  +
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-7 justify-center items-center">
              <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                <button className="rounded-3xl bg-primary text-white text-2xl xs:w-full  sm:w-3/4 xs:px-20 py-3 hover:bg-green-600">
                  Add to Cart
                </button>
                <button className="rounded-3xl bg-anchor text-white text-2xl xs:w-full sm:w-3/4 xs:px-20 hover:bg-[#5cbee1] py-3">
                  Buy Now
                </button>
                <div className="flex flex-col gap-y-3 justify-center items-center w-full my-3 text-secondary-text">
                  <p>Check Delivery Location :</p>
                  <input
                  
                    type="number"
                    className="rounded-3xl border-2 border-gray-300 text-primary-text  sm:text-xl xs:w-full  sm:w-3/4 xs:px-8 py-3 outline-none"
                    placeholder="Enter pin code"
                    value={pincode}
                    onChange={handlePincodeChange}
                  >

                  </input>

                  <div className="text-primary-text">
                    {pincode === "Fetching..." ? (
                      <p>Fetching...</p>
                    ) : (
                      <>
                        {userData.address_line ? `${userData.address_line}, ` : ""}
                        {userData.city}, {userData.state}, {userData.pincode}
                      </>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
          <ProductDetails />
        </div>
      </section>
    </>
  );
};

export default ProductPriceDetail;

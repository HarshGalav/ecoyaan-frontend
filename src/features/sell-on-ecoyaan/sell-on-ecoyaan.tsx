import Form from "./Form";
import { Helmet } from "react-helmet-async";

function SellOnEcoyaan() {
  return (
    <>
      <Helmet>
        <title>Sell on ecoyaan | Ecoyaan</title>
        <meta name="description" content="Sell on ecoyaan" />
      </Helmet>
      <div className="pagePadding container-sub hidden max-[480px]:block">
        <div className="heading-banner mb-5">
          <img
            src="/images/SellOnEcoyaan.png"
            alt="Sell on Ecoyaan"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              borderRadius: "20px",
            }}
          />
        </div>
        <h3 className="subHeading"> Seller Form </h3>
        <p>
          <br />
          We will get back to you!
        </p>
        <br />

        <div className="form-container">
          <Form />
        </div>
      </div>

      <div
        className="pagePadding container-sub hidden md:block"
        style={{ overflowY: "hidden" }}
      >
        <div className="home-container" style={{ display: "flex" }}>
          <div className="home-container-image">
            <div className=" mt-16">
              <h1 className="mb-4"> Seller Form </h1>
            </div>
            <p>We will get back to you!</p>
            <br />
            <div className="form-container">
              <Form />
            </div>
          </div>
          <div className="home-container-image img-position img-pos-sell">
            <img
              src="/images/SellOnEcoyaan.png"
              className="h-[650px] w-full img-cover"
              alt="Sell on Ecoyaan"
              style={{
                objectFit: "cover",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SellOnEcoyaan;

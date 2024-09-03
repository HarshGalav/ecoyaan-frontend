import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

export default function OurTeamMembers() {
  return (
    <div>
      <section className="py-4 padding-1rem">
        <div className="xl:p-12">
          <h2 className="subHeading">Meet the Team</h2>
          <div className="">
            <div className="display-values">
              <div className="display-team odd" style={{ width: "33%" }}>
                <div className="img-style">
                  <img
                    src="/images/about-us-social-media-team-01.png"
                    className="h-[200px] img-fit img-height-auto img-hover"
                    alt="about-us-social-media-team"
                  />
                </div>
                <div className="xl:-mt-6">
                  <h3 className="text-center text-style font-bold">SHRUTHI</h3>
                  <h3 className="text-center text-style team-heading">
                    SOCIAL MEDIA
                  </h3>
                </div>

                <div className="width-values">
                  <p className="team-width">
                    Shruthi is in charge of our Instagram. She is a practising
                    Vegan and cares deeply about sustainability. Follow her
                    small business
                    <a
                      className="link"
                      href="https://www.instagram.com/soulfullymade_crafts/"
                      target="_blank"
                    >
                      &nbsp;here <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </p>
                </div>
              </div>
              <div
                className="display-team team-ml even"
                style={{ width: "33%" }}
              >
                <div className="img-style">
                  <img
                    src="/images/about-us-social-media-team-02.png"
                    className="h-[200px] img-fit img-height-auto img-hover"
                    alt="about-us-social-media-team"
                  />
                </div>
                <div className="xl:-mt-6">
                  <h3 className="text-center text-style font-bold">URMIL</h3>
                  <h3 className="text-center text-style team-heading">
                    SOCIAL MEDIA
                  </h3>
                </div>
                <div className="width-values">
                  <p className="team-width">
                    Urmil creates engaging content for us. She runs her own
                    sustainable apparel store with her sister and advocates for
                    slow fashion. Check out her business
                    <a
                      className="link"
                      href="https://www.instagram.com/ferozi.conscious/ "
                      target="_blank"
                    >
                      &nbsp;here <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </p>
                </div>
              </div>
              <div
                className="display-team team-ml odd"
                style={{ width: "33%" }}
              >
                <div className="img-style">
                  <img
                    src="/images/about-us-product-team-01.png"
                    className="h-[200px] img-fit img-height-auto img-hover"
                    style={{ left: "23%" }}
                    alt="about-us-product-team"
                  />
                </div>
                <div className="xl:-mt-6">
                  <h3 className="text-center text-style font-bold">DIVYA</h3>
                  <h3 className="text-center text-style team-heading">
                    UX DESIGN
                  </h3>
                </div>
                <div className="width-values">
                  <p className="team-width">
                    Divya creates user-friendly and engaging interfaces for our
                    platform. Check out more of her work on
                    <a
                      className="link"
                      href="https://www.behance.net/bodradivya "
                      target="_blank"
                    >
                      &nbsp;Behance
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="display-values">
              <div className="display-team even" style={{ width: "33%" }}>
                <div className="product-img-style">
                  <img
                    src="/images/about-us-product-team-02.png"
                    className="h-[200px] img-fit img-height-auto img-hover"
                    alt="about-us-product-team"
                  />
                </div>
                <div className="xl:-mt-6">
                  <h3 className="text-center product-text-style font-bold">
                    PRASHANITH
                  </h3>
                  <h3 className="text-center product-text-style team-heading">
                    ENGINEERING
                  </h3>
                </div>
                <div className="width-values">
                  <p className="team-width">
                    Prashanith is our front-end engineer, who brings the UX
                    designs to life
                  </p>
                </div>
              </div>
              <div
                className="display-team team-ml odd"
                style={{ width: "33%" }}
              >
                <div className="product-img-style">
                  <img
                    src="/images/about-us-product-team-03.png"
                    className="h-[200px] img-fit img-height-auto img-hover"
                    alt="about-us-product-team"
                  />
                </div>
                <div className="xl:-mt-6">
                  <h3 className="text-center product-text-style font-bold">
                    SAI ABHILASH
                  </h3>
                  <h3 className="text-center product-text-style team-heading">
                    ENGINEERING
                  </h3>
                </div>
                <div className="width-values">
                  <p className="team-width">
                    Sai Abhilash is our back-end engineer, who manages and
                    optimises the infrastructure and logic of our platform
                  </p>
                </div>
              </div>
              <div
                className="display-team team-ml even"
                style={{ width: "33%" }}
              >
                <div className="product-img-style">
                  <img
                    src="/images/favicon.png"
                    className="h-[200px] img-fit img-height-auto img-hover"
                    style={{ mixBlendMode: "multiply" }}
                    alt="Ecoyaan"
                  />
                </div>
                <div className="xl:-mt-6">
                  <h3 className="text-center product-text-style font-bold">
                    ???
                  </h3>
                  <h3 className="text-center product-text-style team-heading">
                    TEAM ECOYAAN
                  </h3>
                </div>
                <div className="width-values">
                  <p className="team-width text-center">
                    This spot awaits you.
                    <br />
                    Check out our
                    <a className="link" href="/careers">
                      &nbsp;open positions
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

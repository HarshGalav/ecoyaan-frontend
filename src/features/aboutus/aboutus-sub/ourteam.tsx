import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

export default function OurTeam() {
  const nav = useNavigate();
  return (
    <div>
      <section className="py-4 padding-1rem">
        <div className="xl:p-12">
          <h2 className="subHeading">Our Story</h2>
          <div className="hidden md:block">
            <div className="display-values">
              <div className="display-img">
                <img
                  src="/images/about-us-founding-team-01.png"
                  className="h-[200px] img-fit img-fit-height img-hover"
                  alt="about-us-founding-team"
                />
                <img
                  src="/images/about-us-founding-team-02.png"
                  className="h-[200px] img-fit img-fit-height img-hover"
                  alt="about-us-founding-team"
                />
              </div>
              <div className="w-full">
                <div className="team-margin">
                  <p>
                    We started Ecoyaan after watching an episode of “Our Planet
                    II”, where we saw the devastating impact of plastic
                    pollution and climate change on the albatross birds. That
                    moment ignited our mission.
                  </p>
                  <br />
                  <p>
                    Our research suggests that many Indians understand global
                    warming, yet access to sustainable practices and products
                    remains limited. We also noticed that there is a lack of
                    support for eco-friendly businesses.
                  </p>
                  <br />
                  <p>
                    We created Ecoyaan to connect consumers, businesses, and
                    sustainability experts. We want to make it easy and
                    convenient for people to access eco-friendly products and
                    services, learn and share best practices, and support
                    sustainability initiatives.
                  </p>
                  <br />
                  <p>
                    As founders, we are not perfect, but we are passionate. We
                    believe that every small step matters. Join us and be a part
                    of the Ecoyaan community — together, we’ll make a
                    difference.
                  </p>
                  <br />
                  <p>
                    Connect with the founders on LinkedIn here:
                    <a
                      className="link"
                      href="https://www.linkedin.com/in/abhishek-rao-k"
                      target="_blank"
                    >
                      &nbsp;Abhishek Rao <FontAwesomeIcon icon={faLinkedin} />
                    </a>{" "}
                    <a
                      className="link"
                      href="https://www.linkedin.com/in/sarwanjeetsingh/"
                      target="_blank"
                    >
                      &nbsp;Sarwan Singh <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden max-[480px]:block ">
          <div className="display-img">
            <img
              src="/images/about-us-founding-team-01.png"
              className="h-[200px] img-fit img-height-auto"
              alt="about-us-founding-team"
            />
            <img
              src="/images/about-us-founding-team-02.png"
              className="h-[200px] img-fit img-height-auto"
              alt="about-us-founding-team"
            />
          </div>
          <p>
            We started Ecoyaan after watching an episode of “Our Planet II”,
            where we saw the devastating impact of plastic pollution and climate
            change on the albatross birds. That moment ignited our mission.
          </p>
          <br />
          <p>
            Our research suggests that many Indians understand global warming,
            yet access to sustainable practices and products remains limited. We
            also noticed that there is a lack of support for eco-friendly
            businesses.
          </p>
          <br />
          <p>
            We created Ecoyaan to connect consumers, businesses, and
            sustainability experts. We want to make it easy and convenient for
            people to access eco-friendly products and services, learn and share
            best practices, and support sustainability initiatives.
          </p>
          <br />
          <p>
            As founders, we are not perfect, but we are passionate. We believe
            that every small step matters. Join us and be a part of the Ecoyaan
            community — together, we’ll make a difference.
          </p>
          <br />
          <p>Connect with the founders on LinkedIn here: </p>
          <ul className="list-disc list-inside m-2">
            <li>
              <a
                className="link"
                href="https://www.linkedin.com/in/abhishek-rao-k"
                target="_blank"
              >
                Abhishek Rao <FontAwesomeIcon icon={faLinkedin} />
              </a>{" "}
            </li>
            <li>
              <a
                className="link"
                href="https://www.linkedin.com/in/sarwanjeetsingh/"
                target="_blank"
              >
                Sarwan Singh <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>

          <br />
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ROUTES } from "../../utils/Routes";

function Careers() {
  const [inputs, setInputs] = useState({});
  const nav = useNavigate();
  const careerRoles: any = [
    {
      type: "Internship",
      role: "Software Developer",
      options: [{ type: "Engineering" }, { type: "Remote" }],
      title: ".NET and React Intern",
    },
    {
      type: "Internship",
      role: "Founder's Office",
      options: [
        {
          type: "Pre/Post MBA",
        },
        {
          type: "Remote",
        },
      ],
      title: "Founder's Office- Intern",
    },
    {
      type: "Internship",
      role: "Sustainability Researcher",
      options: [
        {
          type: "Environmentalist",
        },
        {
          type: "Remote",
        },
      ],
      title: "Sustainability Researcher- Intern",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Careers at Ecoyaan | Ecoyaan</title>
        <meta name="description" content="Careers at Ecoyaan" />
      </Helmet>
      <div className="pagePadding container-sub max-[480px]:block md:hidden">
        <div className="heading-banner mb-5">
          <img
            src="/images/careers.png"
            className="h-[320px] w-full img-cover"
            alt="Careers at ecoyaan"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              borderRadius: "20px",
            }}
          />
        </div>

        <div className="mb-7">
          <h3 className="subHeading mb-4"> Explore Opportunities </h3>
        </div>
        <div className="flex-container mt-5">
          {careerRoles.map((careerRole: any, index: number) => {
            return (
              <div
                key={index}
                className="carrer-box cursor-pointer"
                onClick={() =>
                  nav(ROUTES.CAREER_DESCRIPTION, {
                    state: careerRole,
                  })
                }
              >
                <p>{careerRole.type}</p>
                <h2 className="title-alignment text-green-600">
                  {careerRole.role}
                </h2>
                <div className="button-display">
                  {careerRole.options.map((option: any) => {
                    return (
                      <button className="bg-gray-200 hover:bg-gray-300 text-black py-1 px-4 mr-2 rounded-lg">
                        {option.type}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pagePadding container-sub hidden md:block">
        <div className="home-container" style={{ display: "flex" }}>
          <div className="home-container-image">
            <h2 className="subHeading aboutus-home-subHeading">
              Explore Opportunities
            </h2>
            <div className="flex-container mt-5">
              {careerRoles.map((careerRole: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="carrer-box cursor-pointer"
                    onClick={() =>
                      nav(ROUTES.CAREER_DESCRIPTION, {
                        state: careerRole,
                      })
                    }
                  >
                    <p>{careerRole.type}</p>
                    <h2 className="mb-1 text-green-600">{careerRole.role}</h2>
                    <div className="button-display">
                      {careerRole.options.map((option: any) => {
                        return (
                          <button className="bg-gray-200 hover:bg-gray-300 text-black py-1 px-4 mr-2 rounded-lg">
                            {option.type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="home-container-image img-position img-pos">
            <img
              src="/images/careers.png"
              className="h-[510px] w-full img-cover"
              alt="Careers at ecoyaan"
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

      <div className="spacer bg-color"></div>
      <div className="spacer bg-color"></div>
    </>
  );
}

export default Careers;

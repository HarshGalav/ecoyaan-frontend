import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useScrollToTop from "../../hooks/useScrollToTop";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { ROUTES } from "../../utils/Routes";

const CareerDescription = () => {
  const [inputs, setInputs] = useState({});
  const nav = useNavigate();
  const { state } = useLocation();

  const CareerDesc = ({ careerObj }: any) => {
    careerObj = state;
    if (careerObj?.role === "Software Developer") {
      return (
        <>
          <h2 className="subHeading">Job Summary</h2>
          <br />
          <p>
            We are seeking a talented and motivated .NET and React Intern to
            join our dynamic development team. The ideal candidate should have a
            strong passion for software development, a basic understanding of
            .NET and React technologies, and a willingness to learn and
            contribute to real-world projects.
          </p>
          <br />
          <h2 className="subHeading">Key Responsibilities</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>
              Collaborate with the development team to understand project
              requirements and objectives.
            </li>
            <li>
              Assist in the design, development, testing, and maintenance of
              software applications using .NET and React technologies.
            </li>
            <li>
              Learn and apply best practices for software development and coding
              standards.
            </li>
            <li>
              Work closely with senior developers to enhance technical skills
              and gain hands-on experience.
            </li>
            <li>
              Troubleshoot, debug and resolve software defects and issues.
            </li>
            <li>
              Document code, processes, and procedures to ensure maintainability
              and scalability.
            </li>
          </ul>
          <br />

          <h2 className="subHeading">Qualifications</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>
              Pursuing a Bachelor's or Master's degree in Computer Science,
              Information Technology, or a related field.
            </li>
            <li>Basic understanding of .NET framework and React.js.</li>
            <li>
              Familiarity with front-end and back-end development concepts.
            </li>
            <li>Knowledge of HTML, CSS, and JavaScript.</li>
            <li>Strong problem-solving and analytical skills.</li>
            <li>Excellent communication and collaboration abilities.</li>
            <li>Eagerness to learn and adapt to new technologies.</li>
            <li>Ability to work well in a team environment.</li>
            <li>Having a passion for sustainability is a bonus</li>
          </ul>
          <br />

          <h2 className="subHeading">Preferred Skills (not mandatory):</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>Experience with version control systems (e.g., Git).</li>
            <li>Familiarity with agile development methodologies.</li>
            <li>
              Exposure to database systems (e.g., SQL Server,PostgreSQL, MySQL).
            </li>
            <li>Understanding of RESTful API development.</li>
          </ul>
          <br />

          <h2 className="subHeading">Internship Details:</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>Duration: 4 Months</li>
            <li>Work Schedule: Flexible</li>
            <li>Expected work time: 40 hours per week</li>
          </ul>
          <br />

          <h2 className="subHeading">What we offer</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>Work experience certificate at the end of the internship</li>
            <li>Mentorship of experienced industry experts </li>
            <li>A chance to work on a startup from the ground up</li>
            <li>
              Select few interns will be provided with Equity awards and a
              possible offer to convert to full-time after the internship.
            </li>
          </ul>
          <br />
        </>
      );
    } else if (careerObj.role === "Founder's Office") {
      return (
        <>
          <h2 className="subHeading">Job Summary</h2>
          <br />
          <p>
            We are looking for highly motivated pre-MBA or recent graduates from
            tier 1 B-schools to join our founding team as interns. You will be
            assigned specific problems related to Operations, Marketing,
            Product, or Strategy as per your background and fitment.
          </p>
          <br />
          <h2 className="subHeading">Qualifications</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>
              Pre-MBA or fresh MBA graduates who have just passed out of tier-1
              B-schools (ISB, Ivy Leagues, IIMs, MDI, XLRI etc.)
            </li>
            <li>
              Post-MBA graduates who have an extended joining date for their
              respective organisations are welcome to apply
            </li>
            <li>
              We recommend checking our website and our social media handle
              <a
                className="footer-images-link link-hover"
                style={{ marginLeft: "0px" }}
                href="https://www.instagram.com/ecoyaan/"
                target="_blank"
              >
                {" "}
                <FontAwesomeIcon icon={faInstagram} />
              </a>{" "}
              to understand more about our mission and only apply if it connects
              with you! Having a passion for sustainability is a plus.
            </li>
            <li>
              We welcome people from all backgrounds- what matters is what you
              bring to the table
            </li>
            <li>
              You should be a problem solver and be ready to get your hands
              dirty
            </li>
            <li>Ability to self-manage and execute independently is a must</li>
            <li>
              Candidates with some experience with early-stage startups,
              Consulting, E-commerce, Impact Marketing, Influencer Marketing,
              Branding, Gamification, UX design, and Supply chain will be
              preferred
            </li>
          </ul>
          <br />
          <h2 className="subHeading">Internship Details:</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>Duration: 3-6 Months</li>
            <li>Work Schedule: Flexible</li>
            <li>Expected work time: 40 hours per week</li>
          </ul>
          <br />
          <h2 className="subHeading">What we offer</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>A chance to work on a startup from the ground up</li>
            <li>
              Challenging problems to solve in areas related to Operations,
              Product Management, Operations, and Strategy
            </li>
            <li>
              Projects will involve working on cutting-edge products and
              services, providing hands-on experience in a collaborative and
              innovative environment, that goes beyond the conventional
              internship.
            </li>
            <li>Mentorship of experienced industry experts</li>
            <li>Work experience certificate at the end of the internship</li>
            <li>
              Select few interns will be provided with Equity awards and a
              possible offer to convert full-time post your MBA
            </li>
          </ul>
          <br />
        </>
      );
    } else if (careerObj.role === "Sustainability Researcher") {
      return (
        <>
          <h2 className="subHeading">Job Summary</h2>
          <br />
          <p>
            As a Sustainability Researcher at Ecoyaan, you will be key in
            advancing our sustainability goals through research, analysis, and
            strategic planning. You will be responsible for conducting in-depth
            assessments, analyzing data, and identifying opportunities across
            various aspects of sustainability. You will create and implement
            frameworks and methodologies for vetting products in different
            categories. Awareness about carbon footprinting, data analysis,
            sustainability reporting, sustainability content writing,
            sustainability certifications, and life cycle assessment (LCA)
            methodologies will be preferred. Additionally, the candidate should
            possess a deep passion for sustainability and a commitment to
            driving positive change.
          </p>
          <br />
          <h2 className="subHeading">Qualifications</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>
              Graduate or Master’s degree in Sustainability Management,
              Environmental Studies and Resource Management, or relevant fields
              focused on Sustainability from reputable institutions such as
              TISS, TERI, IITs, etc.
            </li>
            <li>
              Candidates with fellowships from esteemed global organizations
              like EDF, US DOE, and UN or substantial work experience in
              sustainability teams within corporates, environmental think tanks,
              NGOs, or research institutions will be given preference.
            </li>
            <li>Excellent written and verbal communication skills</li>
            <li>
              Ability to work independently and collaboratively in a fast-paced
              environment
            </li>
            <li>
              We recommend checking our website and our social media handle
              <a
                className="footer-images-link link-hover"
                style={{ marginLeft: "0px" }}
                href="https://www.instagram.com/ecoyaan/"
                target="_blank"
              >
                {" "}
                <FontAwesomeIcon icon={faInstagram} />
              </a>{" "}
              to understand more about our mission and only apply if it connects
              with you! Having a passion for sustainability is a plus.
            </li>
            <li>
              We welcome people from all backgrounds- what matters is what you
              bring to the table
            </li>
          </ul>
          <br />
          <h2 className="subHeading">Responsibilities</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>
              Develop and implement robust frameworks and methodologies for
              evaluating products across diverse categories
            </li>
            <li>
              Conduct comprehensive assessments, analyze data, and identify
              improvement opportunities spanning various sustainability aspects.
            </li>
            <li>
              Research sustainability best practices, emerging trends, and
              industry standards.
            </li>
            <li>
              Assist in the development and implementation of sustainability
              initiatives and strategies.
            </li>
            <li>
              Support sustainability certification efforts and ensure compliance
              with relevant standards. with you! Having a passion for
              sustainability is a plus.
            </li>
            <li>
              Prepare reports, presentations, and other materials to communicate
              findings and recommendations
            </li>
            <li>
              Engage in content creation for blogs and social media platforms to
              amplify our sustainability narrative
            </li>
          </ul>

          <br />
          <h2 className="subHeading">Internship Details:</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>Duration: 3-6 Months</li>
            <li>Work Schedule: Flexible</li>
            <li>Expected work time: 40 hours per week</li>
          </ul>
          <br />
          <h2 className="subHeading">What we offer</h2>
          <br />

          <ul className="list-disc list-inside m-2">
            <li>A chance to work on a startup from the ground up</li>
            <li>
              Challenging problems to solve in areas related to Operations,
              Product Management, Operations, and Strategy
            </li>
            <li>
              Projects will involve working on cutting-edge products and
              services, providing hands-on experience in a collaborative and
              innovative environment, that goes beyond the conventional
              internship.
            </li>
            <li>Work experience certificate at the end of the internship</li>
            <li>
              Select few interns will be provided with Equity awards and a
              possible offer to convert to full-time
            </li>
          </ul>
          <br />
        </>
      );
    }
  };

  return (
    <>
      <div className="pagePadding container-sub">
        <div className="back-icon-display">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="pointer-class left-arrow"
            onClick={() => nav(ROUTES.CAREERS, { replace: true })}
          />
          <div>
            <h2 className="subHeading">{state.role}</h2>
          </div>
        </div>
        <br />
        <div className="footer-images">
          <h3 className="sHeading">Position:&nbsp; </h3>
          <h3 className="sHeading"> {state.title} &nbsp; </h3>
        </div>
        <br />
        <div className="footer-images">
          <h3 className="sHeading">Location:&nbsp; </h3>{" "}
          <h3 className="sHeading">Remote</h3>
        </div>
        <div className="spacer"></div>
        <h2 className="subHeading">Company Overview:</h2>
        <br />
        <p>
          At Ecoyaan, we are more than just a platform. Our vision is to build a
          community of eco-conscious people who share our passion for a more
          sustainable world.
        </p>
        <br />
        <h3 className="sHeading">Our Mission: </h3>
        <p>
          Transform the way people shop by providing access to authentic
          high-quality sustainable products
        </p>
        <br />
        <h3 className="sHeading">Our Values: </h3>
        <ul className="list-decimal list-inside m-2">
          <li>
            Trust: We strive to be transparent and honest in everything we do,
            from the content that we share with our users to sourcing our
            products in the future
          </li>
          <li>
            Authenticity: We are sincere in our goal to spread sustainability
            and environmental awareness. We know it’s hard to make lifestyle
            changes, but a community of like-minded people can inspire each
            other along the way.
          </li>
          <li>
            Impact: We measure our success by the impact we have on the planet
            and our community. We aim to empower our sellers and customers to
            make responsible choices that benefit their well-being and the
            well-being of others.{" "}
          </li>
          <li>
            Fun & Engaging: We recognize that making the move towards a
            sustainable lifestyle and the constant news around climate change
            can be stressful. We strive to make the journey enjoyable for our
            community.
          </li>
        </ul>

        <br />
        <CareerDesc />

        <button
          className=" bg-green-600 px-3 py-2 rounded-lg text-white"
          onClick={() =>
            nav(ROUTES.APPLY, {
              state: state,
            })
          }
        >
          Apply Now
        </button>
      </div>

      <div className="spacer"></div>
    </>
  );
};

export default CareerDescription;

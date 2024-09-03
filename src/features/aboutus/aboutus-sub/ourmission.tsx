export default function OurMission() {
  return (
    <>
      <section className="py-4 abouts-home hidden md:block padding-1rem">
        <div className="home-container xl:p-12">
          <div className="home-container-image">
            <h2 className="subHeading"> About Ecoyaan</h2>
            <br />

            <p>
              At Ecoyaan, we are more than just a platform. Our goal is to build
              a community of eco-conscious people who share a common vision and
              passion for a more sustainable world.
            </p>
            <p>
              <br />
              We recognize that sustainability is a journey (as the Sanskrit
              word “yaan” suggests). To keep you motivated on this journey, on
              our platform and our social media pages, you can find:
            </p>
            <ul className="list-disc list-inside m-2">
              <li>
                Tips and tricks to adopt a more eco-friendly and low-waste
                lifestyle
              </li>
              <li>
                Videos, posts, and quizzes on climate change and sustainability
              </li>
              <li>
                Events and pledges that invite you to adopt a more sustainable
                lifestyle
              </li>
            </ul>
          </div>
          <div className="home-container-image img-margin">
            <img
              src="/images/about-us-sustainable-lifestyle-partner.png"
              className="h-[320px] w-full img-fit img-fit-height img-hover"
              alt="about-us-sustainable-lifestyle-partner"
            />
          </div>
        </div>
      </section>

      <section className="py-4 sectionMargin section-margin abouts-home  hidden max-[480px]:block padding-1rem">
        <h2 className="subHeading"> About Ecoyaan </h2>
        <p>
          <br />
          At Ecoyaan, we are more than just a platform. Our goal is to build a
          community of eco-conscious people who share a common vision and
          passion for a more sustainable world.
        </p>
        <br />
        <div className="about-us-container">
          <img
            src="/images/about-us-sustainable-lifestyle-partner.png"
            className="h-[320px] w-full img-cover img-fit-height"
            alt="about-us-sustainable-lifestyle-partner"
          />
        </div>
        <p>
          <br />
          We recognize that sustainability is a journey (as the Sanskrit word
          “yaan” suggests). To keep you motivated on this journey, on our
          platform and our social media pages, you can find:
        </p>
        <ul className="list-disc list-inside m-2">
          <li>
            Tips and tricks to adopt a more eco-friendly and low-waste lifestyle
          </li>
          <li>
            Videos, posts, and quizzes on climate change and sustainability
          </li>
          <li>
            Events and pledges that invite you to adopt a more sustainable
            lifestyle
          </li>
        </ul>

        <br />
        <p>
          Our mission does not end there. Soon, we will be connecting you with
          eco-friendly and sustainable products that are carefully selected
          based on their environmental and social benefits
        </p>
        <br />
        <div className="about-us-container">
          <video
            width="320"
            height="240"
            autoPlay
            muted
            className="h-[320px] w-full  img-fit-height"
          >
            <source src="/images/ProductCuration.mp4" type="video/mp4" />
          </video>
        </div>
        <p>
          We invite you to join us and discover the amazing products and stories
          that we have to offer. Together, we can make the journey towards
          sustainability easier.
        </p>
      </section>
    </>
  );
}

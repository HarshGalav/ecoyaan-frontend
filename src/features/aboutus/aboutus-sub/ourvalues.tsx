export default function OurValues() {
  return (
    <>
      <section className="py-4 abouts-home padding-1rem">
        <div className=" xl:p-12">
          <h2 className="subHeading">Our Values</h2>
          <div className="display-values">
            <div className="width-values flex flex-col md:flex-row">
              <div className="image-container order-2 md:order-1 mb-4 md:mb-0 md:mr-4">
                <img
                  src="/images/Trust.png"
                  className="h-[100px] !important img-fit img-fit-height img-hover"
                  alt="Trust"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-semibold">Trust</h3>
                <p>
                  We value the trust of our community. We strive to be
                  transparent and honest in everything we do, from the content
                  we share today to sourcing our products in the future.
                </p>
                <br />
              </div>
            </div>
            <div className="width-values flex flex-col md:flex-row">
              <div className="image-container order-2 md:order-1 mb-4 md:mb-0 md:mr-4">
                <img
                  src="/images/Authenticity.png"
                  className="h-[100px] img-fit img-fit-height img-hover"
                  alt="Authenticity"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-semibold">Authenticity</h3>
                <p>
                  We are genuine in our mission to promote sustainability and
                  environmental awareness. An authentic community of
                  eco-conscious people can inspire each other on the journey
                  towards sustainability. <br />
                </p>
              </div>
            </div>
          </div>
          <div className="display-values">
            <div className="width-values flex flex-col md:flex-row">
              <div className="image-container order-2 md:order-1 mb-4 md:mb-0 md:mr-4">
                <img
                  src="/images/Impact.png"
                  className="h-[100px] img-fit img-fit-height img-hover"
                  alt="Impact"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-semibold">Impact</h3>
                <p>
                  We measure our success by our impact on the planet and our
                  community. We aim to empower our sellers and customers to make
                  responsible choices that benefit their well-being and the
                  well-being of others. <br />
                </p>
              </div>
            </div>
            <div className="width-values flex flex-col md:flex-row">
              <div className="image-container order-2 md:order-1 mb-4 md:mb-0 md:mr-4">
                <img
                  src="/images/FunAndEngaging.png"
                  className="h-[100px] img-fit img-fit-height img-hover"
                  alt="FunAndEngaging"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-semibold">Fun & Engaging</h3>
                <p>
                  Moving towards a sustainable lifestyle and the constant news
                  around climate change can be stressful. We aim to inject fun
                  and creativity into everything we do, from designing our
                  products to providing services.
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-4">
        <p>
          <ol className="list-decimal list-inside m-2">
            <li>Trust</li>
            <ul className="list-disc list-inside m-2">
              <li>
                We value the trust of our community. We strive to be transparent
                and honest in everything we do, from the content that we share
                today to sourcing our products in the future. We welcome
                feedback and suggestions to improve our platform.
              </li>
            </ul>
          </ol>
          <img src="/images/Trust.png" className="h-[320px] w-full img-fit img-fit-height" />
        </p>

        <p>
          <ol className="list-decimal list-inside m-2" start={2}>
            <li>Authenticity</li>
            <ul className="list-disc list-inside m-2">
              <li>
                We are authentic and genuine in our mission to promote
                sustainability and environmental awareness. We will be the first
                to admit that making lifestyle changes is not easy, but we
                believe that a community of like-minded people can inspire each
                other along the way.{" "}
              </li>
            </ul>
          </ol>
          <img
            src="/images/Authenticity.png"
            className="h-[320px] w-full img-fit img-fit-height"
          />
        </p>

        <p>
          <ol className="list-decimal list-inside m-2" start={3}>
            <li>Impact</li>
            <ul className="list-disc list-inside m-2">
              <li>
                We measure our success by the impact we have on the planet and
                our community. We aim to empower our sellers and customers to
                make informed and responsible choices that benefit their
                well-being and the well-being of others.{" "}
              </li>
            </ul>
          </ol>
          <img src="/images/Impact.png" className="h-[320px] w-full img-fit img-fit-height" />
        </p>

        <p>
          <ol className="list-decimal list-inside m-2" start={4}>
            <li>Fun & Engaging</li>
            <ul className="list-disc list-inside m-2">
              <li>
                We recognize that making the move towards a sustainable
                lifestyle and the constant news around climate change can be
                stressful. We strive to make the journey enjoyable for our
                community. We aim to inject creativity into everything we do,
                from designing and marketing our products to providing our
                services
              </li>
            </ul>
          </ol>
          <img
            src="/images/FunAndEngaging.png"
            className="h-[320px] w-full img-fit img-fit-height"
          />
        </p>
      </section> */}
      {/* <section className="tiles-container">
        <div className="tile">
          <h2 className="title-alignment">Title 1</h2>
          <hr />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a gallery of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="tile">
          <h2 className="title-alignment">Title 2</h2>
          <hr />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a gallery of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="tile">
          <h2 className="title-alignment">Title 3</h2>
          <hr />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a gallery of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="tile">
          <h2 className="title-alignment">Title 4</h2>
          <hr />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a gallery of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="tile">
          <h2 className="title-alignment">Title 4</h2>
          <hr />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a gallery of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </section> */}
    </>
  );
}

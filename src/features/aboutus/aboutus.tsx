import OurTeam from "./aboutus-sub/ourteam";
import OurMission from "./aboutus-sub/ourmission";
import OurValues from "./aboutus-sub/ourvalues";
import { useEffect, useMemo, useRef, useState } from "react";
import OurTeamMembers from "./aboutus-sub/ourteam-members";
import { Helmet } from "react-helmet-async";

interface ICustomLinkProps {
  to: string;
  name: string;
  isActive: boolean;
}

function useIsInViewport(ref: any) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}

export default function AboutUs() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  return (
    <>
      <Helmet>
        <title>About | Ecoyaan</title>
        <meta name="description" content="About Ecoyaan" />
      </Helmet>
      <div className="flex flex-row justify-center md:justify-start items-start gap-8">
        {/* <div className="pagePadding"> */}
        <div className="flex flex-row justify-center md:justify-start items-start gap-8">
          <div className="w-full">
            <div id="mission" ref={ref3}>
              <OurMission />
            </div>
            <div id="values" ref={ref4}>
              <OurValues />
            </div>
            {/* <div id="story" ref={ref1}>
            <OurStory />
          </div> */}
            <div id="team" ref={ref2}>
              <OurTeam />
            </div>
            <div id="team-members" ref={ref5}>
              <OurTeamMembers />
            </div>
            {/* <div id="pressMedia" ref={ref5}>
            <PressAndMedia />
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

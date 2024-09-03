import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faYoutube,
  faTwitter,
  faSnapchat,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SubscribePart from "../SubscribePart/SubscribePart";
import footer from "../../../../config/Footer.json";
import { getRouteValue } from "../../../../utils/Routes";

type Props = {
  handleScrollToTop?: () => void;
};

type SocialIcons = {
  [key: string]: IconDefinition;
};

const socialIcons: SocialIcons = {
  faInstagram,
  faLinkedin,
  faFacebook,
  faYoutube,
  faTwitter,
  faSnapchat,
};

function Footer({ handleScrollToTop }: Props) {
  return (
    <div className="w-full xs:py-2  xl:py-7 md:pb-9 bg-gray-200 text-black">
      <div className="flex xl:px-3 xs:px-7 sm:px-1 w-full xs:flex-col xl:flex-row justify-center gap-y-5 sm:items-center xl:items-start mt-1 md:py-8 lg:gap-x-2 xl:gap-x-8 2xl:gap-x-16">

        <div className="xl:px-1 2xl:pl-6 lg:w-2/3   2xl:w-[24rem] md:w-3/4 sm:w-4/5  xl:w-[17rem] flex flex-col gap-y-4">
          <div className="xs:hidden xl:flex flex-col gap-y-4">
          <h1 className="xs:text-sm md:text-lg font-semibold">{footer.company.name}</h1>
          <p className="xs:text-sm md:text-xs !leading-7 text-[#454545]">
            {footer.company.description}
          </p>
          </div>
          <div className="xs:flex xl:hidden xs:pt-4 md:pt-4"><SubscribePart /> </div> 
          <div className="xs:hidden xl:flex flex-col md:w-[26rem] lg:w-[20rem] xl:w-[20rem] 2xl:w-[26rem] xs:ml-[-22px] md:ml-[-30px] md:mt-1 xs:pb-1">
            <img className=" xs:w-96 md:w-[28rem] " src="/images/startup-logo.png" />
            <p className=" md:text-[0.6rem] xl:text-[0.5rem] 2xl:text-[0.6rem] sm:w-[32rem] lg:w-[20rem] xl:w-[22rem] 2xl:w-[26rem] xs:px-6 md:pl-9 xl:pl-[1.3rem] 2xl:pl-[1.9rem]">Ecoyaan is recognised as a startup by DPIIT under the Startup India Program</p>
          </div>
        </div>
        <div className="flex 2xl:gap-x-1 xl:gap-x-5  md:w-3/4 lg:w-2/3   2xl:w-4/12 xl:w-[37%] sm:w-4/5 sm:flex-row justify-between xs:flex-col gap-y-5">
          <div className="flex flex-col xs:gap-y-4 md:gap-y-7">
            <h1 className="font-semibold xs:text-sm md:text-base">Quick Links</h1>
            <div className="grid grid-cols-1 xs:gap-y-3 md:gap-y-5  xs:text-sm md:text-xs text-[#454545]">
              {footer.links.quickLinks.map((link, index) =>
                link.name === "Challenges/ Pledges" ? (
                     <><Link to={getRouteValue(link.path)} className="text-500">
                     Challenges and <br/>
                     Pledges
                    </Link></>
                ) : (
                  <><Link to={getRouteValue(link.path)} className="text-500">
                  {link.name}
                </Link></>
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col xs:gap-y-4 md:gap-y-7">
            <h1 className="font-semibold xs:text-sm md:text-base">Legal</h1>
            <div className="grid grid-cols-1 xs:gap-y-3 md:gap-y-5 xs:text-sm md:text-xs text-[#454545]">
              {footer.links.legal.map((link, index) =>
                link.name === "Shipping and Return Policy" ? (
                  <><Link to={getRouteValue(link.path)} className="text-500">
                     Shipping and <br/>
                     Return Policy
                    </Link></>
                ) : (
                  <><Link to={getRouteValue(link.path)} className="text-500">
                      {link.name}
                    </Link></>
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col xs:gap-y-4 md:gap-y-7">
            <h1 className="font-semibold xs:text-sm md:text-base">Connect Us</h1>
            <div className="grid grid-cols-1 xs:gap-y-5 md:gap-y-5 xs:text-sm md:text-xs text-[#454545]">
              <div className="flex gap-x-2">
                <CallIcon sx={{ color: "#454545" }} />
                <p>{footer.contact.phone}</p>
              </div>
              <div className="flex gap-x-2">
                <MailOutlineIcon sx={{ color: "#454545" }} />
                <p>{footer.contact.email}</p>
              </div>
              <div className="flex gap-x-2">
                <LocationOnIcon sx={{ color: "#454545" }} />
                <p>
                  {footer.contact.address.AddressLine1} <br />
                  {footer.contact.address.AddressLine2}<br />
                  {footer.contact.address.AddressLine3}<br />
                  {footer.contact.address.AddressLine4}<br />
                  {footer.contact.address.AddressLine5}<br />
                  {footer.contact.address.AddressLine6}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col 2xl:w-1/4 xl:w-[30%] lg:w-2/3  md:w-3/4  sm:w-4/5">
         <div className="xs: hidden xl:flex"><SubscribePart /> </div> 
         <div className="xl:hidden xs:flex flex-col pb-8">
          <h1 className="xs:text-sm md:text-lg font-semibold">{footer.company.name}</h1>
          <p className="xs:text-sm md:text-xs !leading-7 text-[#454545]">
            {footer.company.description}
          </p>
          </div>
          <div className="flex flex-col gap-y-4 xl:px-2">
            <h1 className="xs:text-sm md:text-base font-bold">Follow Us</h1>
            <div className="flex gap-x-3 ">
              {/* {footer.socialMedia.map((social, index) => (
                <FontAwesomeIcon
                  key={index}
                  className="size-6"
                  icon={socialIcons[social.icon]}
                />
              ))}
               */}
                {footer.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon className="size-6" icon={socialIcons[social.icon]} />
                </a>
              ))}
            </div>
          </div>
          <div className="xl:hidden  xs:mt-4 md:w-[32rem] xs:ml-[-22px] md:ml-[-2rem] md:mt-3 xs:pb-1">
            <img className=" xs:w-96 md:w-[32rem]" src="/images/startup-logo.png" />
            <p className="xs:text-[8px] md:text-xs sm:w-[32rem] xs:px-6 md:px-9">Ecoyaan is recognised as a startup by DPIIT under the Startup India Program</p>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Footer;

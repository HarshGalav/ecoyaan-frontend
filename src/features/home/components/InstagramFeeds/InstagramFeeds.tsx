import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PushPinIcon from "@mui/icons-material/PushPin";
import InstagramDetail from "../../../../config/InstagramPart.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function InstagramFeeds() {
  return (
    <div className="flex  flex-col xs:gap-y-5 md:gap-y-7 relative">
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-0 md:text-2xl xs:text-base  font-semibold">
          {InstagramDetail.sectionTitle}
        </h1>
        <div className="flex gap-x-3 justify-start lg:px-9 items-center">
        <h3 className="xs:text-sm md:text-base">Follow us on:</h3>
        <a
          href="https://www.instagram.com/ecoyaan/"
          target="_blank"
          className="text-anchor flex items-center xs:text-sm md:text-base gap-x-2"
        >
          <FontAwesomeIcon className="xs:size-4 md:size-5 xl:size-6" icon={faInstagram} /> @ecoyaan
        </a>
      </div>
      </div>

      <div className="flex xl:flex-col xs:flex-row  items-center w-full gap-x-4 gap-y-4 xs:px-1 sm:px-2 ">
       
          <div  className="flex flex-row lg:gap-x-3 xs:gap-x-4 gap-y-5 pb-8 xs:overflow-x-scroll xl:overscroll-none place-self-stretch">
           
           {InstagramDetail.Feeds.map((feed, index) => (
                <div key={index} className="relative border flex flex-col gap-y-3 xs:min-w-64 md:min-w-64 border-gray-200 shadow-xl p-3 rounded-2xl">
                <img
                  className="relative md:w-[309px] xl:h-[210px] lg:size-64 md:full xs:min-w-[14.4rem] xs:size-52 md:size-56 rounded-xl object-cover"
                  src={feed.imageUrl}
                 
                />
                
                <div className="flex flex-row px-2 gap-x-8 items-center ">
                  <FavoriteBorderIcon sx={{ fontSize : {
                    xs: "1.3rem",
                    sm:"1.5rem"
                  }}} />
                  <p className="xs:text-sm md:text-base">Check on Ecoyaan</p>
                </div>
                          
              </div>
           ))}
          </div>
        
      </div>

     
    </div>
  );
}

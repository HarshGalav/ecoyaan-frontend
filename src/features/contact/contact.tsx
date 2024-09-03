import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ROUTES } from '../../utils/Routes';

const Contact = () => {
    const navigate = useNavigate();

    const handleBackToProfile = () => {
        navigate(ROUTES.PROFILE); // Corrected usage of navigate function
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-5xl text-center">
                <div className="flex items-center justify-start mb-4"> {/* Added mb-4 for gap */}
                    <ArrowLeftIcon
                        className="w-6 h-6 text-gray-600 cursor-pointer"
                        onClick={handleBackToProfile}
                    />
                    <h1 className="text-3xl font-bold ml-4">Contact us</h1> {/* Added ml-4 for margin */}
                </div>
                <p className="text-gray-600 mb-8 text-left">
                    We’re here to assist you with any inquiries or support you may need. Reach out to us via phone, email, or visit us at our location. We look forward to connecting with you.
                </p>
                <div className="text-left mb-8 ">
                    <div className="flex items-center mb-4">
                        <PhoneIcon className="text-gray-600 mr-3" />
                        <span className="text-gray-800">+91-9980490777</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <MailIcon className="text-gray-600 mr-3" />
                        <span className="text-gray-800">support@ecoyaan.com</span>
                    </div>

                    <div className="flex items-start">
                        <LocationOnIcon className="text-gray-600 mr-3" />
                        <div className="text-gray-800">
                            <p>1-N-12T-781/1</p>
                            <p>Sri Krishna Vilasa</p>
                            <p>Ashoknagar(MR), Mangalore</p>
                            <p>Dakshina Kannada - 575006</p>
                            <p>Karnataka, India</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-6">
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faGoogle} size="lg" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;

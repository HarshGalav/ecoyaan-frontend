import React from 'react'
import Carousel from './payoptions';

function Paycarousel() {
    const imageUrls = [
        'https://static-00.iconduck.com/assets.00/visa-icon-2048x1313-o6hi8q5l.png',
        'https://uxdt.nic.in/wp-content/uploads/2020/06/BHIM_Preview.png?x38773',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQ73kX5vOtfxOM_j8e1NhHciLXFFQwBQrLg&s',
        'https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png'
    ];
  return (
    <div>
        <Carousel images={imageUrls} />
    </div>

  )
}

export default Paycarousel
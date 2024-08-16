import Logo from './images/online_consult.png';
import Doctor from './images/Ai.png';
import Blog from './images/ReadBlog.jpg';

import { useState } from "react";

function Image_slider()
{
    const images=[Logo,Doctor,Blog]
    const text=["Online Consultation With Qualified Doctors","Predict Your Disease With The Help Of AI","Read Blogs Related To Diet Plans And Health"]
    let[count,setCount]=useState(0)

        setTimeout(() => {
            setCount(count+1)
        }, 2000);
    
        if(count>=images.length || count>=text.length)
        {
          count=0
        }

        return(
          <>   
          <div className='slider_images flex animate-pulse'>
            <img src={images[count]} alt="" />
            <p className='texts ml-10 text-center italic text-red-400'>{text[count]} </p>
          </div>

        </>
    )
}

export default Image_slider;

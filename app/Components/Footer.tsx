import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#102750] via-[#455880] to-[#8a9bc5]  h-[500px]">

      {/* TOP CONTENT (images in row) */}
      <div className="flex justify-center items-center gap-7 ">
        
        <div className="flex flex-col items-start  justify-center pt-44">
          <h1 className="text-[17px] text-white mb-2 text-center w-[110px]">
            Stay Secure & Compliant
          </h1>
          <img src="/img/footer1.png" className="w-[130px]" />
        </div>

        <img src="/img/footer2.png" className="w-[230px] h-[230px] mt-22" />
        <img src="/img/footer3.png" className="w-[230px] h-[230px] mt-22" />
      
      </div>

     
 {/* BOTTOM GRADIENT STRIP */}
      <div className="w-full h-[80px] bg-gradient-to-r
                      from-[#162542]
                      via-[#2b3b55]
                      via-[#444b5e]
                      via-[#585765]
                      to-[#2c364d] mt-10 flex justify-center items-center flex-col gap-4 ">
                        <h1 className="text-lg font-semibold  ">Ready to Secure Your Email Communication?</h1>
                        <div className="flex gap-4 ">
                           <button
  className="px-12 py-1 rounded-md cursor-pointer
             bg-gradient-to-r from-[#eb722e] via-[#fa973b] to-[#f59237]
             hover:from-[#ffcd03] hover:via-[#ffb703] hover:to-[#ffa200]
             transition-all duration-300">
  Start
</button>

<button className="border px-12 py-1 rounded-sm cursor-pointer hover:bg-[#2f384e]">Contact Us</button>

                        </div>
                       
      </div>
      <div
       className=" mt-4  
       bg-gradient-to-r from-[#102750] via-[#455880] to-[#8a9bc5] flex justify-center items-center ">
        <p className="cursor-pointer hover:text-[green] mr-4">Privacy Policy | </p> 
        <p className="cursor-pointer hover:text-[green] mr-4"> Tearms of Service | </p>
        <p className="cursor-pointer hover:text-[green]"> Cookies </p></div>
    </div>
  ); 
};

export default Footer;

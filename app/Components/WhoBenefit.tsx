import React from "react";
import Link from "next/link";

const features = [
  {
    image: "/img/Hr.png",
    heading: "HR & Manager",
    para: "Protect sensitive information",
    link: "/hr/hrlogin",
  },
  {
    image: "/img/it.png",
    heading: "IT & Admin",
    para: "Ensure email compliance",
     link: "/admin/loginadmin",
  },
  {
    image: "/img/remotepng.png",
    heading: "Remote Workforce",
    para: "Track & review activity",
  },
  {
    image: "/img/corporate.png",
    heading: "Corporate Compliance",
    para: "Ensure proper compliance",
  },
];

const WhoBenefit = () => {
  return (
    <div className="flex flex-col items-center py-12 bg-[#eef5fc]">
      {/* Section Heading */}
      <h1 className="font-bold text-2xl text-[#1e426d] mb-8 text-center">
        Who Benefits from Our System?
      </h1>

      {/* Feature Cards */}
     <div className="flex flex-wrap justify-center gap-8">
        {features.map((item, index) => {
          const Card = (
            <div
              className={`flex flex-col justify-start items-start w-[200px] h-[230px] gap-3 p-6 bg-white rounded-2xl shadow-md
                transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                ${item.link ? "cursor-pointer" : "cursor-default"}`}
            >
              <img
                src={item.image}
                alt={item.heading}
                className="w-20 h-20 mb-2"
              />
              <h3 className="text-lg font-semibold text-[#1e426d]">
                {item.heading}
              </h3>
              <p className="text-gray-500 text-sm">{item.para}</p>
            </div>
          );

          return item.link ? (
            <Link key={index} href={item.link} className="block">
              {Card}
            </Link>
          ) : (
            <div key={index}>{Card}</div>
          );
        })}
      </div>
    </div>
  );
};
export default WhoBenefit;

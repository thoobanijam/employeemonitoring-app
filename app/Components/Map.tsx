import React from "react";
import Link from "next/link";

const Map = () => {
  const Tracking = [
    {
      image: "/img/tracking.png",
      heading: "Employee Tracking",
      para: "Monitor activities & location",
      link: "/employee/employee-login",
    },
    {
      image: "/img/website.png",
      heading: "Screenshots & Website",
      para: "Track apps and Websites",
    },
    {
      image: "/img/attenance.png",
      heading: "Attendance Management",
      para: "Check-in & Attendance Reports",
    },
    {
      image: "/img/taskproject.png",
      heading: "Task & Project Management",
      para: "Assign & Track Tasks",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-start gap-8 mt-8 mb-8">
      {Tracking.map((item, index) => {
        const Card = (
          <div
            className="flex justify-center items-center w-[350px] gap-4 p-4 bg-white rounded-2xl cursor-pointer shadow-md
              transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.heading}
              className="w-15 h-15"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                {item.heading}
              </h3>
              <p className="text-gray-600">{item.para}</p>
            </div>
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
  );
};

export default Map;

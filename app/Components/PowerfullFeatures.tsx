import React from "react";

const features = [
  {
    image: "/img/email.png",
    heading: "Email Tracking",
    para: "Monitor inbound & outbound emails",
  },
  {
    image: "/img/contentfilter.png",
    heading: "Content Filtering",
    para: "Detect Sensitive Keywords & Attachments",
  },
  {
    image: "/img/alert.png",
    heading: "Real-Time Alerts",
    para: "Insert alert in suspicious activity",
  },
  {
    image: "/img/reports.png",
    heading: "Detailed Reports",
    para: "In-depth analytics & reporting",
  },
];

const PowerfullFeatures = () => {
  return (
    <div className="flex flex-col items-center py-12 bg-[#eef5fc]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-lg mb-12">
        <h1 className="font-bold text-2xl text-[#1e426d] mb-2">Powerful Features</h1>
        <p className="text-[#a4abb6] text-base">
          Comprehensive tools to monitor and manage emails
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((item, index) => (
          <div
  key={index}
  className="flex flex-col justify-start items-start w-[200px] h-[230px] gap-3 p-6 bg-white rounded-2xl cursor-pointer shadow-md
             transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
>
  <img src={item.image} alt={item.heading} className="w-20 h-20 mb-2" />
  <h3 className="text-lg font-semibold text-[#1e426d] text-left">{item.heading}</h3>
  <p className="text-gray-500 text-left text-sm">{item.para}</p>
</div>

        ))}
      </div>
    </div>
  );
};

export default PowerfullFeatures;

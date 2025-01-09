import React from "react";

const MedicalSessions = () => {
  const sessions = [
    {
      type: "Shockwave session",
      patientName: "Patient's Name",
      doctorName: "Doctor's Name",
      time: "12:00PM",
      cost: "400",
    },
    {
      type: "Shockwave session",
      patientName: "Patient's Name",
      doctorName: "Doctor's Name",
      time: "12:00PM",
      cost: "400",
    },
    {
      type: "Shockwave session",
      patientName: "Patient's Name",
      doctorName: "Doctor's Name",
      time: "12:00PM",
      cost: "400",
    },
    {
      type: "Shockwave session",
      patientName: "Patient's Name",
      doctorName: "Doctor's Name",
      time: "12:00PM",
      cost: "400",
    },
    {
      type: "Shockwave session",
      patientName: "Patient's Name",
      doctorName: "Doctor's Name",
      time: "12:00PM",
      cost: "400",
    },
    {
      type: "Shockwave session",
      patientName: "Patient's Name",
      doctorName: "Doctor's Name",
      time: "12:00PM",
      cost: "400",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6   h-full ">
      <h1 className="text-3xl font-bold mb-12 text-bold text-black">
        {" "}
        Today`s Sessions
      </h1>
      <div className="shadow-lg">
        {sessions.map((session, index) => (
          <div
            key={index}
            className={`bg-[#BFE7EC] text-black ${
              index == sessions.length - 1 && "rounded-b-xl"
            }
            ${index == 0 && "rounded-t-xl"}
           ${index != 0 && "border-t-2 border-white"}
           p-2
            `}>
            <div className="card-body">
              <div className="flex justify-between items-start max-sm:flex max-sm:flex-col max-sm:m-auto">
                <div className="flex flex-col gap-2">
                  <h2 className="card-title text-xl">{session.type}</h2>
                  <p className="">Performed to {session.patientName}</p>
                  <p className="">by {session.doctorName}</p>
                </div>
                <div className="text-right">
                  <p className=" mb-2 text-black">{session.time}</p>
                  <div className="flex items-center justify-end gap-4">
                    <span className="font-medium">{session.cost} LE</span>
                    <button className="p-2 rounded-md  bg-[#287F89] text-white shadow-md">
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalSessions;

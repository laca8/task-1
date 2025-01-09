import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../redux/slicer/doctorSlicer";
import {
  getBranchesForDay,
  isTimeInRange,
  generateTimeSlots,
} from "../../utils/reservation";
const ReservationForm = () => {
  const dispatch = useDispatch();
  const [slots, setSlots] = useState([]);
  const [names, setNames] = useState([]);
  const [branchesDate, setBranchesDate] = useState([]);
  const [branchChoose, setBranchChoose] = useState([]);
  const [all, setAll] = useState([]);
  const [fullData, setFullData] = useState([]);
  const doctorSlice = useSelector((state) => state.doctorSlice);
  const { doctors } = doctorSlice;
  const sessions = [
    {
      name: "Recovery Session",
      cost: 400,
    },
    {
      name: "Physiotherapy Session",
      cost: 700,
    },
    {
      name: "Personal Trainer  Session",
      cost: 1000,
    },
  ];
  const [formData, setFormData] = useState({
    sessionType: "",
    date: "",
    branch: "",
    time: "",
    doctor: "",
    cost: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.cost = sessions.filter(
      (x) => x.name == formData.sessionType
    )[0].cost;
    console.log("Form submitted:", formData);
    const objectExistsInArray = all.find(
      (obj) =>
        obj.date == formData.date &&
        obj.time == formData.time &&
        obj.doctor == formData.doctor
    );
    console.log(objectExistsInArray);

    if (!objectExistsInArray) {
      setAll([...all, formData]);
      console.log(all);
      setFormData({
        doctor: "",
        date: "",
        time: "",
        branch: "",
        sessionType: "",
      });
    } else {
      alert("the doctor not available for this time !");
      console.log(all);
    }
  };
  const handleDateChange = (e) => {
    setFormData({
      date: e.target.value,
      sessionType: formData.sessionType,
      branch: "",
      time: "",
      doctor: "",
    });
  };
  const handleChange = (e) => {
    // console.log(
    //   new Date(formData?.date).toLocaleDateString("en-US", { weekday: "short" })
    // );

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //fetch data
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch, formData?.date, formData?.branch]);

  useEffect(() => {
    //filter by date Sun,Fri
    setBranchesDate(
      getBranchesForDay(
        doctors ? doctors?.data : [],
        new Date(formData?.date).toLocaleDateString("en-US", {
          weekday: "short",
        })
      )
    );

    const calculateTimeSlots = () => {
      const allSlots = branchChoose?.flatMap((pair) =>
        generateTimeSlots(pair.start, pair.end)
      );
      const uniqueSlots = [...new Set(allSlots)];
      setSlots(uniqueSlots.sort());
    };
    doctors?.data?.map((x) =>
      x.branches.filter((y) => {
        if (
          y.branch == formData.branch &&
          y.days.includes(
            new Date(formData?.date).toLocaleDateString("en-US", {
              weekday: "short",
            })
          )
        ) {
          console.log(y.branch == formData.branch, y.branch, formData.branch);
          setBranchChoose([]);
          setFullData([]);
          branchChoose?.push(y);
          fullData?.push(x);
          console.log(fullData);

          calculateTimeSlots();
          console.log(branchChoose);
        }
      })
    );
  }, [formData?.branch, formData?.date, doctors?.data]);

  useEffect(() => {
    const findDoctors = (doctorSchedules, branch, time) => {
      const doctors = doctorSchedules
        .filter(
          (schedule) =>
            schedule.branch.toLowerCase() === branch.toLowerCase() &&
            isTimeInRange(time, schedule.time)
        )
        .map((schedule) => schedule.doctor);
      console.log(doctors);

      setNames(doctors);
    };
    findDoctors(branchesDate, formData?.branch, formData?.time);
  }, [formData?.branch, formData?.time, formData?.date, fullData]);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 max-md:grid-cols-1  gap-8">
        <div className=" rounded-lg ">
          <h2 className="card-title text-black justify-start text-2xl mb-6">
            Reservation
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-2 text-black flex flex-col gap-2  h-full">
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Session Type
                </span>
              </label>
              <select
                name="sessionType"
                className="select select-bordered bg-white shadow-sm w-1/2"
                value={formData.sessionType}
                onChange={handleChange}>
                <option value="" selected disabled>
                  Select
                </option>
                {sessions?.map((x, i) => (
                  <option value={x.name} key={i}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control flex flex-row flex-wrap gap-6 mb-2">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Select date
                </span>
              </label>
              <div className="flex mb-2">
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered bg-white shadow-sm text-black "
                    value={formData.date}
                    onChange={handleDateChange}
                  />
                  {/* <Calendar className="absolute right-3 top-3 h-5 w-5 " /> */}
                </div>
                <label className="label">
                  {branchesDate.length == 0 && (
                    <span className="label-text-alt text-black ">
                      No Sessions available on that date
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Branch
                </span>
              </label>
              <select
                name="branch"
                className={`p-3 border-2 rounded-lg bg-white shadow-sm w-1/2  `}
                value={formData.branch}
                disabled={formData.date == ""}
                onChange={handleChange}>
                <option value="" selected disabled>
                  Select
                </option>

                {branchesDate
                  .filter(
                    (obj, index, self) =>
                      index ===
                      self.findIndex((t) => t["branch"] === obj["branch"])
                  )
                  .map((b, i) => {
                    return <option key={i}>{b.branch}</option>;
                  })}
              </select>
            </div>

            <div className="form-control flex flex-row flex-wrap gap-12 ">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Time
                </span>
              </label>
              <select
                name="time"
                className="p-3 border-2 rounded-lg  bg-white shadow-sm w-1/3"
                value={formData.time}
                disabled={formData.branch == ""}
                onChange={handleChange}>
                <option value="" disabled>
                  00:00
                </option>
                {slots.map((x, i) => {
                  if (
                    all.some(
                      (item) =>
                        item.time == x &&
                        item.date == formData.date &&
                        item.doctor == formData.doctor
                    )
                  ) {
                    return (
                      <option disabled key={i}>
                        {x}
                      </option>
                    );
                  } else {
                    return <option key={i}>{x}</option>;
                  }
                })}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black font-semibold">
                  Doctor
                </span>
              </label>
              <select
                name="doctor"
                className="p-3 border-2 rounded-lg bg-white shadow-sm w-1/2"
                value={formData.doctor}
                disabled={formData.time == ""}
                onChange={handleChange}>
                <option value="" selected disabled>
                  Select
                </option>
                {names?.map((x, i) => {
                  if (
                    all.some(
                      (item) =>
                        item.doctor == x &&
                        item.date == formData.date &&
                        item.time == formData.time
                    )
                  ) {
                    return (
                      <option disabled key={i}>
                        {x}
                      </option>
                    );
                  } else {
                    return <option key={i}>{x}</option>;
                  }
                })}
              </select>
            </div>

            <button
              type="submit"
              disabled={
                formData.date == "" ||
                formData.time == "" ||
                formData.doctor == "" ||
                formData.sessionType == "" ||
                formData.branch == ""
              }
              className="p-3 border-2 rounded-lg w-1/2 bg-teal-600  text-white ">
              Submit Reservation
            </button>
          </form>
        </div>

        <div className="max-md:hidden md:block">
          <div className="flex justify-between items-center mb-6">
            <span className="text-black font-semibold">
              {sessions?.filter((x) => x.name == formData.sessionType)[0]?.cost}
              LE
            </span>
          </div>
          <div className="bg-white rounded-lg p-2 h-full">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Physical Therapy Session"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;

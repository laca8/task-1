import { useState } from "react";
import { Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addDocotr } from "../../redux/slicer/doctorSlicer";
import { useNavigate } from "react-router-dom";
import Loader from "../features/Loader";
import Error from "../features/Error";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_ApiKey,
  authDomain: import.meta.env.VITE_APP_AuthDomain,
  projectId: import.meta.env.VITE_APP_ProjectId,
  storageBucket: import.meta.env.VITE_APP_StorageBucket,
  messagingSenderId: import.meta.env.VITE_APP_MessagingSenderId,
  appId: import.meta.env.VITE_APP_AppId,
  measurementId: import.meta.env.VITE_APP_MeasurementId,
};
// console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const Add = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [branches, setBranches] = useState([
    { branch: "", start: "", end: "", days: [] },
  ]);
  const doctorSlice = useSelector((state) => state.doctorSlice);
  const { loading, error, success } = doctorSlice;
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
  ];

  const handleImageUpload = async (e) => {
    const x = e.target.files[0];
    setImagePreview(URL.createObjectURL(e.target.files[0]));

    const allowedTypes = ["image/jpeg", "image/png", "images/jpg"];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (!x) return;

    // Validate file type
    if (!allowedTypes.includes(x.type)) {
      alert("Invalid file type. Please upload a JPEG, PNG, JPG.");
      return;
    }

    // Validate file size
    if (x.size > maxSize) {
      alert("File is too large. Maximum size is 1MB.");
      return;
    }
    try {
      const filename = `${Date.now()}-${x.name}`;
      const storageRef = ref(storage, `images/${filename}`);
      const snapshot = await uploadBytes(storageRef, x);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImage(downloadURL);
      console.log(downloadURL);
    } catch (error) {
      console.log(error);
    }
  };

  //handle clear data from branch
  const handleClearBranch = (branchIndex) => {
    setBranches((prevBranches) => {
      const newBranch = [...prevBranches];
      const branch = newBranch.find((r, i) => i === branchIndex);
      //   console.log(branch);
      branch["branch"] = "";
      branch["start"] = "";
      branch["end"] = "";
      branch["days"] = [];
      return newBranch;
    });
  };
  //handle add branch for arr
  const handleAddBranch = () => {
    setBranches([...branches, { branch: "", start: "", end: "", days: [] }]);
  };
  //handle delte branch from arr
  const handleDeleteBranch = () => {
    // console.log(branches.length);
    if (branches.length === 1) {
      return;
    }
    setBranches(branches.slice(0, -1));
  };
  //check if day exists in another branch
  const isDayInOtherBranches = (currentBranchIndex, day) => {
    return branches.some(
      (branch, index) =>
        index !== currentBranchIndex && branch.days.includes(day)
    );
  };

  //handle days added in branch and delete
  const handleDayClick = (day, branchIndex) => {
    setBranches((prevBranches) => {
      if (
        !prevBranches[branchIndex].days.includes(day) &&
        isDayInOtherBranches(branchIndex, day)
      ) {
        alert(`Cannot add ${day} as it already exists in another branch`);
        return prevBranches;
      }

      const newBranch = JSON.parse(JSON.stringify(prevBranches));

      const branch = newBranch.find((r, i) => i === branchIndex);
      const currentDays = new Set(branch.days);
      //   console.log(currentDays);
      if (currentDays.has(day)) {
        currentDays.delete(day);
      } else {
        currentDays.add(day);
      }

      // Convert back to array and ensure sorting matches daysOfWeek order
      newBranch[branchIndex].days = [...currentDays].sort(
        (a, b) =>
          newBranch[branchIndex].days.indexOf(a) -
          newBranch[branchIndex].days.indexOf(b)
      );
      return newBranch;
    });
    // console.log(branches);
  };
  //handle branch change
  const handleBranchChange = (branchIndex, field, value) => {
    setBranches((prevBranches) => {
      const newBranch = [...prevBranches];
      const branch = newBranch.find((r, i) => i === branchIndex);
      branch[field] = value;
      return newBranch;
    });
  };
  //submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    const row = {
      fName,
      sName,
      email,
      image,
      branches,
      password,
      phone,
    };
    dispatch(addDocotr(row));
    setPhone("");
    setPassword("");
    setFName("");
    setSName("");
    setEmail("");
    if (success) {
      navigator("/");
    }
  };
  return (
    <div className="h-full   py-2 bg-[#e8f6f8]">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="card  shadow-sm max-w-3xl mx-auto h-full">
          <div className="card-body">
            <h2 className="card-title text-black justify-start text-2xl mb-6">
              Add a doctor
            </h2>

            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              {/* Profile Image Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-2 border-base-300 flex items-center justify-center ">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-base-content opacity-50">
                        <Camera size={40} />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 btn btn-primary btn-circle btn-sm">
                    <Camera className="w-4 h-4" />
                  </label>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">First Name</span>
                  </label>
                  <input
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    required
                    type="text"
                    placeholder="First name"
                    className="input input-bordered w-full bg-white shadow-md text-black"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Last Name</span>
                  </label>
                  <input
                    value={sName}
                    onChange={(e) => setSName(e.target.value)}
                    required
                    type="text"
                    placeholder="Last name"
                    className="input input-bordered w-full bg-white shadow-md text-black"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="doctor@example.com"
                    className="input input-bordered w-full bg-white shadow-md text-black"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Password</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full bg-white shadow-md text-black"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Phone Number</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="input input-bordered w-full bg-white shadow-md text-black"
                  />
                </div>
              </div>

              {/* Branch and Schedule */}
              {branches.map((bra, i) => (
                <div className="grid grid-cols-1 gap-2" key={i}>
                  <div className="grid grid-cols-4 max-sm:block gap-4">
                    <div className="form-control col-span-2">
                      <label className="label">
                        <span className="label-text text-black">
                          Branch {i + 1}
                        </span>
                      </label>
                      <select
                        value={bra.branch}
                        onChange={(e) =>
                          handleBranchChange(i, "branch", e.target.value)
                        }
                        className="select select-bordered w-full bg-white shadow-md text-black">
                        <option disabled selected value={""}>
                          Select
                        </option>
                        <option>Sheraton</option>
                        <option>New Cairo</option>
                        <option>Alexandria</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-black">
                          Starting Time
                        </span>
                      </label>
                      <select
                        value={bra.start}
                        className="select select-bordered w-full bg-white shadow-md text-black"
                        onChange={(e) =>
                          handleBranchChange(i, "start", e.target.value)
                        }>
                        <option disabled selected value={""}>
                          Select
                        </option>
                        {hours.map((h, i) => (
                          <option key={i}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-black">
                          Ending Time
                        </span>
                      </label>
                      <select
                        value={bra.end}
                        className="select select-bordered w-full bg-white shadow-md text-black"
                        onChange={(e) =>
                          handleBranchChange(i, "end", e.target.value)
                        }>
                        <option disabled selected value={""}>
                          Select
                        </option>
                        {hours.map((h, i) => (
                          <option key={i}>{h}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">
                        Working Days
                      </span>
                    </label>
                    <div className="flex  flex-wrap justify-between gap-4 max-sm:block">
                      <div>
                        {weekDays.map((day) => (
                          <button
                            onClick={() => handleDayClick(day, i)}
                            key={day}
                            type="button"
                            disabled={
                              !bra.days.includes(day) &&
                              isDayInOtherBranches(i, day)
                            }
                            className={`border-2 border-black btn-sm max-sm:mb-4 text-black ${
                              day == "Sun" && "rounded-s-lg"
                            } ${day == "Sat" && "rounded-e-lg"} 
                        transition-colors ${
                          bra.days.includes(day)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }
                        `}>
                            {day}
                          </button>
                        ))}
                      </div>

                      {i != 0 && (
                        <span
                          className=" text-black cursor-pointer border-2 border-red-500 p-1 rounded-md shadow-md"
                          onClick={handleDeleteBranch}>
                          Delete Branch
                        </span>
                      )}
                    </div>
                    <div className="card-actions justify-between mt-6 ">
                      <span
                        className=" text-black   cursor-pointer border-2 border-green-500 p-1 rounded-md shadow-md"
                        onClick={handleAddBranch}>
                        Add Another Branch
                      </span>
                      <span
                        className=" text-black cursor-pointer"
                        onClick={() => handleClearBranch(i)}>
                        Clear Branch
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card-actions justify-end mt-6">
                <button
                  type="button"
                  onClick={() => navigator("/")}
                  className="btn btn-ghost border-2 text-black border-[#287F89]">
                  Back
                </button>
                <button type="submit" className="btn text-white bg-[#287F89]">
                  Add Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;

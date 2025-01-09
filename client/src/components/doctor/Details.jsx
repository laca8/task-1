import { useEffect } from "react";
import { Pencil, Trash2, UserCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, removeDoctor } from "../../redux/slicer/doctorSlicer";
import Loader from "../features/Loader";
import Error from "../features/Error";
const Details = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const doctorSlice = useSelector((state) => state.doctorSlice);
  const { loading, error, doctors } = doctorSlice;

  const handleAdd = () => {
    navigator("/add-doctor");
  };
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);
  const handleDelete = (id) => {
    console.log(id);
    let isDeleted = window.confirm("Are you sure ?");
    if (isDeleted) {
      dispatch(removeDoctor(id));
      dispatch(fetchDoctors());
    }
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Error error={error} />
  ) : (
    <div className="w-full max-w-2xl mx-auto p-4 h-full text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <button onClick={handleAdd} className="btn btn-ghost btn-sm">
          <Plus className="w-4 h-4 bg-black rounded-full text-white text-lg " />{" "}
          Add
        </button>
      </div>

      <div className="bg-[#BFE7EC] rounded-lg overflow-hidden shadow-lg h-full">
        {doctors?.data?.map((doctor, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4  ${
              index !== doctors.length - 1
                ? "border-b border-dotted border-sky-200"
                : ""
            }`}>
            <div className="flex items-center gap-3">
              {doctor?.image == "" ? (
                <UserCircle className="w-10 h-10 text-gray-400" />
              ) : (
                <img src={doctor?.image} className="w-10 h-10 rounded-full " />
              )}
              <span className="font-medium">
                DR. {doctor?.fName} {doctor?.sName}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm">
                <Pencil className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(doctor._id)}
                className="btn btn-ghost btn-sm text-error">
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete doctor</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;

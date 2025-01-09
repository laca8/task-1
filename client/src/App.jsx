import Header from "./components/features/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddDoctor from "./pages/AddDoctor";
import Doctors from "./pages/Doctors";
import AddReservation from "./pages/AddReservation";
import MedicalSessions from "./pages/Session";
import Footer from "./components/features/Footer";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/add-doctor" element={<AddDoctor />}></Route>
        <Route path="/" element={<Doctors />}></Route>
        <Route path="/reservation" element={<AddReservation />}></Route>
        <Route path="/sessions" element={<MedicalSessions />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

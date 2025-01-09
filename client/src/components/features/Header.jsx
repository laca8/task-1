const Header = () => {
  return (
    <div className="navbar  w-full bg-white shadow-md">
      <div className="flex-1">
        <img
          src="https://image.pngaaa.com/709/5059709-middle.png"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/ " className="text-black">
              Doctors
            </a>
          </li>
          <li>
            <a href="/reservation" className="text-black">
              Reservation
            </a>
          </li>
          <li>
            <a href="/sessions" className="text-black">
              Sessions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

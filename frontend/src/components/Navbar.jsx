import React from "react";
import linkedin from "../assets/linkedin.svg";
import home from "../assets/home.svg";
const Navbar = () => {
  return (
    <nav className="bg-secondary shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div>
            <img src={linkedin} alt="Linkedin" />
          </div>
          <div className="flex items-center justify-center gap-[40px]">
            <div>
              <a className="flex flex-col items-center">
                <img src={home} alt="home" className="w-[30px] h-[30px]" />
                <span className="text-sm">Home</span>
              </a>
            </div>
            <div>
              <a className="flex flex-col items-center">
                <img src={home} alt="home" className="w-[30px] h-[30px]" />
                <span className="text-sm">My Network</span>
              </a>
            </div>
            <div>
              <a className="flex flex-col items-center">
                <img src={home} alt="home" className="w-[30px] h-[30px]" />
                <span className="text-sm">Jobs</span>
              </a>
            </div>
            <div>
              <a className="flex flex-col items-center">
                <img src={home} alt="home" className="w-[30px] h-[30px]" />
                <span className="text-sm">Notifications</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

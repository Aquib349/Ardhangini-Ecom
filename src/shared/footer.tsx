import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
import LOGO from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-yellow-200 text-black pt-10 pb-4">
      <div className="m-auto w-[90%]">
        <div className="flex flex-col space-x-4 mb-4 pl-4 md:pl-0">
          {/* Logo */}
          <img
            src={LOGO}
            alt="Ardhangini Designs Logo"
            className="w-[250px] md:w-[300px] pl-3 pb-4"
          />
          <p className="text-xs md:text-md lg:text-lg font-medium pb-4 lg:pl-4">
            A Unit of Ardhangini Designs LLP
          </p>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <p className="text-xs md:text-sm font-medium">
              Welcome to ARDHANGINI DESIGNS, where tradition meets elegance.
              Established in 2024, our company is dedicated to preserving the
              rich heritage of Indian textiles while embracing contemporary
              fashion trends.
            </p>
            <div className="mt-4">
              <h2 className="font-bold text-sm md:text-lg">Contact Us</h2>
              <p className="text-xs md:text-sm pt-1">
                <strong className="font-semibold">Mail Us -</strong>{" "}
                customersupport@ArdhanginiDesigns.com
              </p>
              <p className="text-xs md:text-sm">
                <strong className="font-semibold">Customer Contact No -</strong>{" "}
                +919587306502
              </p>
              <p className="text-xs md:text-sm">
                <strong className="font-semibold">WhatsApp Support -</strong>{" "}
                +919587306502
              </p>
            </div>
          </div>

          {/* Middle Section */}
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-between cursor-pointer">
            <div>
              <h3 className="font-semibold mb-2 text-sm md:text-lg">Help</h3>
              <ul className="text-xs md:text-sm space-y-4">
                <li>About Us</li>
                <li>Terms and Conditions</li>
                <li>Disclaimer</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm md:text-lg">
                Policies
              </h3>
              <ul className="text-xs md:text-sm space-y-4">
                <li>Exchange & Return Policy</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="">
            <h3 className="font-bold mb-2 text-sm md:text-lg">
              STAY CONNECTED
            </h3>
            <div className="flex space-x-3 mb-4">
              <Facebook className="h-4 w-4" />
              <Instagram className="h-4 w-4" />
              <Twitter className="h-4 w-4" />
              <Youtube className="h-4 w-4" />
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="bg-yellow-200 mt-4 flex justify-center font-semibold">
          <p className="text-xs md:text-sm">
            © Copyright Ardhangini. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

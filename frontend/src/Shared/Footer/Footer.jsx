import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Rentals
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul>
              <li>
                <a href="mailto:info@company.com" className="hover:underline">
                  info@company.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  123 Main St, City, Country
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Rental house All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

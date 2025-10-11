import React from 'react';
import { fblogo } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-[#FAFAFA] text-black py-8 px-6  shadow-inner border-t border-[#415a77]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-balck">🌐 Follow Us</h3>
          <div className="flex flex-col items-center md:items-start gap-4">
            <a
              href="https://www.jntucek.ac.in/"
              className="text-black hover:text-purple-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.jntucek.ac.in
            </a>
            <a href="http://facebook.com/jntucek" target="_blank" rel="noopener noreferrer">
              <img src={fblogo} alt="Facebook logo" className="w-10 h-10 mx-auto md:mx-0" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Contact Us</h3>
          <address className="not-italic space-y-2 text-black text-sm">
            University college of Engineering Kakinada <br />
            JNTU Kakinada, Nagamallithota, Kakinada <br />
            AP - 533003 <br />
            Telephone : (0884) 777-2000, (0884) 2300823 <br />
            Email:{' '}
            <a
              href="mailto:principal_jntucek@yahoo.com"
              className="text-black hover:text-purple-800 transition-colors"
            >
              principal_jntucek@yahoo.com
            </a>{' '}
            <br />
            <a
              href="mailto:principal.ucek@jntucek.ac.in"
              className="text-black hover:text-purple-800 transition-colors"
            >
              principal.ucek@jntucek.ac.in
            </a>
          </address>
        </div>

        <div className="text-black text-sm mt-6 md:mt-0 flex items-center justify-center md:justify-end">
          Copyright &copy; 2025 University college of Engineering Kakinada, JNTUK. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

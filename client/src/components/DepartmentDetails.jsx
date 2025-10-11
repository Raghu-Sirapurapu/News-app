import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    cse_hod, ece_hod, eee_hod, mech_hod, civil_hod, pce_hod, math_hod, phy_hod,
    chem_hod, mng_hod, hss_hod, library_hod,
    cse_dept, ece_dept, eee_dept, mech_dept, civil_dept, pce_dept, mng_dept, mpch_dept, library_dept
} from "../assets/assets.js";

const DepartmentDetails = ({ department }) => {
    if (!department) return null;

    const [slideIndex, setSlideIndex] = useState(0);
    const nextSlide = () => setSlideIndex((prev) => (prev === 1 ? 0 : prev + 1));
    const prevSlide = () => setSlideIndex((prev) => (prev === 0 ? 1 : prev - 1));

    // ✅ Department-specific data
    let hodDetails = {};
    let deptDetails = {};

    if (department === 'CSE') {
        hodDetails = {
            name: 'Dr. N Ramakrishnaiah',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'nrkrishna27@jntucek.ac.in',
            phone: '8842300866',
            image: cse_hod,
            deptFull: 'Department of Computer Science and Engineering, JNTUK',
        };
        deptDetails = {
            image: cse_dept,
            desc: ''
        };
    } else if (department === 'ECE') {
        hodDetails = {
            name: 'Dr. Leela Kumari Balivada',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'leela8821@jntucek.ac.in',
            phone: '8842300943',
            image: ece_hod,
            deptFull: 'Department of Electronics and Communication Engineering, JNTUK',
        };
        deptDetails = {
            image: ece_dept,
            desc: `The ECE Department was established in 1983 and focuses on Communication Systems, VLSI, and Embedded Technologies. It provides advanced labs and active research collaborations.`,
        };
    } else if (department === 'EEE') {
        hodDetails = {
            name: 'Dr. Venkata Reddy Kota',
            title: 'Head of the Department',
            qualification: 'M.Tech, Ph.D.',
            email: 'kvr@jntucek.ac.in',
            phone: '8842300843',
            image: eee_hod,
            deptFull: 'Department of Electrical and Electronics Engineering, JNTUK',
        };
        deptDetails = {
            image: eee_dept,
            desc: `The EEE Department was started in 1980, focusing on Power Systems, Renewable Energy, and Control Engineering. It has strong industry partnerships and student research groups.`,
        };
    } else if (department === 'MECH') {
        hodDetails = {
            name: 'Dr. Lingaraju Dumpala',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'dlraju@jntucek.ac.in',
            phone: '9247793403',
            image: mech_hod,
            deptFull: 'Department of Mechanical Engineering, JNTUK',
        };
        deptDetails = {
            image: mech_dept,
            desc: `The Mechanical Engineering Department was established in 1972 and emphasizes design, manufacturing, and thermal sciences. It offers modern labs and student projects tied to real-world applications.`,
        };
    } else if (department === 'CIVIL') {
        hodDetails = {
            name: 'Dr. Kollipara Padma Kumari',
            title: 'Head of the Department',
            qualification: 'M.Phil, Ph.D (ANU)',
            email: 'padmakumarik@jntucek.ac.in',
            phone: '8842300836',
            image: civil_hod,
            deptFull: 'Department of Civil Engineering, JNTUK',
        };
        deptDetails = {
            image: civil_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    } else if (department === 'PE&PCE') {
        hodDetails = {
            name: 'Mr. Polisetty Venkata Nageswara Rao',
            title: 'Head of the Department',
            qualification: 'M.TECH (PETROLEUM REFINING)',
            email: 'pvnrao54@gmail.com',
            phone: '9491069234',
            image: pce_hod,
            deptFull: 'Department of PE and PCE, JNTUK',
        };
        deptDetails = {
            image: pce_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }
    else if (department === 'MATHS') {
        hodDetails = {
            name: 'Dr. V Ravindranath',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'nath_vr@jntucek.ac.in',
            phone: '9948083686',
            image: math_hod,
            deptFull: 'Department of Mathematics, JNTUK',
        };
        deptDetails = {
            image: mpch_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }
    else if (department === 'PHYSICS') {
        hodDetails = {
            name: 'Dr. G Padmaja Rani',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'padmajaranig@jntucek.ac.in',
            phone: '9440463002',
            image: phy_hod,
            deptFull: 'Department of Physics, JNTUK',
        };
        deptDetails = {
            image: mpch_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }
    else if (department === 'CHEMISTRY') {
        hodDetails = {
            name: 'Dr. S. Satya Veni',
            title: 'Head of the Department',
            qualification: 'Ph.D.(S.V.University)',
            email: 'dr.satyapurna@jntucek.ac.in',
            phone: '7893022655',
            image: chem_hod,
            deptFull: 'Department of Chemistry, JNTUK',
        };
        deptDetails = {
            image: mpch_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }
    else if (department === 'HSS') {
        hodDetails = {
            name: 'Dr. G. Syam Kumar',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'syam.pd@jntucek.ac.in',
            phone: '8842370003',
            image: hss_hod,
            deptFull: 'Department of HSS, JNTUK',
        };
        deptDetails = {
            image: mpch_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }
    else if (department === 'MANAGEMENT STUDIES') {
        hodDetails = {
            name: 'Dr. Koppanati Meera Saheb',
            title: 'Head of the Department',
            qualification: 'B.Tech., M.Tech., Ph.D.,',
            email: ' meerasaheb@jntucek.ac.in',
            phone: '8842388555',
            image: mng_hod,
            deptFull: 'Department of Management Studies, JNTUK',
        };
        deptDetails = {
            image: mng_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }
    else if (department === 'LIBRARY') {
        hodDetails = {
            name: 'Dr. B. R. Doraswamy Naick',
            title: 'Head of the Department',
            qualification: 'Ph.D (SVU)',
            email: ' drbdnaick@jntucek.ac.in',
            phone: '8842300874',
            image: library_hod,
            deptFull: 'Department of Library, JNTUK',
        };
        deptDetails = {
            image: library_dept,
            desc: `The Civil Engineering Department, established in 1946, has a legacy of excellence in structural engineering, geotechnical studies, and sustainable infrastructure development.`,
        };
    }

    return (
        <div className="sticky top-24 h-[80vh]"> {/* Fixed height & sticky */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md h-full overflow-hidden relative flex flex-col">

                {/* 🧭 Scrollable content inside */}
                <div className="overflow-y-scroll px-4 py-2 flex-1">
                    <div
                        className="transition-transform duration-500 ease-in-out flex"
                        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                    >
                        {/* ---- Slide 1: HOD Details ---- */}
                        <div className="flex-shrink-0 w-full box-border">
                            <h2 className="text-xl font-bold text-black mb-3">{department} Department</h2>
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={hodDetails.image}
                                    alt="HOD"
                                    className="w-32 h-32 rounded-full object-cover mb-3 border border-gray-400"
                                />
                                <h3 className="text-lg font-semibold text-black">{hodDetails.name}</h3>
                                <p className="text-gray-700">{hodDetails.title}</p>
                                <p className="text-gray-700">{hodDetails.deptFull}</p>
                                <p className="text-gray-700 mb-2">{hodDetails.qualification}</p>
                                <p className="text-gray-700">Email: {hodDetails.email}</p>
                                <p className="text-gray-700">Office Phone: {hodDetails.phone}</p>
                            </div>
                        </div>

                        {/* ---- Slide 2: Department Details ---- */}
                        <div className="flex-shrink-0 w-full box-border">
                            <h2 className="text-xl font-bold text-black mb-3">{department} Department Overview</h2>
                            <img
                                src={deptDetails.image}
                                alt={`${department} Department`}
                                className="w-full h-48 object-cover rounded-lg mb-3 border border-gray-400"
                            />
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                {deptDetails.desc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 🧭 Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
            </div>
        </div>
    );

};

export default DepartmentDetails;

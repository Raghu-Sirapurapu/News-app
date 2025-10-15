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

    // Department-specific HOD and image data
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
        deptDetails = { image: cse_dept, desc: '' };
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
        deptDetails = { image: ece_dept, desc: '' };
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
        deptDetails = { image: eee_dept, desc: '' };
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
        deptDetails = { image: mech_dept, desc: '' };
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
        deptDetails = { image: civil_dept, desc: '' };
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
        deptDetails = { image: pce_dept, desc: '' };
    } else if (department === 'MATHS') {
        hodDetails = {
            name: 'Dr. V Ravindranath',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'nath_vr@jntucek.ac.in',
            phone: '9948083686',
            image: math_hod,
            deptFull: 'Department of Mathematics, JNTUK',
        };
        deptDetails = { image: mpch_dept, desc: '' };
    } else if (department === 'PHYSICS') {
        hodDetails = {
            name: 'Dr. G Padmaja Rani',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'padmajaranig@jntucek.ac.in',
            phone: '9440463002',
            image: phy_hod,
            deptFull: 'Department of Physics, JNTUK',
        };
        deptDetails = { image: mpch_dept, desc: '' };
    } else if (department === 'CHEMISTRY') {
        hodDetails = {
            name: 'Dr. S. Satya Veni',
            title: 'Head of the Department',
            qualification: 'Ph.D.(S.V.University)',
            email: 'dr.satyapurna@jntucek.ac.in',
            phone: '7893022655',
            image: chem_hod,
            deptFull: 'Department of Chemistry, JNTUK',
        };
        deptDetails = { image: mpch_dept, desc: '' };
    } else if (department === 'HSS') {
        hodDetails = {
            name: 'Dr. G. Syam Kumar',
            title: 'Head of the Department',
            qualification: 'Ph.D.',
            email: 'syam.pd@jntucek.ac.in',
            phone: '8842370003',
            image: hss_hod,
            deptFull: 'Department of HSS, JNTUK',
        };
        deptDetails = { image: mpch_dept, desc: '' };
    } else if (department === 'MANAGEMENT STUDIES') {
        hodDetails = {
            name: 'Dr. Koppanati Meera Saheb',
            title: 'Head of the Department',
            qualification: 'B.Tech., M.Tech., Ph.D.',
            email: 'meerasaheb@jntucek.ac.in',
            phone: '8842388555',
            image: mng_hod,
            deptFull: 'Department of Management Studies, JNTUK',
        };
        deptDetails = { image: mng_dept, desc: '' };
    } else if (department === 'LIBRARY') {
        hodDetails = {
            name: 'Dr. B. R. Doraswamy Naick',
            title: 'Head of the Department',
            qualification: 'Ph.D (SVU)',
            email: 'drbdnaick@jntucek.ac.in',
            phone: '8842300874',
            image: library_hod,
            deptFull: 'Department of Library, JNTUK',
        };
        deptDetails = { image: library_dept, desc: '' };
    }

    return (
        <div className="sticky top-24 h-[80vh]">
            <div className="bg-white border border-gray-300 rounded-lg shadow-md h-full overflow-hidden relative flex flex-col">

                {/* Scrollable content */}
                <div className="overflow-y-scroll px-4 py-2 flex-1">
                    <div
                        className="transition-transform duration-500 ease-in-out flex"
                        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                    >
                        {/* Slide 1: HOD Details */}
                        <div className="flex-shrink-0 w-full box-border">
                            <h2 className="text-xl font-semibold text-center text-black mb-3">{department} Department</h2>
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={hodDetails.image}
                                    alt="HOD"
                                    className="w-64 h-64 object-cover mb-4" // bigger image, not rounded
                                />
                                <h3 className="text-lg font-semibold text-black">{hodDetails.name}</h3>
                                <p className="text-gray-700">{hodDetails.title}</p>
                                <p className="text-gray-700">{hodDetails.deptFull}</p>
                                <p className="text-gray-700 mb-2">{hodDetails.qualification}</p>
                                <p className="text-gray-700">Email: {hodDetails.email}</p>
                                <p className="text-gray-700">Office Phone: {hodDetails.phone}</p>
                            </div>
                        </div>


                        {/* Slide 2: Department Details */}
                        <div className="flex-shrink-0 w-full box-border">
                            <h2 className="text-xl font-semibold text-black mb-3">{department} Department Overview</h2>
                            <img
                                src={deptDetails.image}
                                alt={`${department} Department`}
                                className="w-full h-48 object-cover rounded-lg mb-3 border border-gray-400"
                            />

                            {/* ========================= */}
                            {/* Paste formatted department JSX descriptions below */}
                            {/* ========================= */}
                            <div className="text-gray-700 leading-relaxed space-y-3">
                                {department === "CSE" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Establishment and Evolution</h3>
                                        <p><strong>1990</strong> – Department of Computer Science and Engineering (CSE) was formally established.</p>
                                        <p><strong>1987–88</strong> – PGDCA (Post Graduate Diploma in Computer Applications) program started under the ECE Department — first computer-oriented course at the college.</p>
                                        <p><strong>1989–90</strong> – B.Tech. in Computer Science and Engineering was introduced (initially under the ECE Department).</p>
                                        <p><strong>1990 onwards</strong> – Both PGDCA and B.Tech. programs were offered under the newly formed CSE Department.</p>
                                        <p><strong>1996</strong> – MCA (Master of Computer Applications) program started.</p>
                                        <p><strong>2000–01</strong> – M.Tech. (Full-Time) program introduced.</p>
                                        <p><strong>2001–02</strong> – Further expansion in PG programs.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Academic Programs</h3>
                                        <p><strong>Programs Offered</strong>: B.Tech., M.Tech., and MCA.</p>
                                        <p><strong>Curriculum Review</strong>: Regular updates every 2–3 years to align with industry requirements.</p>
                                        <p><strong>Board of Studies</strong>:</p>
                                        <p>4 professors from JNTU CSE Department.</p>
                                        <p>2 eminent professors from other universities.</p>
                                        <p>2 reputed industrial experts.</p>
                                        <p><strong>Focus</strong>: Emphasis on <strong>industry-oriented</strong>, <strong>application-based</strong> education over purely theoretical instruction.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Infrastructure & Research</h3>
                                        <p><strong>Well-equipped Labs</strong>:</p>
                                        <p>Labs support UG & PG programs.</p>
                                        <p>Modern facilities for software testing, internet technologies, programming languages, and data engineering.</p>
                                        <p><strong>Research Areas</strong>:</p>
                                        <p>Distributed systems, cognitive computing, security.</p>
                                        <p>Language engineering, databases, wireless networks.</p>
                                        <p>Web services, cognitive informatics, computer ergonomics.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Industry & Alumni Connections</h3>
                                        <p><strong>Alumni Success</strong>: Hold top positions in companies like <strong>Microsoft</strong>, <strong>TCS</strong>, <strong>Satyam</strong>, <strong>Infotech</strong>, etc.</p>
                                        <p><strong>Placement</strong>: Strong placement track record through on-campus and off-campus drives.</p>
                                        <p><strong>Industry Collaboration</strong>: MoUs with <strong>TCS Ltd</strong>, <strong>Chicago State University</strong>, and <strong>Loment Technologies Ltd., USA</strong> for joint research and collaboration.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Development & Future Plans</h3>
                                        <p><strong>World Bank-funded Modernization</strong> through <strong>TEQIP (Technical Education Quality Improvement Programme)</strong>.</p>
                                        <p><strong>Infrastructure Expansion</strong>:</p>
                                        <p>Procurement of new equipment for labs.</p>
                                        <p>Need for further augmentation to launch new PG programs.</p>
                                        <p>Additional faculty with expertise in advanced technologies being planned.</p>
                                        <p>Expansion of department infrastructure and library resources under consideration.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Faculty Expertise</h3>
                                        <p>Faculty members specialize in:</p>
                                        <p><strong>Data Mining</strong></p>
                                        <p><strong>Image Processing</strong></p>
                                        <p><strong>Information Security</strong></p>
                                        <p><strong>Computer Networks</strong></p>
                                        <p><strong>Cloud Computing</strong></p>
                                        <p><strong>Social Network Analysis</strong></p>
                                        <p><strong>Internet of Things (IoT)</strong></p>
                                    </div>
                                )}

                                {department === "ECE" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Department of Electronics and Communication Engineering (ECE)</h3>
                                        <p>The <strong>Department of Electronics and Communication Engineering (ECE)</strong> at JNTU College of Engineering, Kakinada, holds a <strong>prestigious legacy</strong> as one of the <strong>oldest ECE departments in the country</strong>. Established in <strong>1958</strong> under the name <strong>Telecommunication Engineering Department</strong>, it was the <strong>first of its kind in the state of Andhra Pradesh</strong>. The department was later renamed to reflect the broader scope of Electronics and Communication Engineering as the discipline evolved.</p>
                                        <p>Over the decades, the department has nurtured generations of professionals who have gone on to make significant contributions across the globe. Its <strong>alumni have achieved distinction</strong> in academia, industry, research, and public service, upholding the department’s <strong>reputation for academic excellence and innovation</strong>.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Milestone Celebration</h3>
                                        <p>In <strong>2008</strong>, the department proudly celebrated its <strong>Golden Jubilee</strong>, marking <strong>50 years of excellence in engineering education</strong>. This event highlighted the department’s rich history and its impactful contributions to the field of electronics and communication.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Faculty and Infrastructure</h3>
                                        <p>The department is supported by a team of <strong>highly qualified and experienced faculty members</strong> who are committed to teaching, research, and mentorship. It is equipped with <strong>state-of-the-art infrastructure</strong>, including modern laboratories, advanced equipment, and cutting-edge software tools that facilitate effective learning and hands-on training.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Academic Programs</h3>
                                        <p>The ECE Department offers both <strong>Undergraduate (B.Tech)</strong> and <strong>Postgraduate (M.Tech)</strong> programs. These programs are designed to:</p>
                                        <p>Provide a <strong>strong theoretical foundation</strong>.</p>
                                        <p>Develop <strong>practical skills</strong> in electronics, communication systems, signal processing, VLSI design, embedded systems, and more.</p>
                                        <p>Encourage <strong>innovation, research, and industry-readiness</strong> among students.</p>

                                        <hr />

                                        <h3 className="text-lg font-semibold">Legacy and Pride</h3>
                                        <p>The <strong>mutual pride</strong> shared between the department and its <strong>accomplished alumni</strong> reflects the enduring impact of its academic and cultural legacy. With its commitment to excellence, the department continues to be a <strong>pillar of engineering education</strong>, preparing students to meet the challenges of a rapidly advancing technological world.</p>
                                    </div>
                                )}

                                {department === "CIVIL" && (
                                    <div className="text-gray-700 leading-relaxed space-y-3">
                                        <p>
                                            The <strong>Department of Civil Engineering</strong> was established in the year <strong>1946</strong>,
                                            making it one of the oldest and most prestigious departments of the institution. Over the decades,
                                            it has built a strong legacy in academics, research, and consultancy services, contributing
                                            significantly to the field of civil engineering both nationally and internationally.
                                        </p>

                                        <p>
                                            The department offers a Bachelor of Technology (B.Tech) program in Civil Engineering and several
                                            Postgraduate (M.Tech) programs, including:
                                        </p>

                                        <ul className="list-disc list-inside">
                                            <li><strong>Structural Engineering</strong></li>
                                            <li><strong>Soil Mechanics and Foundation Engineering</strong></li>
                                            <li><strong>Environmental Engineering</strong> (if applicable to your curriculum)</li>
                                        </ul>

                                        <p>To support its academic and research activities, the department hosts a wide range of state-of-the-art laboratories, including:</p>

                                        <ul className="list-disc list-inside">
                                            <li><strong>Strength of Materials and Concrete Technology Lab</strong></li>
                                            <li><strong>Fluid Mechanics and Hydraulic Machinery Lab</strong></li>
                                            <li><strong>Geotechnical Engineering Lab</strong></li>
                                            <li><strong>Environmental Engineering Lab</strong></li>
                                            <li><strong>Surveying and Transportation Engineering Labs</strong></li>
                                            <li><strong>Engineering Geology Lab</strong></li>
                                            <li><strong>Computer-Aided Design (CAD) & Geographic Information Systems (GIS) Lab</strong></li>
                                        </ul>

                                        <p>Postgraduate and research scholars have access to advanced facilities such as:</p>

                                        <ul className="list-disc list-inside">
                                            <li><strong>Compression Testing Machines (up to 300T)</strong></li>
                                            <li><strong>Tensile Testing and Beam Bending Equipment</strong></li>
                                            <li><strong>Cyclic Triaxial Testing Machines</strong></li>
                                            <li><strong>Large Box Shear Apparatus</strong></li>
                                            <li><strong>CBR and Permeability Apparatus</strong></li>
                                        </ul>

                                        <p>The <strong>Computational Laboratory</strong> is well-equipped with industry-standard software tools like:</p>

                                        <ul className="list-disc list-inside">
                                            <li><strong>STAAD Pro, STRUDS</strong></li>
                                            <li><strong>MATLAB</strong></li>
                                            <li><strong>PLAXIS (2D/3D)</strong></li>
                                            <li><strong>AutoCAD Civil 3D and GIS platforms</strong></li>
                                        </ul>

                                        <p>
                                            Faculty members are actively engaged in sponsored research, consultancy, and publication in high-impact journals.
                                            The department has a vibrant academic culture with guest lectures, workshops, seminars,
                                            and industry-institute collaborations to keep students aligned with current trends and technologies.
                                        </p>

                                        <p>
                                            With a rich history and a future-focused vision, the Department of Civil Engineering continues to
                                            uphold academic excellence while contributing to the infrastructural and environmental development of the nation.
                                        </p>
                                    </div>
                                )}{department === "EEE" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Department of Electrical and Electronics Engineering (EEE)</h3>
                                        <p>Electrical science is one of the major contributors in the engineering field and its principles are involved in the design, development, and construction of nearly all electrical, electronics, and computing devices and systems. Continued research and development have led to better electronic and computing processes, helping mankind.</p>
                                        <p>The department provides the broad knowledge base required for engineers in the present global industrial scenario. It takes maximum advantage of the latest technologies and market opportunities to enrich learners with updated and advanced know-how of modern technology.</p>
                                        <p>The main focus is on significant modern developments in <strong>electrical and electronics engineering</strong>, preparing students for innovation and excellence in the field.</p>
                                    </div>
                                )}
                                {department === "MECH" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Department of Mechanical Engineering (ME)</h3>
                                        <p>The <strong>Department of Mechanical Engineering</strong> was established from the inception (<strong>1946</strong>) of the institute to meet the requirements of the mechanical industry and the society/discipline after consultation with various stakeholders.</p>
                                        <p>The department started with an initial intake of <strong>40 students</strong> in the UG Program in ME, which was enhanced to <strong>50 students</strong> in the year <strong>1976</strong>.</p>
                                        <p>In <strong>1972</strong>, the department started a PG Program in <strong>Machine Design (MD)</strong> with an initial intake of <strong>12 students</strong>, which was enhanced to <strong>18 students</strong> in <strong>2001</strong> and further increased to <strong>25 students</strong> in <strong>2008</strong>.</p>
                                        <p>The department also started another PG Program in <strong>Computer Aided Design and Computer Aided Manufacturing (CAD/CAM)</strong> in <strong>2001</strong> with an initial intake of <strong>18 students</strong>, enhanced to <strong>25 students</strong> in <strong>2008</strong>.</p>
                                    </div>
                                )}
                                {department === "PE&PCE" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Department of Petroleum & Petrochemical Engineering (PPE)</h3>
                                        <p>Welcome to the <strong>Petroleum & Petrochemical Engineering Departments</strong> at <strong>Jawaharlal Nehru Technological University, Kakinada</strong>.</p>

                                        <p>The <strong>Department of Petrochemical Engineering</strong> was established in the year <strong>2008</strong> and <strong>Petroleum Engineering</strong> in <strong>2009</strong>, with the <strong>Pipeline Engineering (PG)</strong> course introduced in <strong>2014</strong> to make its mark in the Oil and Gas industries in the country. Subsequent developments, under the guidance of distinguished educators, renowned personalities from oil and gas industries, and scientists, have led the department to the forefront of research and teaching in petroleum and petrochemical engineering.</p>

                                        <p>Since its commencement, the department has produced more than <strong>500 undergraduate (B.Tech) students</strong> and about <strong>40 postgraduate (M.Tech) students</strong>. Alumni occupy prestigious positions in government, public sector undertakings, and private organizations.</p>

                                        <p>The department is supported by experienced teaching faculty and technical personnel, many of whom have received awards and recognition in their respective areas of specialization. The undergraduate course is at par with international standards and focuses on both upstream and downstream operations of the oil and gas industry, including <strong>Drilling, Production, Transportation, and Reservoir Engineering</strong>.</p>

                                        <p>A unique feature of the program is that theory classes are supplemented by compulsory practical training in the oil fields every summer, ensuring that graduates are industry-ready. Recent trends towards computer usage have also enabled simulation studies in various oil and gas operations, enhancing the learning experience and technical expertise of students.</p>
                                    </div>
                                )}
                                {department === "MANAGEMENT STUDIES" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Department of Management Studies</h3>

                                        <p>The <strong>Department of Management Studies, J.N.T.U.K Kakinada</strong> offers a <strong>Postgraduate MBA Program</strong> with options for both <strong>Single</strong> and <strong>Dual Specializations</strong>.</p>

                                        <p>Available specializations include:</p>
                                        <p><strong>International Business, Logistics & Supply Chain Management, Finance, Marketing, Human Resource Management, Business Analytics, Systems</strong></p>

                                        <p>In addition to the regular MBA program, the department offers a <strong>collaborated MBA program with Central Michigan University (CMU)</strong>. Students spend one year at the JNTUK campus in Kakinada and the following year at CMU, Michigan, USA, subject to certain conditions and eligibility criteria.</p>

                                        <p>Programs are designed to ensure that students gain exposure to both theory and practical application. Courses include <strong>lectures, case studies, entrepreneurship projects, industrial visits, and academic projects</strong>. The mix varies by specialization and program format.</p>

                                        <p>Theory is taught in the classroom by academic faculty and reinforced using the <strong>case method</strong>, concept presentations, and real-world decision-making exercises. Cases include both constraints and incomplete information to simulate realistic business scenarios.</p>
                                    </div>
                                )}

                                {department === "PHYSICS" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Department of Physics</h3>

                                        <p>The <strong>Department of Physics, UCEK, JNTUK</strong> has grown and strengthened over time, emerging with <strong>academic and research excellence</strong> since 2008. The department is currently represented by <strong>two Professors</strong> and supported by <strong>eight Adhoc Lecturer faculty members</strong>. The UG Physics Laboratories have been revamped to accommodate more than 30 students in response to increased admissions through <strong>MOUs</strong> and <strong>IIMDP Courses</strong>. The department continues to promote and upgrade academic and research standards intertwined with engineering education.</p>

                                        <p>One of the faculty members, <strong>Prof. Dr. P. Dakshina Murthy</strong>, was conferred with the <strong>AP State Best Teacher Award</strong> in 2012.</p>

                                        <p>The department has admitted <strong>three doctoral students</strong> into the <strong>Ph.D. program</strong> in fields of contemporary interest to industry. Faculty members, <strong>Prof. P. Dakshina Murthy</strong> and <strong>Prof. G. Padmaja Rani</strong>, have successfully completed DST (New Delhi, India) funded research projects totaling <strong>Rs. 72,00,000/-</strong> in the area of <strong>Liquid Crystals</strong>.</p>

                                        <p>During the year 2016-17, department faculty published <strong>8 research papers</strong> in international journals of repute. They are also involved in interdisciplinary research areas such as <strong>Synthesis of Mesogens, Theory of Diatomicscopy, Microwave Medical Diagnostics, Image Processing</strong>, and <strong>Optical Characteristic Recognition</strong>.</p>
                                    </div>
                                )}
                                {department === "LIBRARY" && (
                                    <div className="text-gray-700 leading-relaxed space-y-4">
                                        <h3 className="text-lg font-semibold">Overview of the Central Library</h3>

                                        <p>The <strong>Central Library of JNTU College of Engineering, Kakinada</strong> was established in 1946, marking the beginning of a vital academic support system that has grown alongside the institute's development. Over the decades, the library has transformed into a <strong>model academic library</strong>, playing a pivotal role in supporting the institution’s mission of <strong>teaching, research, and learning</strong>.</p>

                                        <p>Today, the library serves as the academic nerve center of the college, catering to the diverse information needs of over <strong>3000 undergraduate and postgraduate students</strong>, research scholars, and nearly <strong>100 faculty, technical, and administrative staff</strong> across <strong>9 departments</strong>. Its collection of over <strong>54,000 volumes</strong> encompasses a wide range of subjects in <strong>Engineering, Science, Technology, and Humanities</strong>, supporting the curriculum, academic development, and research activities of the institution.</p>
                                    </div>
                                )}

                                {/* Add other departments in the same format here */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
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

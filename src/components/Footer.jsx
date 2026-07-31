import {
    FaGithub,
    FaLinkedin,
    FaReact,
    FaJava
} from "react-icons/fa";
import { SiSpringboot, SiMysql } from "react-icons/si";

function Footer() {
    return (
        <footer className="bg-dark text-light mt-5 py-5">

            <div className="container text-center">

                <h4 className="fw-bold mb-2">
                    Student Management System
                </h4>

                <p className="text-secondary mb-4">
                    A Full Stack Web Application for managing students,
                    courses and users efficiently.
                </p>

                <div className="d-flex justify-content-center gap-4 mb-4 fs-4">

                    <FaReact title="React" />

                    <SiSpringboot title="Spring Boot" />

                    <FaJava title="Java" />

                    <SiMysql title="MySQL" />

                </div>

                <div className="mb-4">

                    <a
                        href="https://github.com/Krishnaaa227"
                        target="_blank"
                        rel="noreferrer"
                        className="text-light me-4 text-decoration-none"
                    >
                        <FaGithub className="me-2" />
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/krishna-sheladiya-6808733a2/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-light text-decoration-none"
                    >
                        <FaLinkedin className="me-2" />
                        LinkedIn
                    </a>

                </div>

                <hr className="border-secondary" />

                <small className="text-secondary">
                    © 2026 Krishna Sheladiya | Built with React, Spring Boot & MySQL
                </small>

            </div>

        </footer>
    );
}

export default Footer;
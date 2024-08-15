import React, { useContext } from "react";
import { CiFacebook, CiYoutube, CiLinkedin } from "react-icons/ci";
import { Context } from "../../main";
import { Link } from "react-router-dom";
function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <>
      <footer
        className={`bg-black text-white d-flex justify-items-center py-4  ${
          isAuthorized ? "footerShow" : "footerHide"
        }`}
      >
        <div>&copy; All Rights Reserved By PN-Infosys 2024.</div>
        <div>
          <Link to={"#"} target="_blank">
            <CiFacebook />
          </Link>
          <Link to={"#"} target="_blank">
            <CiYoutube />
          </Link>
          <Link to={"#"} target="_blank">
            <CiLinkedin />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;

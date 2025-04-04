import { sideBarToggle } from "@/utility";
import { useTranslations } from "next-intl";
import { FaBars } from "react-icons/fa";
import { Fragment } from "react";
import Link from "next/link";
const SideBar = () => {
  const t = useTranslations();
  return (
    <Fragment>
      {/* Form Back Drop */}
      <div className="form-back-drop" onClick={() => sideBarToggle()} />
      {/* Hidden Sidebar */}
      <section className="hidden-bar" style={{ fontFamily: "Kumbh Sans" }}>
        <div className="inner-box text-center  h-100">
          <div className="cross-icon fs-3" onClick={() => sideBarToggle()}>
            <FaBars size={24} />
            <h3 style={{ fontFamily: "Kumbh Sans" }} className="text-white mt-2">
              {t("sidebar_menu")}
            </h3>
          </div>
          {/* Navigation Links */}
          <nav className="sidebar-nav d-flex flex-column justify-content-between h-100 ">
            <ul className="sidebar-menu">
              <li
                style={{
                  borderBottom: "1px solid #5872A3",
                  borderTop: "1px solid #5872A3",
                }}
                className="p-15 text-white fs-4 "
              >
                <Link href="/solutions">{t("sidebar_solutions")}</Link>
              </li>
              <li
                style={{ borderBottom: "1px solid #5872A3" }}
                className="text-white p-15 fs-4 "
              >
                <Link href="/faqs/1">{t("sidebar_standard_forms")}</Link>
              </li>
              <li
                style={{ borderBottom: "1px solid #5872A3" }}
                className=" text-white p-15  fs-4 "
              >
                <Link href="/auth/signin">{t("sidebar_authenticate")}</Link>
              </li>
              <li
                style={{ borderBottom: "1px solid #5872A3" }}
                className=" text-white p-15 fs-4 "
              >
                <Link href="/help-desk">{t("sidebar_help_desk")}</Link>
              </li>
              <li
                style={{ borderBottom: "1px solid #5872A3" }}
                className=" text-white p-15 fs-4 "
              >
                <Link href="/contact">{t("sidebar_contact")}</Link>
              </li>
            </ul>
            <ul className="sidebar-menu">
              <li
                style={{
                  borderBottom: "1px solid #5872A3",
                  borderTop: "1px solid #5872A3",
                }}
                className=" p-15 text-white fs-4 "
              >
                <Link href="/auth/signup">{t("sidebar_sign_up")}</Link>
              </li>
            </ul>
          </nav>

          {/* <div className="title">
            <h4>{t("sidebar_title")}</h4>
          </div> */}
          {/* Appointment Form */}
          {/* <div className="appointment-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  defaultValue=""
                  placeholder={t("form_name_placeholder")}
                  required=""
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  placeholder={t("form_email_placeholder")}
                  required=""
                />
              </div>
              <div className="form-group">
                <textarea placeholder={t("form_message_placeholder")} rows={5} defaultValue={""} />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  {t("form_submit_button")}
                </button>
              </div>
            </form>
          </div> */}
          {/* Social Icons */}
          {/* <div className="social-style-one">
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p" />
            </a>
          </div> */}
        </div>
      </section>
    </Fragment>
  );
};
export default SideBar;

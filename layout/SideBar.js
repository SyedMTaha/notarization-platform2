import { sideBarToggle } from "@/utility";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import Link from "next/link";
const SideBar = () => {
  const t = useTranslations();
  return (
    <Fragment>
      {/* Form Back Drop */}
      <div className="form-back-drop" onClick={() => sideBarToggle()} />
      {/* Hidden Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon" onClick={() => sideBarToggle()}>
            <span className="fa fa-times" />
          </div>
          {/* Navigation Links */}
          <nav className="sidebar-nav">
            <ul className="sidebar-menu">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/faqs/1">How it Works</Link></li>
              <li><Link href="/auth/signup">Sign Up</Link></li>
              <li><Link href="/auth/signin">Log In</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
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

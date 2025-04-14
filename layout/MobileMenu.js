import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
const MobileMenu = ({ logo }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [multiMenu, setMultiMenu] = useState("");
  const t = useTranslations();
  const sidebarLinks = [
    { href: "/how-it-works", labelKey: "how_it_works" },
    { href: "/about", labelKey: "about" },
    { href: "/auth/signup", labelKey: "sign-up" },
    { href: "/auth/signin", labelKey: "login" },
    { href: "/contact", labelKey: "bottom" },
  ];

  return (
    <nav className="main-menu navbar-expand-lg d-block d-lg-none mobile-header">
      <Accordion>
        <div className="navbar-header">
          <div className="mobile-logo my-15">
            <Link legacyBehavior href="/">
              <a>
                <img
                  src={logo ? logo : "/assets/images/logos/logo.png"}
                  alt="Logo"
                  title="Logo"
                />
              </a>
            </Link>
          </div>
          {/* Toggle Button */}
          <Accordion.Toggle
            eventKey="nav"
            as="button"
            className="navbar-toggle"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="nav" className="navbar-collapse clearfix">
          <ul className="navigation onepage clearfix">
            <li>
              <Link href="#home">{t("navbar.home")}</Link>
            </li>
            <li className="dropdown text-nowrap">
              <Link href="/solutions">{t("navbar.solutions")}</Link>
              <ul>
                <Link href="/solutions#1">
                  <li className="dropdown">
                    {t("navbar.solutions_dropdown.1")}
                  </li>
                </Link>
                <Link href="/solutions#2">
                  <li className="dropdown">
                    {t("navbar.solutions_dropdown.2")}
                  </li>
                </Link>
                <Link href="/solutions#3">
                  <li className="dropdown">
                    {t("navbar.solutions_dropdown.3")}
                  </li>
                </Link>
                <Link href="/solutions#4">
                  <li className="dropdown">
                    {t("navbar.solutions_dropdown.4")}
                  </li>
                </Link>
              </ul>
              <div className="dropdown-btn">
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li>
              <Link className="disabled-link" href="/faqs/0">
                {t("navbar.standard")}
              </Link>
            </li>
            <li>
              <a className="disabled-link" href="#project">
                {t("navbar.authenticate")}
              </a>
            </li>
            <li>
              <Link href="/help-desk">{t("navbar.help")}</Link>
            </li>
            <ul className="d-block d-md-none">
              {sidebarLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{t(`sidebar.${link.labelKey}`)}</Link>
                </li>
              ))}
            </ul>
          </ul>
        </Accordion.Collapse>
      </Accordion>
    </nav>
  );
};
export default MobileMenu;

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
const MobileMenu = ({ logo }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [multiMenu, setMultiMenu] = useState("");
  const t = useTranslations();

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
          <ul className="navigation clearfix">
            <li className="dropdown">
              <Link href="/">{t("default_header_home")} </Link>
            </li>
            <li className="dropdown">
              <Link href="/solutions">{t("default_header_services")}</Link>
            </li>
            <li className="dropdown">
              <Link href="/standard-forms">{t("default_header_project")}</Link>
            </li>
            <li className="dropdown">
              <Link href="/authenticate">{t("default_header_pages")}</Link>
            </li>
            <li>
              <Link href="/contact">
                {t("default_header_contact")}
              </Link>
            </li>
          </ul>
        </Accordion.Collapse>
      </Accordion>
    </nav>
  );
};
export default MobileMenu;

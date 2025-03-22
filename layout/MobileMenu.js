import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
const MobileMenu = ({ logo }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [multiMenu, setMultiMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  const multiMenuSet = (value) =>
      setMultiMenu(multiMenu === value ? "" : value),
    multiMenuActiveLi = (value) =>
      value === multiMenu ? { display: "block" } : { display: "none" };
  return (
    <nav className="main-menu navbar-expand-lg d-block d-lg-none mobile-header">
      <Accordion>
        <div className="navbar-header">
          <div className="mobile-logo my-15">
            <Link legacyBehavior href="/">
              <a>
                <img
                  src={logo ? logo : "assets/images/logos/logo.png"}
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
              <a href="#">Home</a>
              <ul style={activeLi("home")}>
                <li className="dropdown">
                  <a href="#">MultiPage</a>
                  <ul style={multiMenuActiveLi("multiPage")}>
                    <li>
                      <Link legacyBehavior href="/">
                        Web Design
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index1dark">
                        Web Design Dark
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index2">
                        Front End Services
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index2dark">
                        Front End Dark
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index3">
                        Website Builder
                      </Link>
                    </li>
                  </ul>
                  <div
                    className="dropdown-btn"
                    onClick={() => multiMenuSet("multiPage")}
                  >
                    <span className="fas fa-chevron-down" />
                  </div>
                </li>
                <li className="dropdown">
                  <a href="#">OnePage</a>
                  <ul style={multiMenuActiveLi("onePage")}>
                    <li>
                      <Link legacyBehavior href="/index1-onepage">
                        Web Design
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index1dark-onepage">
                        Web Design Dark
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index2-onepage">
                        Front End Services
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index2dark-onepage">
                        Front End Dark
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/index3-onepage">
                        Website Builder
                      </Link>
                    </li>
                  </ul>
                  <div
                    className="dropdown-btn"
                    onClick={() => multiMenuSet("onePage")}
                  >
                    <span className="fas fa-chevron-down" />
                  </div>
                </li>
              </ul>
              <div
                className="dropdown-btn"
                onClick={() => activeMenuSet("home")}
              >
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li className="dropdown">
              <a href="#">services</a>
              <ul style={activeLi("services")}>
                <li>
                  <Link legacyBehavior href="/services">
                    Popular Services
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/service-details">
                    service details
                  </Link>
                </li>
              </ul>
              <div
                className="dropdown-btn"
                onClick={() => activeMenuSet("services")}
              >
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li className="dropdown">
              <a href="#">Project</a>
              <ul style={activeLi("Project")}>
                <li>
                  <Link legacyBehavior href="/projects">
                    Project Grid
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/project-creative">
                    Project Creative
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/project-carousel">
                    Project Carousel
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/project-details">
                    Project Details
                  </Link>
                </li>
              </ul>
              <div
                className="dropdown-btn"
                onClick={() => activeMenuSet("Project")}
              >
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li className="dropdown">
              <a href="#">pages</a>
              <ul style={activeLi("pages")}>
                <li>
                  <Link legacyBehavior href="/about">
                    About us
                  </Link>
                </li>
                <li className="dropdown">
                  <a href="#">Team</a>
                  <ul style={multiMenuActiveLi("team")}>
                    <li>
                      <Link legacyBehavior href="/team">
                        Expert Team
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/team-profile">
                        Team Profile
                      </Link>
                    </li>
                  </ul>
                  <div
                    className="dropdown-btn"
                    onClick={() => multiMenuSet("team")}
                  >
                    <span className="fas fa-chevron-down" />
                  </div>
                </li>
                <li>
                  <Link legacyBehavior href="/pricing">
                    pricing plan
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/faqs">
                    faqs &amp; helf
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/404">
                    404 error
                  </Link>
                </li>
              </ul>
              <div
                className="dropdown-btn"
                onClick={() => activeMenuSet("pages")}
              >
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li className="dropdown">
              <a href="#">shop</a>
              <ul style={activeLi("shop")}>
                <li>
                  <Link legacyBehavior href="/shop">
                    shop Grid
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/product-details">
                    Product details
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/cart">
                    cart page
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/checkout">
                    checkout
                  </Link>
                </li>
              </ul>
              <div
                className="dropdown-btn"
                onClick={() => activeMenuSet("shop")}
              >
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li className="dropdown">
              <a href="#">blog</a>
              <ul style={activeLi("blog")}>
                <li>
                  <Link legacyBehavior href="/blog">
                    blog Grid
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/blog-list">
                    blog list
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/blog-details">
                    blog details
                  </Link>
                </li>
              </ul>
              <div
                className="dropdown-btn"
                onClick={() => activeMenuSet("blog")}
              >
                <span className="fas fa-chevron-down" />
              </div>
            </li>
            <li>
              <Link legacyBehavior href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </Accordion.Collapse>
      </Accordion>
    </nav>
  );
};
export default MobileMenu;

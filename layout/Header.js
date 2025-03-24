import { sideBarToggle } from "@/utility";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useTranslations } from "next-intl";

const Header = ({ header }) => {
  switch (header) {
    case 1:
      return <Header1 />;
    case 2:
      return <Header2 />;
    default:
      return <DefaultHeader />;
  }
};
export default Header;

const Header1 = () => {
  return (
    <header className="main-header header-two">
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src="/assets/images/logos/logo-white.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              <MobileMenu logo={"/assets/images/logos/logo-white.png"} />
              {/* Main Menu */}
              <nav className="main-menu d-none d-lg-block navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo my-15">
                    <Link legacyBehavior href="/">
                      <a>
                        <img
                          src="/assets/images/logos/logo-white.png"
                          alt="Logo"
                          title="Logo"
                        />
                      </a>
                    </Link>
                  </div>
                  {/* Toggle Button */}
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                  >
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="navbar-collapse collapse clearfix">
                  <Menu />
                </div>
              </nav>
              {/* Main Menu End*/}
            </div>
            {/* Nav Search */}
            <div className="nav-search py-15">
              <button className="far fa-search" />
              <form
                onSubmit={(e) => e.preventDefault()}
                action="#"
                className="hide"
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="searchbox"
                  required=""
                />
                <button type="submit" className="searchbutton far fa-search" />
              </form>
            </div>
            {/* Menu Button */}
            <div className="menu-btns">
              <Link legacyBehavior href="/contact">
                <a className="theme-btn style-three">
                  Get a Quote <i className="fas fa-angle-double-right" />
                </a>
              </Link>
              {/* menu sidbar */}
              <div className="menu-sidebar d-none d-lg-block">
                <button onClick={() => sideBarToggle()}>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const Header2 = () => {
  return (
    <header className="main-header">
      <div className="header-top-wrap bgc-secondary text-white py-5">
        <div className="container">
          <div className="header-top">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="top-left text-center text-lg-start">
                  <ul>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <a href="#">Faqs</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="top-right text-center text-lg-end">
                  <ul>
                    <li>
                      <i className="far fa-envelope" />{" "}
                      <a href="mailto:support@gmail.com">support@gmail.com</a>
                    </li>
                    <li>
                      <i className="far fa-phone" />{" "}
                      <a href="callto:+000(123)45699">+000 (123) 456 99</a>
                    </li>
                    <li>
                      <select className="select" name="language" id="language">
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Arabic">Arabic</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      alt="Logo"
                      title="Logo"
                      className="logo dark-logo"
                    />
                    <img
                      className="light-logo logo"
                      src="/assets/images/logos/logo-white.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              <MobileMenu />
              {/* Main Menu */}
              <nav className="main-menu d-none d-lg-block navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo my-15">
                    <Link legacyBehavior href="/">
                      <a>
                        <img
                          src="/assets/images/logos/logo.png"
                          alt="Logo"
                          title="Logo"
                        />
                      </a>
                    </Link>
                  </div>
                  {/* Toggle Button */}
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                  >
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="navbar-collapse collapse clearfix">
                  <Menu />
                </div>
              </nav>
              {/* Main Menu End*/}
            </div>
            {/* Nav Search */}
            <div className="nav-search py-15">
              <button className="far fa-search" />
              <form
                onSubmit={(e) => e.preventDefault()}
                action="#"
                className="hide"
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="searchbox"
                  required=""
                />
                <button type="submit" className="searchbutton far fa-search" />
              </form>
            </div>
            {/* Menu Button */}
            <div className="menu-btns">
              <Link legacyBehavior href="/contact">
                <a className="theme-btn">
                  Download Now <i className="fas fa-angle-double-right" />
                </a>
              </Link>
              {/* menu sidbar */}
              <div className="menu-sidebar d-none d-lg-block">
                <button onClick={() => sideBarToggle()}>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const DefaultHeader = () => {
  const t = useTranslations();

  return (
    <header className="main-header header-three menu-absolute">
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container-fluid clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              <MobileMenu />
              {/* Main Menu */}
              <nav className="main-menu d-none d-lg-block navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo my-15">
                    <Link legacyBehavior href="/">
                      <a>
                        <img
                          src="/assets/images/logos/logo.png"
                          alt="Logo"
                          title="Logo"
                        />
                      </a>
                    </Link>
                  </div>
                  {/* Toggle Button */}
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                  >
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="navbar-collapse collapse clearfix">
                  <Menu />
                </div>
              </nav>
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-btns">
              <Link legacyBehavior href="/contact">
                <a className="login">{t("default_header_login")}</a>
              </Link>
              <Link legacyBehavior href="/contact">
                <a className="theme-btn">
                  {t("default_header_signup")}
                  <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const Menu = () => {
  const t = useTranslations();
  return (
    <ul className="navigation clearfix">
      <li className="dropdown">
        <a href="#">{t("default_header_home")}</a>
        <ul>
          <li className="dropdown">
            <a href="#">{t("default_header_multipage")}</a>
            <ul>
              <li>
                <Link legacyBehavior href="/">
                  {t("default_header_web_design")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index1dark">
                  {t("default_header_web_design_dark")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index2">
                  {t("default_header_front_end_services")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index2dark">
                  {t("default_header_front_end_dark")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index3">
                  {t("default_header_website_builder")}
                </Link>
              </li>
            </ul>
            <div className="dropdown-btn">
              <span className="fas fa-chevron-down" />
            </div>
          </li>
          <li className="dropdown">
            <a href="#">{t("default_header_onepage")}</a>
            <ul>
              <li>
                <Link legacyBehavior href="/index1-onepage">
                  {t("default_header_web_design")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index1dark-onepage">
                  {t("default_header_web_design_dark")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index2-onepage">
                  {t("default_header_front_end_services")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index2dark-onepage">
                  {t("default_header_front_end_dark")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index3-onepage">
                  {t("default_header_website_builder")}
                </Link>
              </li>
            </ul>
            <div className="dropdown-btn">
              <span className="fas fa-chevron-down" />
            </div>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <li className="dropdown">
        <a href="#">{t("default_header_services")}</a>
        <ul>
          <li>
            <Link legacyBehavior href="/services">
              {t("default_header_popular_services")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/service-details">
              {t("default_header_service_details")}
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <li className="dropdown">
        <a href="#">{t("default_header_project")}</a>
        <ul>
          <li>
            <Link legacyBehavior href="/projects">
              {t("default_header_project_grid")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/project-creative">
              {t("default_header_project_creative")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/project-carousel">
              {t("default_header_project_carousel")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/project-details">
              {t("default_header_project_details")}
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <li className="dropdown">
        <a href="#">{t("default_header_pages")}</a>
        <ul>
          <li>
            <Link legacyBehavior href="/about">
              {t("default_header_about_us")}
            </Link>
          </li>
          <li className="dropdown">
            <a href="#">{t("default_header_team")}</a>
            <ul>
              <li>
                <Link legacyBehavior href="/team">
                  {t("default_header_expert_team")}
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/team-profile">
                  {t("default_header_team_profile")}
                </Link>
              </li>
            </ul>
            <div className="dropdown-btn">
              <span className="fas fa-chevron-down" />
            </div>
          </li>
          <li>
            <Link legacyBehavior href="/pricing">
              {t("default_header_pricing_plan")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/faqs">
              {t("default_header_faqs_help")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/404">
              {t("default_header_404_error")}
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <li className="dropdown">
        <a href="#">{t("default_header_shop")}</a>
        <ul>
          <li>
            <Link legacyBehavior href="/shop">
              {t("default_header_shop_grid")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/product-details">
              {t("default_header_product_details")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/cart">
              {t("default_header_cart_page")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/checkout">
              {t("default_header_checkout")}
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <li className="dropdown">
        <a href="#">{t("default_header_blog")}</a>
        <ul>
          <li>
            <Link legacyBehavior href="/blog">
              {t("default_header_blog_grid")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/blog-list">
              {t("default_header_blog_list")}
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/blog-details">
              {t("default_header_blog_details")}
            </Link>
          </li>
        </ul>
        <div className="dropdown-btn">
          <span className="fas fa-chevron-down" />
        </div>
      </li>
      <li>
        <Link legacyBehavior href="/contact">
          {t("default_header_contact")}
        </Link>
      </li>
    </ul>
  );
};

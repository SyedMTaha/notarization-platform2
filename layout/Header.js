import { sideBarToggle } from "@/utility";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LangSwitcher from "@/components/LangSwitch";
import { usePathname } from "next/navigation";
import { Accordion } from "react-bootstrap";


const Header_Temp=({header, locale})=>
{
  const t = useTranslations();
  console.log(locale);
  return(
    <>
      <Header_Main locale={locale} header={header}/>
    </>

  )
}

export default Header_Temp;


const Header_Main = ({header, locale}) => {
  const pathname = usePathname();
  const t = useTranslations();
  const hasRouteAfterLocale = header ? false : true;
  return (
    <>


              <header className={`main-header ${hasRouteAfterLocale ? 'header-three default' : 'header-two-home other'}`}>
              <div className="header-upper">
              <div className="container clearfix">
                <div className="header-inner rel d-flex align-items-center justify-content-between">
                  <div className="header-left">
                    <div className="logo">
                      {/* <Link legacyBehavior href="/">
                        <a>
                          <img
                            src={hasRouteAfterLocale ? "/assets/images/logos/logo.png" : "/assets/images/logos/logo-white.png"}
                            alt={t("logo_alt")}
                            title={t("logo_title")}
                          />
                        </a>
                      </Link> */}
                        <Link href="/" legacyBehavior>
                        <a className={`logo-container ${hasRouteAfterLocale ? 'default' : 'other'}`}></a>
                        </Link>
                    </div>
                  </div>
                  <div>
                    <nav className="main-menu navbar-expand-lg py-15" style={{display:"flex", alignContent:"center", justifyContent:"space-between"}}>
                      
                      {hasRouteAfterLocale && <LangSwitcher
                          locale={locale}
                          icon={"/assets/images/lang.png"}
                          type={hasRouteAfterLocale ? "dark" : undefined}
                        />}
                      <div style={{marginTop:"0.5rem"}}>
                        <Accordion>
                          <div className="navbar-header">
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
                          <Accordion.Collapse
                            eventKey="nav"
                            className="navbar-collapse clearfix"
                          >
                            <ul className="navigation onepage clearfix ">
                              <li>
                                <Link href="/">{t("navbar.home")}</Link>
                              </li>
                              <li>
                                <Link href="/about">{t("navbar.about")}</Link>
                              </li>
                              <li>
                                <Link href="/faqs/0">{t("navbar.standard")}</Link>
                              </li>
                              <li>
                                <a href="#project">{t("navbar.authenticate")}</a>
                              </li>
                              <li>
                                <Link href="/help-desk">{t("navbar.help")}</Link>
                              </li>
                              <li>
                                <a href="#contact">{t("navbar.contact")}</a>
                              </li>
                            </ul>
                          </Accordion.Collapse>
                        </Accordion>
                      </div>
                    </nav>
                  </div>

                  <div className="menu-btns">
                    <Link legacyBehavior href="/contact">
                      <a className="theme-btn style-three rounded-pill">
                        {t("navbar.login")}{" "}
                        <i className="fas fa-angle-double-right" />
                      </a>
                    </Link>
                    <LangSwitcher
                      locale={locale}
                      icon={"/assets/images/lang.png"}
                      type={hasRouteAfterLocale ? "dark" : undefined}
                    />
                    <div className="menu-sidebar d-none d-md-block">
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
          </header>
    </>
  )
}

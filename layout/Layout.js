"use client";
import { animation, stickyNav } from "@/utility";
import { Fragment, useEffect } from "react";
import niceSelect from "react-nice-select";
import { usePathname } from "next/navigation";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import CallToAction from "../components/CallToAction";
import ImageView from "../components/ImageView";
import VideoPopup from "../components/VideoPopup";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTop from "./ScrollTop";
import SideBar from "./SideBar";
import { Accordion } from "react-bootstrap";
import Link from "next/link";
import LangSwitcher from "@/components/LangSwitch";
import Header_Temp from "./Header";

const Layout = ({ children, header, className, footer, noHeader }) => {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = pathname.split("/")[1]; // Extract locale from the URL
  const messages = useMessages(); // Auto-fetch messages
  



  useEffect(() => {
    animation();
    document.querySelector("body").className = className ? className : "oxence_body";
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickyNav);
  }, []);

  useEffect(() => {
    return () => {
      niceSelect({ withoutwide: true });
    };
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Fragment>
        <VideoPopup />
        <ImageView />
        <div className="page-wrapper">
          {!noHeader && <Header header={header} locale={locale} />}
          {/* {(pathname==='/en' || pathname==='/es') &&
          (
            <header className="main-header header-two">
            
            <div className="header-upper">
              <div className="container clearfix">
                <div className="header-inner rel d-flex align-items-center">
                  <div className="logo-outer">
                    <div className="logo">
                      <Link legacyBehavior href="/">
                        <a>
                          <img
                            src="/assets/images/logos/logo-white.png"
                            alt={t("logo_alt")}
                            title={t("logo_title")}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="nav-outer clearfix">

                  <nav className="main-menu navbar-expand-lg">
                      <Accordion>
                        <div className="navbar-header">
                          <div className="mobile-logo my-15">
                            <Link legacyBehavior href="/">
                              <a>
                                <img
                                  src="/assets/images/logos/logo-white.png"
                                  alt={t("navbar.mobile_logo_alt")}
                                  title={t("logo_title")}
                                />
                              </a>
                            </Link>
                          </div>

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
                          <ul className="navigation onepage clearfix">
                            <li>
                              <Link href="#home">{t("navbar.home")}</Link>
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
                    </nav>

                    </div>

                    <div className="nav-search py-15">
                    <button className="far fa-search" />
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      action="#"
                      className="hide"
                    >
                      <input
                        type="text"
                        placeholder={t("navbar.search_placeholder")}
                        className="searchbox"
                        required=""
                      />
                      <button
                        type="submit"
                        className="searchbutton far fa-search"
                      />
                    </form>
                  </div>

                  <div className="menu-btns">
                    <Link legacyBehavior href="/contact">
                      <a className="theme-btn style-three">
                        {t("navbar.login")}{" "}
                        <i className="fas fa-angle-double-right" />
                      </a>
                    </Link>
                    <LangSwitcher
                      locale={locale}
                      icon={"/assets/images/lang.png"}
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
          ) } */}
          
          <SideBar />
          {children}
          {!footer && <CallToAction />}
          <Footer footer={footer} />
          <ScrollTop />
        </div>
      </Fragment>
    </NextIntlClientProvider>
  );
};

export default Layout;

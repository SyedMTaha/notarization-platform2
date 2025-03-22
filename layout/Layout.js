"use client";
import { animation, stickyNav } from "@/utility";
import { Fragment, useEffect } from "react";
import niceSelect from "react-nice-select";
import CallToAction from "../components/CallToAction";
import ImageView from "../components/ImageView";
import VideoPopup from "../components/VideoPopup";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTop from "./ScrollTop";
import SideBar from "./SideBar";

const Layout = ({ children, header, className, footer, noHeader }) => {
  useEffect(() => {
    animation();
    document.querySelector("body").className = className
      ? className
      : "oxence_body";
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
    <Fragment>
      <VideoPopup />
      <ImageView />
      <div className="page-wrapper">
        {!noHeader && <Header header={header} />}
        <SideBar />
        {children}
        {!footer && <CallToAction />}
        <Footer footer={footer} />
        <ScrollTop />
      </div>
    </Fragment>
  );
};
export default Layout;

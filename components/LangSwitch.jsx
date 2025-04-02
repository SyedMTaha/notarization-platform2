import { useState, useEffect } from "react";

const LangSwitcher = ({ locale, type }) => {
  const [padding, setPadding] = useState("0rem 30px 0 30px");
    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1250) {
          setPadding("0 30px 0 30px");
        } else if (windowWidth > 500) {
          setPadding("0 20px 0 20px");
        } else {
          setPadding("0 15px 0 0");
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  const icon =
    type === "dark"
      ? "/assets/images/lang-dark.png"
      : "/assets/images/lang-light.png";
  return (
    <button
      onClick={() => {
        const newLocale = locale === "en" ? "es" : "en";
        window.location.pathname = `/${newLocale}${window.location.pathname.substring(
          3
        )}`;
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(0,0,0,0)",
        margin: padding,
        width: "40px",
        borderRadius: "50%",
      }}
    >
      <img
        src={icon}
        alt="Language Icon"
        style={{ width: "40px", height: "auto" }}
      />
      <span
        style={
          type === "dark"
            ? { color: "black", fontSize: "12px", marginTop: "4px" }
            : { color: "white", fontSize: "12px", marginTop: "4px" }
        }
      >
        {locale === "en" ? "ENG" : "SPA"}
      </span>
    </button>
  );
};

export default LangSwitcher;

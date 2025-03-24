// Simple language switcher

const LangSwitcher = ({ locale, icon }) => {
  return (
    <button
      onClick={() => {
        const newLocale = locale === "en" ? "es" : "en";
        window.location.pathname = `/${newLocale}${window.location.pathname.substring(3)}`;
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(0,0,0,0)", margin: "auto", width: "45px" }}
    >
      <img src={icon} alt="Language Icon" style={{ width: "40px", height: "auto" }} />
      <span style={{ color: "white", fontSize: "12px", marginTop: "4px" }}>{locale === "en" ? "ENG" : "SPA"}</span>
    </button>
  );
};

export default LangSwitcher;
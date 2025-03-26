// Simple language switcher

const LangSwitcher = ({ locale, icon, type }) => {
  return (
    <button
      onClick={() => {
        const newLocale = locale === "en" ? "es" : "en";
        window.location.pathname = `/${newLocale}${window.location.pathname.substring(3)}`;
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(0,0,0,0)",
        margin: "0px 20px",
        width: "45px",
        borderRadius: "50%",
        padding: "5px",
      }}
    >
      {/* Dark spot background */}
      {type === "dark" && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            borderRadius: "50%",
            filter: "blur(27px)",
            zIndex: -1,
          }}
        />
      )}

      <img src={icon} alt="Language Icon" style={{ width: "40px", height: "auto" }} />
      <span style={{ color: "white", fontSize: "12px", marginTop: "4px" }}>
        {locale === "en" ? "ENG" : "SPA"}
      </span>
    </button>
  );
};


export default LangSwitcher;
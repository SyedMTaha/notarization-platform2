// Simple language switcher

const LangSwitcher = ({ locale, type }) => {
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
        margin: "0px 20px",
        width: "45px",
        borderRadius: "50%",
        padding: "5px",
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

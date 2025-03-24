import { useTranslations } from "next-intl";
import Link from "next/link";
import Slider from "react-slick";

const Hero1 = () => {
  const props = {
    infinite: true,
    arrows: false,
    dots: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    slidesToScroll: 1,
    slidesToShow: 1,
  };
  const t = useTranslations();
  return (
    <section
      id="home"
      className="main-slider-area bgc-black-with-lighting rel z-1"
    >
      <Slider {...props} className="main-slider-active">
        {/* <div className="slider-item">
          <div className="container">
            <div className="slider-content">
              <span className="sub-title">
                25 Years of Experience in web design solutions
              </span>
              <h1>Digital web design solutions agency</h1>
              <div className="slider-btns">
                <Link legacyBehavior href="/contact">
                  <a className="theme-btn">
                    Get Started Us <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
                <Link legacyBehavior href="/services">
                  <a className="theme-btn style-three">
                    Explore Services <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="slider-video"
            style={{
              backgroundImage: "url(/assets/images/slider/slide1.jpg)",
            }}
          >
            <a
              href="https://www.youtube.com/watch?v=9Y7ma241N8k"
              className="mfp-iframe video-play"
            >
              <i className="fas fa-play" />
            </a>
            <span className="video-title cd-headline clip">
              <span className="cd-words-wrapper">
                <b className="is-visible">Web Design</b>
                <b>Development</b>
              </span>
            </span>
          </div>
        </div> */}
        <div className="slider-item">
          <div className="container">
            <div className="slider-content">
              <span className="sub-title">{t("slider_sub_title")}</span>
              <h1>
                {t("slider_main_title")}{" "}
                <span style={{ color: "#416976" }}>
                  {t("slider_main_title_highlight") + " "}
                </span>
                <span className="text-nowrap">
                  {t("slider_main_title_suffix")}
                </span>
              </h1>
              <div className="slider-btns">
                <Link legacyBehavior href="/contact">
                  <a className="theme-btn">
                    {t("slider_btn_get_started")}{" "}
                    <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
                <Link legacyBehavior href="/services">
                  <a className="theme-btn style-three">
                    {t("slider_btn_explore_services")}{" "}
                    <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="slider-video"
            style={{
              backgroundImage: "url(/assets/images/slider/slide2.jpg)",
            }}
          >
            <a
              href="https://www.youtube.com/watch?v=9Y7ma241N8k"
              className="mfp-iframe video-play"
            >
              <i className="fas fa-play" />
            </a>
            <span className="video-title cd-headline clip">
              <span className="cd-words-wrapper">
                <b className="is-visible">{t("slider_video_title_1")}</b>
                <b>{t("slider_video_title_2")}</b>
              </span>
            </span>
          </div>
        </div>

        {/* <div className="slider-item">
          <div className="container">
            <div className="slider-content">
              <span className="sub-title">
                25 Years of Experience in web design solutions
              </span>
              <h1>Digital web design solutions agency</h1>
              <div className="slider-btns">
                <Link legacyBehavior href="/contact">
                  <a className="theme-btn">
                    Get Started Us <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
                <Link legacyBehavior href="/services">
                  <a className="theme-btn style-three">
                    Explore Services <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="slider-video"
            style={{
              backgroundImage: "url(/assets/images/slider/slide1.jpg)",
            }}
          >
            <a
              href="https://www.youtube.com/watch?v=9Y7ma241N8k"
              className="mfp-iframe video-play"
            >
              <i className="fas fa-play" />
            </a>
            <span className="video-title cd-headline clip">
              <span className="cd-words-wrapper">
                <b className="is-visible">Web Design</b>
                <b>Development</b>
              </span>
            </span>
          </div>
        </div> */}
      </Slider>
      <div className="container">
        <div className="main-slider-dots" />
      </div>
      <div className="slider-shapes">
        <img
          className="shape dots one"
          src="/assets/images/shapes/slider-dots.png"
          alt="Shape"
        />
        <img
          className="shape dots two"
          src="/assets/images/shapes/slider-dots.png"
          alt="Shape"
        />
        <img
          className="shape wave-line"
          src="/assets/images/shapes/slider-wave-line.png"
          alt="Shape"
        />
        <img
          className="shape circle"
          src="/assets/images/shapes/slider-circle.png"
          alt="Shape"
        />
      </div>
    </section>
  );
};
export default Hero1;

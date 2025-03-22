import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="call-to-action-area bgc-black pt-80 pb-50">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-7 col-lg-9">
            <div className="section-title text-white mb-25 wow fadeInUp delay-0-2s">
              <h2>Let’s Design Your New Website</h2>
              <p>
                Do you want to have a website that stands out and impresses your
                clients? Then we are ready to help! Click the button below to
                contact us and discuss your ideas.
              </p>
            </div>
          </div>
          <div className="col-lg-3 text-lg-end">
            <Link legacyBehavior href="/contact">
              <a className="theme-btn style-two mb-30 wow fadeInUp delay-0-4s">
                Let’s Get Started <i className="fas fa-angle-double-right" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;

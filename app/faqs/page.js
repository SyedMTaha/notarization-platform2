"use client";
import OxencyAccordion from "@/components/OxencyAccordion";
import Layout from "@/layout/Layout";
import PageBanner from "@/layout/PageBanner";
import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";

const faqsData1 = [
  {
    title: "Will you  provide website layout about design ?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
  {
    title: "How much does cost to design website ?",
    dec: "Fortunately, we aren’t just designers and developers here we are writer strategists, techs and creatives working towards the same end goal our client’s success. As a full-service digital marketing agency",
  },
  {
    title: "How many revisions can i make the  design ?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
  {
    title: "Can i uplode this  design in my personal work?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
];
const faqsData2 = [
  {
    title: "How long will delivery take ?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
  {
    title: "Do you have discounts for returning customers ?",
    dec: "Fortunately, we aren’t just designers and developers here we are writer strategists, techs and creatives working towards the same end goal our client’s success. As a full-service digital marketing agency",
  },
  {
    title: "Will you  provide website layout about design ?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
  {
    title: "What payment methods do you accept ?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
  {
    title: "How do your referral program work ?",
    dec: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaquey quae abillo inventore",
  },
];

const Faq = () => {
  const [active, setActive] = useState(`a0`);
  const onClick = (value) => {
    setActive(value === active ? "" : value);
  };
  return (
    <Layout>
      <PageBanner
        titleHtml={`Faq & <span>Help</span>`}
        titleText="Faq & Help"
      />
      <section className="faq-page-about-area pt-130">
        <div className="container">
          <div className="row large-gap justify-content-center align-items-center pb-115">
            <div className="col-xl-5 col-lg-6">
              <div className="faq-page-content rmb-65 wow fadeInRight delay-0-2s">
                <div className="section-title mb-25">
                  <span className="sub-title style-two mb-15">
                    Finding Help
                  </span>
                  <h2>How Can We Help</h2>
                </div>
                <p>
                  Start building your first prototype in no time. Ogency
                  intuitive drag &amp; drop interface gives you all the building
                  blocks that you need to get started! No skills required.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  action="#"
                  className="faq-search-form mt-40 mb-20"
                >
                  <label htmlFor="search">
                    <i className="far fa-search" />
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Find your category"
                    required=""
                  />
                  <button type="submit">
                    <i className="fas fa-chevron-right" />
                  </button>
                </form>
                <p>
                  <b>Suggestions:</b> Dashboard, Payments, Refunds, Delivery
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-page-image wow fadeInLeft delay-0-2s">
                <img src="assets/images/faqs/faq-page.jpg" alt="FAQs" />
              </div>
            </div>
          </div>
          <hr />
        </div>
      </section>
      {/* FAQ Page About Area end */}
      {/* Services Area start */}
      <section className="services-area-five pt-115 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title style-two mb-20">What We Offer</span>
                <h2>Choose Your Topic</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="service-item-five wow fadeInUp delay-0-2s">
                <div className="icon">
                  <img src="assets/images/services/icon1.png" alt="Icon" />
                </div>
                <h4>Managing Account</h4>
                <p>
                  Start building your first prototypeno time Ogency intuitive,
                  drag drop interface gives building blocks that you needs
                </p>
                <Link legacyBehavior href="/service-details">
                  <a className="theme-btn style-three">
                    Learn More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-item-five wow fadeInUp delay-0-4s">
                <div className="icon">
                  <img src="assets/images/services/icon2.png" alt="Icon" />
                </div>
                <h4>Business Develop</h4>
                <p>
                  Start building your first prototypeno time Ogency intuitive,
                  drag drop interface gives building blocks that you needs
                </p>
                <Link legacyBehavior href="/service-details">
                  <a className="theme-btn style-three">
                    Learn More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-item-five wow fadeInUp delay-0-6s">
                <div className="icon">
                  <img src="assets/images/services/icon3.png" alt="Icon" />
                </div>
                <h4>Refund Policy</h4>
                <p>
                  Start building your first prototypeno time Ogency intuitive,
                  drag drop interface gives building blocks that you needs
                </p>
                <Link legacyBehavior href="/service-details">
                  <a className="theme-btn style-three">
                    Learn More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-item-five wow fadeInUp delay-0-2s">
                <div className="icon">
                  <img src="assets/images/services/icon4.png" alt="Icon" />
                </div>
                <h4>Payment Options</h4>
                <p>
                  Start building your first prototypeno time Ogency intuitive,
                  drag drop interface gives building blocks that you needs
                </p>
                <Link legacyBehavior href="/service-details">
                  <a className="theme-btn style-three">
                    Learn More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-item-five wow fadeInUp delay-0-4s">
                <div className="icon">
                  <img src="assets/images/services/icon5.png" alt="Icon" />
                </div>
                <h4>Delivery Information</h4>
                <p>
                  Start building your first prototypeno time Ogency intuitive,
                  drag drop interface gives building blocks that you needs
                </p>
                <Link legacyBehavior href="/service-details">
                  <a className="theme-btn style-three">
                    Learn More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="service-item-five wow fadeInUp delay-0-6s">
                <div className="icon">
                  <img src="assets/images/services/icon6.png" alt="Icon" />
                </div>
                <h4>Affiliate Program</h4>
                <p>
                  Start building your first prototypeno time Ogency intuitive,
                  drag drop interface gives building blocks that you needs
                </p>
                <Link legacyBehavior href="/service-details">
                  <a className="theme-btn style-three">
                    Learn More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Area end */}
      {/* FAQs Page Area start */}
      <section className="faqs-area-area bgc-lighter py-130 rel z-1">
        <div className="container">
          <div className="row justify-content-between align-items-end pb-5">
            <div className="col-xl-6 col-lg-8 wow fadeInUp delay-0-2s">
              <div className="section-title mb-35">
                <span className="sub-title style-two mb-15">Faqs</span>
                <h2>Asked Questions about Website Design</h2>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end wow fadeInUp delay-0-4s">
              <Link legacyBehavior href="/contact">
                <a className="theme-btn style-three mb-55">
                  Add Questions <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            </div>
          </div>
          <Accordion
            defaultActiveKey="a0"
            className="accordion style-two"
            id="faq-accordion"
          >
            <div className="row">
              <div className="col-lg-6 rmb-20 wow fadeInUp delay-0-2s">
                {faqsData1.map((data, i) => (
                  <OxencyAccordion
                    key={i}
                    dec={data.dec}
                    onClick={() => onClick(`a${i}`)}
                    active={active}
                    event={`a${i}`}
                    title={data.title}
                  />
                ))}
              </div>
              <div className="col-lg-6 wow fadeInUp delay-0-4s">
                {faqsData2.map((data, i) => (
                  <OxencyAccordion
                    key={i}
                    dec={data.dec}
                    onClick={() => onClick(`b${i}`)}
                    active={active}
                    event={`b${i}`}
                    title={data.title}
                  />
                ))}
              </div>
            </div>
          </Accordion>
        </div>
      </section>
      {/* FAQs Page Area end */}
    </Layout>
  );
};
export default Faq;

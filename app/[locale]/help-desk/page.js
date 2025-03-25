"use client";
import OxencyAccordion from "@/components/OxencyAccordion";
import Layout from "@/layout/Layout";
import PageBanner from "@/layout/PageBanner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
export const faqsData1 = [
  {
    title: "faqsData1title1",
    dec: "faqsData1dec1",
  },
  {
    title: "faqsData1title2",
    dec: "faqsData1dec2",
  },
  {
    title: "faqsData1title3",
    dec: "faqsData1dec3",
  },
  {
    title: "faqsData1title4",
    dec: "faqsData1dec4",
  },
];

export const faqsData2 = [
  {
    title: "faqsData2title1",
    dec: "faqsData2dec1",
  },
  {
    title: "faqsData2title2",
    dec: "faqsData2dec2",
  },
  {
    title: "faqsData2title3",
    dec: "faqsData2dec3",
  },
  {
    title: "faqsData2title4",
    dec: "faqsData2dec4",
  },
  {
    title: "faqsData2title5",
    dec: "faqsData2dec5",
  },
];

const services = [
  {
    id: 1,
    icon: "/assets/images/services/icon1.png",
    title: "Managing Account",
    description:
      "Start building your first prototype in no time with Ogency's intuitive, drag & drop interface that gives you the building blocks you need.",
    animationDelay: "0.2s",
  },
  {
    id: 2,
    icon: "/assets/images/services/icon2.png",
    title: "Business Develop",
    description:
      "Start building your first prototype in no time with Ogency's intuitive, drag & drop interface that gives you the building blocks you need.",
    animationDelay: "0.4s",
  },
  {
    id: 3,
    icon: "/assets/images/services/icon3.png",
    title: "Refund Policy",
    description:
      "Start building your first prototype in no time with Ogency's intuitive, drag & drop interface that gives you the building blocks you need.",
    animationDelay: "0.6s",
  },
  {
    id: 4,
    icon: "/assets/images/services/icon4.png",
    title: "Payment Options",
    description:
      "Start building your first prototype in no time with Ogency's intuitive, drag & drop interface that gives you the building blocks you need.",
    animationDelay: "0.2s",
  },
  {
    id: 5,
    icon: "/assets/images/services/icon5.png",
    title: "Delivery Information",
    description:
      "Start building your first prototype in no time with Ogency's intuitive, drag & drop interface that gives you the building blocks you need.",
    animationDelay: "0.4s",
  },
  {
    id: 6,
    icon: "/assets/images/services/icon6.png",
    title: "Affiliate Program",
    description:
      "Start building your first prototype in no time with Ogency's intuitive, drag & drop interface that gives you the building blocks you need.",
    animationDelay: "0.6s",
  },
];

const Faq = () => {
  const [active, setActive] = useState(`a0`);
  const onClick = (value) => {
    setActive(value === active ? "" : value);
  };
  const t = useTranslations();
  return (
    <Layout header={3}>
      <PageBanner
        titleHtml={`Help <span>Desk</span>`}
        titleText="Help Desk"
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
                <img src="/assets/images/faqs/faq-page.jpg" alt="FAQs" />
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
              <div
                className="section-title text-center mb-60 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <span className="sub-title style-two mb-20">What We Offer</span>
                <h2>Choose Your Topic</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-xl-4 col-md-6">
                <div
                  className={`service-item-five wow fadeInUp`}
                  data-wow-delay={service.animationDelay}
                >
                  <div className="icon">
                    <img src={service.icon} alt="Icon" />
                  </div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <Link legacyBehavior href={`/faqs/${service.id}`}>
                    <a className="theme-btn style-three">
                      Learn More <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
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
                    dec={t(data.dec)}
                    onClick={() => onClick(`a${i}`)}
                    active={active}
                    event={`a${i}`}
                    title={t(data.title)}
                  />
                ))}
              </div>
              <div className="col-lg-6 wow fadeInUp delay-0-4s">
                {faqsData2.map((data, i) => (
                  <OxencyAccordion
                    key={i}
                    dec={t(data.dec)}
                    onClick={() => onClick(`b${i}`)}
                    active={active}
                    event={`b${i}`}
                    title={t(data.title)}
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

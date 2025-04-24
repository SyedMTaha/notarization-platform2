"use client";
import Header from "@/layout/Header";
import Step1 from "../../../components/v3/step/step-1";
import Step2 from "../../../components/v3/step/step-2";
import Step3 from "../../../components/v3/step/step-3";
import Step4 from "../../../components/v3/step/step-4";
import Step5 from "../../../components/v3/step/step-5";
import Layout from "@/layout/Layout";
import VideoPopup from "@/components/VideoPopup";
import ImageView from "@/components/ImageView";

export default function V3() {
  return (
    <>
      <Layout footer={3} login={true}>
        <div style={{ marginTop: "150px" }}>
          <div
            style={{ minHeight: "150vh" }}
            className="wrapper wizard d-flex clearfix multisteps-form position-relative "
          >
            {/* for rtl */}
            {/* <div className="wrapper wizard d-flex clearfix multisteps-form position-relative" dir='rtl'> */}
            <div className="steps order-2 position-relative w-25 " style={{backgroundColor: "#09123A", backgroundImage: "none"}}>
              <div className="multisteps-form__progress ">
                <span
                  className="multisteps-form__progress-btn js-active"
                  title="Application data"
                >
                  <i className="far fa-user"></i>
                  <span>Authentication</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Tax residency"
                >
                  <i className="far fa-user"></i>
                  <span>Payment Details</span>
                </span>
                <span
                  className="multisteps-form__progress-btn"
                  title="Indentity documents"
                >
                  <i className="far fa-user"></i>
                  <span>Document Download</span>
                </span>
              </div>
            </div>
            <form
              className="multisteps-form__form w-75 order-1"
              action="#"
              id="wizard"
            >
              <div className="form-area position-relative">
                <Step1 />
                <Step2 />
                <Step3 />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

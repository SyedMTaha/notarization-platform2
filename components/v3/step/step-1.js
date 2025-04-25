import Header from "@/layout/Header";
import Link from "next/link";
import React from "react";

class StepOne extends React.Component {
  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#profile-image").attr("src", e.target.result).width(150).height(200);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  render() {
    return (
      <>
        <div
          className="multisteps-form__panel js-active"
          style={{ minHeight: "120vh" }}
          data-animation="slideHorz"
        >
          <Link legacyBehavior href="/">
            <a>
              <img
                src="/assets/images/logos/logo.png"
                style={{ marginLeft: "20px", marginTop: "20px" }}
                alt="Logo"
                title="Logo"
              />
            </a>
          </Link>
          <div className="wizard-forms " style={{ marginTop: "-100px" }}>
            <div className="inner pb-100 clearfix">
              <div className="wizard-title text-center">
                <h3>Authenticate</h3>
                <p>Find the Documents you need and download them </p>
              </div>
              <div className="wizard-form-input">
                <label className="wizard-sub-text">Reference Number</label>
                <input
                  style={{ border: "2px solid #ddeef9", color: "#a4b8d4" }}
                  type="number"
                  name="name"
                  placeholder="XXXX-XXXX-XXXX--XXXX"
                />
              </div>
              <div style={{ marginTop: "20px" }} className="wizard-form-input">
                <label className="wizard-sub-text">Date Signed</label>
                <div className="d-flex gap-4">
                  <input
                    style={{
                      width: "70px",
                      border: "2px solid #ddeef9",
                      color: "#a4b8d4",
                      padding: "10px",
                    }}
                    type="number"
                    name="number"
                    min={1}
                    max={31}
                  />
                  <h1>/</h1>
                  <input
                    style={{
                      width: "70px",
                      border: "2px solid #ddeef9",
                      color: "#a4b8d4",
                      padding: "10px",
                    }}
                    min={1}
                    max={12}
                    type="number"
                    name="number"
                  />
                  <h1>/</h1>

                  <input
                    style={{
                      width: "70px",
                      border: "2px solid #ddeef9",
                      color: "#a4b8d4",
                      padding: "10px",
                    }}
                    min={1900}
                    type="number"
                    name="number"
                  />
                </div>
              </div>

              <div className="wizard-form-input my-4">
                <h6
                  className="wizard-sub-text "
                  style={{ marginTop: "30px", marginBottom: "-5px" }}
                >
                  Found Documents
                </h6>

                <span className="w-service-box text-center d-flex flex-column justify-content-center align-items-center position-relative">
                  <span
                    className="tooltip-info"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Mr Leo Service officer"
                  ></span>

                  <span className="service-icon">
                    <img src={"/assets/images/scale.png"} alt="" />
                  </span>
                  <h4>Power of Attorney</h4>
                </span>
              </div>

              <div className="wizard-v3-progress ">
                <span>1 to 5 step</span>
                <h3>0% to complete</h3>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>

            <div className="actions">
              <ul>
                <li>
                  <span
                    style={{ backgroundColor: "#274171" }}
                    className="js-btn-next"
                    title="NEXT"
                  >
                    Download <i className="fa fa-arrow-right"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StepOne;

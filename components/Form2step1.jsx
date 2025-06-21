'use client';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Col, FormLabel, Row } from "react-bootstrap";
import CountrySelect from "@/components/CountrySelect";
import useForm2store from "@/store/form2store";
import { useFormSteps } from "@/hooks/useFormSteps";
import FormProgressSidebar from './FormProgressSidebar';
import { saveFormData, getFormData, uploadToCloudinary } from '@/utils/formStorage';

import {  Upload } from 'lucide-react'

const identificationOptions = [
  { value: "", label: "form2_select_identification_type" },
  { value: "passport", label: "form2_passport" },
  { value: "driverLicense", label: "form2_drivers_license" },
  { value: "nationalId", label: "form2_national_id" },
];

const Form2step1 = ({ totalSteps }) => {
  // All hooks must be called unconditionally at the top level
  const router = useRouter();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    countryOfResidence: '',
    email: '',
    identificationType: '',
    dateOfIssue: '',
    licenseIdNumber: '',
    jurisdictionOfDocumentUse: '',
    identificationImage: null,
    identificationImageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  // Define error class name
  const errorClassName = "mt-2 text-sm text-red-600";

  // Initialize form steps and get methods
  useFormSteps();
  const methods = useForm();
  const nextBtnRef = useRef(null);

  // Load saved data when component mounts
  useEffect(() => {
    if (!methods) return;
    
    const savedData = getFormData();
    console.log("Loading saved data in useEffect:", savedData);
    
    if (savedData.step1) {
      console.log("Found saved step1 data:", savedData.step1);
      // Update local state
      setFormData(prev => ({
        ...prev,
        ...savedData.step1
      }));
      
      // Update React Hook Form values
      Object.entries(savedData.step1).forEach(([key, value]) => {
        methods.setValue(key, value);
      });
    }
  }, [methods]);

  // Save data when it changes
  useEffect(() => {
    console.log("Saving form data:", formData);
    const dataToSave = { ...formData };
    delete dataToSave.identificationImage; // Don't save the file object
    const saveResult = saveFormData(1, dataToSave);
    console.log("Save result:", saveResult);
  }, [formData]);

  // Early return if methods is not available
  if (!methods) return null;

  const {
    register,
    control,
    setError,
    trigger,
    getValues,
    setValue,
    watch
  } = methods;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Update React Hook Form value
    setValue(name, value);
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, identificationImage: 'Image size must be less than 5MB' }));
        return;
      }

      setIsUploading(true);
      try {
        // Upload to Cloudinary
        const imageUrl = await uploadToCloudinary(file, 'identification');
        
        // Update form data with file and URL
        setFormData(prev => ({
          ...prev,
          identificationImage: file,
          identificationImageUrl: imageUrl
        }));

        // Clear error
        if (errors.identificationImage) {
          setErrors(prev => ({ ...prev, identificationImage: '' }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrors(prev => ({ ...prev, identificationImage: 'Failed to upload image. Please try again.' }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNext = async () => {
    const result = await trigger();
    console.log("Validation result:", result, "Values:", getValues());
    if (!result) {
      return;
    }
    console.log("Navigating to /form2-page2");
    router.push('/form2-page2');
  };

  const handleBack = (e) => {
         e.preventDefault();
         router.push('/');
       };

  const readURL = (event, previewId) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewImg = document.getElementById(previewId);
        if (previewImg) {
          previewImg.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const inputStyle = {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "16px",
    width: "100%",
    color: "#333333",
    transition: "border-color 0.2s ease",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#4A5568",
    marginBottom: "8px",
  };

  const errorStyle = {
    color: "#E53E3E",
    fontSize: "14px",
    marginTop: "4px",
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1" style={{ marginRight: '320px' }}>
        <div className=" mt-4 ml-4">
                  <Link legacyBehavior href="/">
                    <a>
                      <img
                        src="/assets/images/logos/logo.png"
                        style={{ height: '70px' }}
                        alt="Logo"
                        title="Logo"
                        
                      />
                    </a>
                  </Link>
        </div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-10 ">
              <div className="form-card bg-white p-4 rounded-3">
                {/* Logo */}

                {/* Form Header */}
                <div className="text-center mb-5">
                  <h2 style={{ color: '#2D3748', fontSize: '28px', fontWeight: '600' }}>{t("form2_heading_title")}</h2>
                  <p style={{ color: '#718096', fontSize: '16px', marginTop: '8px' }}>{t("form2_heading_subtitle")}</p>
                </div>

                {/* Form Content */}
                <div className="form-content">
                  {/* Name Fields Row */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <div className="form-group">
                        <label style={labelStyle}>{t("form2_first_name")}</label>
                        <input
                          style={inputStyle}
                          type="text"
                          {...register("firstName", { 
                            required: t("form2_first_name_required"),
                            onChange: handleInputChange 
                          })}
                        />
                        {errors.firstName && (
                          <p style={errorStyle}>{errors.firstName.message}</p>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label style={labelStyle}>{t("form2_middle_name")}</label>
                        <input
                          style={inputStyle}
                          type="text"
                          {...register("middleName", {
                            onChange: handleInputChange 
                          })}
                        />
                        {errors.middleName && (
                          <p style={errorStyle}>{errors.middleName.message}</p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* Last Name Field */}
                  <div className="form-group mb-4">
                    <label style={labelStyle}>{t("form2_last_name")}</label>
                    <input
                      style={inputStyle}
                      type="text"
                      {...register("lastName", { 
                        required: t("form2_last_name_required"),
                        onChange: handleInputChange 
                      })}
                    />
                    {errors.lastName && (
                      <p style={errorStyle}>{errors.lastName.message}</p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div className="form-group mb-4">
                    <label style={labelStyle}>{t("form2_date_of_birth")}</label>
                    <input
                      style={inputStyle}
                      type="date"
                      {...register("dateOfBirth", { 
                        required: t("form2_date_of_birth_required"),
                        onChange: handleInputChange 
                      })}
                    />
                    {errors.dateOfBirth && (
                      <p style={errorStyle}>{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  {/* Country of Residence Field */}
                  <div className="form-group mb-4">
                    <label style={labelStyle}>{t("form2_country_of_residence")}</label>
                    <Controller
                      name="countryOfResidence"
                      control={control}
                      rules={{ required: t("form2_country_of_residence_required") }}
                      render={({ field, fieldState }) => (
                        <>
                          <CountrySelect 
                            {...field} 
                            onChange={(value) => {
                              field.onChange(value);
                              setFormData(prev => ({
                                ...prev,
                                countryOfResidence: value
                              }));
                            }}
                          />
                          {fieldState.error?.message && (
                            <p className="text-danger">{fieldState.error.message}</p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-group mb-4">
                    <label style={labelStyle}>{t("form2_email_address")}</label>
                    <input
                      style={inputStyle}
                      type="email"
                      {...register("email", { 
                        required: t("form2_email_required"),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t("form2_invalid_email")
                        },
                        onChange: handleInputChange 
                      })}
                    />
                    {errors.email && (
                      <p style={errorStyle}>{errors.email.message}</p>
                    )}
                  </div>

                  {/* Identification Type Field */}
                  <div className="form-group mb-4">
                    <label style={labelStyle}>{t("form2_identification_type_label")}</label>
                    <div style={{ width: "100%", position: "relative" }}>
                      <Controller
                        name="identificationType"
                        control={control}
                        rules={{ required: t("form2_identification_type_required") }}
                        render={({ field, fieldState }) => (
                          <div style={{ position: "relative" }}>
                            <div
                              onClick={() => setIsOpen(!isOpen)}
                              style={{
                                border: "1px solid #E2E8F0",
                                backgroundColor: "#fff",
                                height: "60px",
                                padding: "10px 20px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                color: "#333333",
                              }}
                            >
                              <span>
                                {t(
                                  identificationOptions.find(
                                    (opt) => opt.value === field.value
                                  )?.label || "form2_select_identification_type"
                                )}
                              </span>
                              <i
                                className={`fa fa-chevron-down ${
                                  isOpen ? "rotate-icon" : ""
                                }`}
                                style={{ transition: "transform 0.3s ease" }}
                              />
                            </div>
                            {isOpen && (
                              <div
                                style={{
                                  border: "1px solid #E2E8F0",
                                  position: "absolute",
                                  backgroundColor: "#fff",
                                  width: "100%",
                                  zIndex: 10,
                                }}
                              >
                                {identificationOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    onClick={() => {
                                      field.onChange(option.value);
                                      setFormData(prev => ({
                                        ...prev,
                                        identificationType: option.value
                                      }));
                                      setIsOpen(false);
                                      trigger("identificationType");
                                    }}
                                    style={{
                                      padding: "10px 20px",
                                      cursor: "pointer",
                                      backgroundColor:
                                        field.value === option.value
                                          ? "#ddeef9"
                                          : "#fff",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = "#cce0f5";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        field.value === option.value
                                          ? "#333333"
                                          : "#fff";
                                    }}
                                  >
                                    {t(option.label)}
                                  </div>
                                ))}
                              </div>
                            )}
                            {fieldState.error?.message && (
                              <p className="text-danger">{fieldState.error.message}</p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Date of Issue and License ID Fields */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <div className="form-group">
                        <label style={labelStyle}>{t("form2_date_of_issue")}</label>
                        <div style={{ position: "relative" }}>
                          <input
                            style={{
                              ...inputStyle,
                              paddingRight: "15px",
                            }}
                            type="date"
                            {...register("dateOfIssue", { 
                              required: t("form2_date_of_issue_required"),
                              onChange: handleInputChange 
                            })}
                            className="custom-date-input"
                          />
                          
                        </div>
                        {errors.dateOfIssue && (
                          <p style={errorStyle}>{errors.dateOfIssue.message}</p>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label style={labelStyle}>{t("form2_license_id")}</label>
                        <input
                          style={inputStyle}
                          type="text"
                          {...register("licenseIdNumber", { 
                            required: t("form2_license_id_required"),
                            onChange: handleInputChange 
                          })}
                        />
                        {errors.licenseIdNumber && (
                          <p style={errorStyle}>{errors.licenseIdNumber.message}</p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  {/* Jurisdiction Field */}
                  <div className="form-group mb-4">
                    <label style={labelStyle}>{t("form2_jurisdiction")}</label>
                    <Controller
                      name="jurisdictionOfDocumentUse"
                      control={control}
                      rules={{ required: t("form2_jurisdiction_required") }}
                      render={({ field, fieldState }) => (
                        <>
                          <CountrySelect 
                            {...field} 
                            onChange={(value) => {
                              field.onChange(value);
                              setFormData(prev => ({
                                ...prev,
                                jurisdictionOfDocumentUse: value
                              }));
                            }}
                          />
                          {fieldState.error?.message && (
                            <p className="text-danger">{fieldState.error.message}</p>
                          )}
                          <p className="my-4">{t("form2_jurisdiction_note")}</p>
                        </>
                      )}
                    />
                  </div>

                   {/* Image Upload */}
                <div>
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <label className="block text-lg font-medium text-gray-700 mb-4">
                        Upload Image *
                      </label>
                    </div>
                    <div className="flex-1 ">
                      <div
                        onClick={() => document.getElementById('identification-image')}
                        className="border-2 border-gray-900 rounded-lg p-3 cursor-pointer bg-white shadow-sm hover:shadow-md transition-all duration-200 text-center"
                      >
                        <input
                          id="identification-image"
                          type="file"
                          accept="image/*"
                          {...register("identificationImage", {
                            required: t("form2_please_upload_identification_image"),
                            validate: {
                              fileSize: fileList => !fileList[0] || fileList[0].size <= 5 * 1024 * 1024 || "Image size must be less than 5MB"
                            }
                          })}
                          onChange={e => {
                            // For preview, you can set a local preview state if needed
                            if (e.target.files[0]) {
                              setImagePreview(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                          className="hidden"
                        />
                      </div>
                      {watch("identificationImage") && watch("identificationImage")[0] && (
                        <p className="mt-2 text-sm text-gray-600">
                          {watch("identificationImage")[0].name}
                        </p>
                      )}
                       {errors.identificationImage && (
                         <p className={errorClassName}>{errors.identificationImage}</p>
                       )}
                    </div>
                  </div>
                </div>
                {/* Upload Image Field ends*/}

              </div>
            </div>

              {/* Form Actions */}
              <div className="actions" style={{ marginTop: '220px' }}>
                <div className="d-flex justify-content-between align-items-center">
                  
                    <span
                      className="btn"
                      onClick={handleBack}
                      style={{ 
                        backgroundColor: "#274171",
                        color: 'white',
                        padding: '10px 30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginRight: '465px',
                        marginBottom: '-90px',
                      }}
                    >
                      <i className="fa fa-arrow-left"></i> Back
                    </span>
                  
                  <span
                    className="btn"
                    style={{ 
                      backgroundColor: "#274171",
                      color: 'white',
                      padding: '10px 30px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      marginBottom: '-90px',
                    }}
                    onClick={handleNext}
                  >
                    Next <i className="fa fa-arrow-right"></i>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div style={{ 
        width: '300px', 
        position: 'fixed', 
        right: 0, 
        top: 0, 
        height: '100vh',
        borderLeft: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: '#091534'
      }}>
        <FormProgressSidebar currentStep={1} />
      </div>
    </div>
  );
};

export default Form2step1;

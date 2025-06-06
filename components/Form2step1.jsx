'use client';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Controller } from "react-hook-form";
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
  const router = useRouter();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [identificationImage, setIdentificationImage] = useState(null);
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

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = getFormData().step1;
    if (savedData) {
      setFormData(prev => ({
        ...prev,
        ...savedData
      }));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    const dataToSave = { ...formData };
    delete dataToSave.identificationImage; // Don't save the file object
    saveFormData(1, dataToSave);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const validateForm = () => {
    const newErrors = {};
    
    // Add your validation logic here
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    // ... add more validation rules

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push('/form2-page2');
    }
  };

  // Initialize form steps
  useFormSteps();

  const { methods, getValidateStep } = useForm2store();
  const nextBtnRef = useRef(null);
  if (!methods) return null;

  const {
    register,
    control,
    setError,
    trigger,
    getValues,
   
  } = methods;

  const nextHandler = async () => {
    const validateStep = await getValidateStep(1);
    const { isValid, data } = await validateStep();
    if (!isValid) return;

    if (!identificationImage) {
      setError("identificationImage", {
        type: "manual",
        message: t("form2_please_upload_identification_image"),
      });
      return;
    }

    const formValues = getValues();
    if (!formValues.identificationType) {
      setError("identificationType", {
        type: "manual",
        message: t("form2_identification_type_required"),
      });
      return;
    }

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(identificationImage, 'identification');
      
      if (!imageUrl) {
        throw new Error('Failed to upload image');
      }

      // Ensure all required fields are present
      const payload = {
        ...data,
        identificationImage: imageUrl,
        document_info: {
          ...data.document_info,
          documentType: formValues.identificationType || 'other', // Provide a default value
        }
      };

      console.log("validated data →", payload);
      console.log("All data", formValues);
      router.push('/form2-page2');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError("identificationImage", {
        type: "manual",
        message: t("form2_error_uploading_image"),
      });
    }
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
                          {...register("firstName")}
                          
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
                          {...register("middleName")}
                          
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
                      {...register("lastName")}
                    
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
                      {...register("dateOfBirth")}
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
                      render={({ field, fieldState }) => (
                        <>
                          <CountrySelect {...field} />
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
                      {...register("email")}
                      
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
                            {...register("dateOfIssue")}
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
                          {...register("licenseIdNumber")}
                          
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
                      render={({ field, fieldState }) => (
                        <>
                          <CountrySelect {...field} />
                          {fieldState.error?.message && (
                            <p className="text-danger">{fieldState.error.message}</p>
                          )}
                          <p className="my-4">{t("form2_jurisdiction_note")}</p>
                        </>
                      )}
                    />
                  </div>

                  {/* Upload Image Field */}
                  {/* <Row className="mb-3 flex-nowrap align-items-center">
                    <Col className="col-3">
                    <span style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#4A5568",
                        display: "inline-block",
                        marginRight: "15px",
                        marginBottom: "120px"
                      }}>
                          {t("form2_upload_image")}
                          </span>
                    </Col>

                    <Col className="col-6">
                      <div className="upload-container">
                        <div
                          style={{
                            border: "1px solid #000000",
                            borderRadius: "8px",
                            padding: "20px",
                            maxWidth: "120px",
                            backgroundColor: "#fff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            textAlign: "center",
                            height: "100px",
                            marginBottom: "50px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                          onClick={() => document.getElementById('new_identification_image').click()}
                        >
                          <div className="preview-container">
                            <img
                              id="preview-image"
                              src={identificationImage ? URL.createObjectURL(identificationImage) : "/assets/v3/img/pf1.png"}
                              alt="Preview"
                              style={{
                                maxWidth: "100%",
                                height: "60px",
                                borderRadius: "4px"
                              }}
                            />
                          </div>
                          
                          <div 
                            style={{
                              backgroundColor: "#274171",
                              color: "white",
                              padding: "6px",
                              borderRadius: "6px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "9px",
                              marginTop: "-10px",
                              width: "100px",
                              justifyContent: "center",
                              position: "relative",
                              left: "50%",
                              transform: "translateX(-40%)"
                            }}
                          >
                            <i className="fa fa-upload"></i>
                            <span style={{ whiteSpace: "nowrap" }}>
                              {identificationImage ? 'Change Image' : t("form2_upload_identification")}
                            </span>
                          </div>
                          
                          <input
                            id="new_identification_image"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                                  setError("identificationImage", {
                                    type: "manual",
                                    message: t("form2_image_too_large"),
                                  });
                                  return;
                                }
                                setIdentificationImage(file);
                                readURL(e, "preview-image"); // Make sure this matches your preview image ID
                              }
                            }}
                            {...register("identificationImage")}
                          />
                        </div>
                        
                        {identificationImage && (
                          <div 
                            style={{ 
                              marginTop: "10px",
                              fontSize: "14px",
                              color: "#4A5568"
                            }}
                          >
                            {identificationImage.name}
                          </div>
                        )}
                        
                        {errors.identificationImage && (
                          <p style={{ 
                            color: "#E53E3E",
                            marginTop: "8px",
                            fontSize: "14px"
                          }}>
                            {errors.identificationImage.message}
                          </p>
                        )}
                      </div>
                    </Col>
                  </Row> */}

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
                        onClick={() => document.getElementById('identification-image')?.click()}
                        className="border-2 border-gray-900 rounded-lg p-3 cursor-pointer bg-white shadow-sm hover:shadow-md transition-all duration-200 text-center"
                      >
                       
                        <div className="bg-[#274171] text-white px-3 py-2 rounded text-xs font-medium inline-flex items-center space-x-2">
                          <Upload className="w-3 h-3" />
                          <span>{formData.identificationImage ? 'Change Image' : 'Upload ID'}</span>
                        </div>
                        <input
                          id="identification-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      {formData.identificationImage && (
                        <p className="mt-2 text-sm text-gray-600">{formData.identificationImage.name}</p>
                      )}
                      {errors.identificationImage && <p className={errorClassName}>{errors.identificationImage}</p>}
                    </div>
                  </div>
                </div>
                
              </div>
                  {/* Upload Image Field */}


              </div>

              {/* Form Actions */}
              <div className="actions" style={{ marginTop: '220px' }}>
                <div className="d-flex justify-content-between align-items-center">
                  
                    <span
                      className="btn"
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
                  
                  <Link href="/form2-page2" className="text-decoration-none">
                    <span
                      className="btn"
                      style={{ 
                        backgroundColor: "#274171",
                        color: 'white',
                        padding: '10px 30px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '-90px',
                      }}
                      onClick={nextHandler}
                    >
                      Next <i className="fa fa-arrow-right"></i>
                    </span>
                  </Link>
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

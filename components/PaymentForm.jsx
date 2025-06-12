'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import FormProgressSidebar from './FormProgressSidebar';
import CountrySelect from '@/components/CountrySelect';
import { saveFormData, getFormData } from '@/utils/formStorage';

const PaymentForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [hoveredMethod, setHoveredMethod] = useState(null);

  const initialFormState = {
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    province: '',
    address: '',
    city: '',
    zipCode: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const savedData = getFormData().step4;
    if (savedData) {
      setPaymentMethod(savedData.paymentMethod || 'credit-card');
      setFormData(prev => ({
        ...prev,
        ...savedData
      }));
    }
  }, []);

  useEffect(() => {
    saveFormData(4, {
      paymentMethod,
      ...formData
    });
  }, [paymentMethod, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (paymentMethod === 'credit-card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
      if (!formData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!formData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }

    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'country', 'province', 'address', 'city', 'zipCode'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push('/video-call');
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.push('/form2-page3');
  };

  const inputClasses = (error) => `
    w-full px-4 py-2.5 rounded-lg border font-poppins
    ${error ? 'border-red-500' : 'border-gray-200'} 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition duration-200
  `;

  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1 font-poppins';

  return (
    <div className="flex font-poppins">
      <div className="flex-grow mr-80">
        <div className="mt-4 ml-4">
          <Link href="/">
            <img
              src="/assets/images/logos/logo.png"
              alt="Logo"
              title="Logo"
              className="h-[70px] ml-4"
            />
          </Link>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Page Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 font-poppins">{t('Payment Details')}</h2>
                <p className="text-gray-600 mt-2 font-poppins">{t('Please Select Your preferred form of Payment')}</p>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4 mb-8">
                {['credit-card', 'paypal'].map((method) => (
                  <div
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    onMouseEnter={() => setHoveredMethod(method)}
                    onMouseLeave={() => setHoveredMethod(null)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all duration-200
                      ${paymentMethod === method 
                        ? 'border-2 border-blue-700 bg-blue-50' 
                        : hoveredMethod === method
                          ? 'border-2 border-blue-500 bg-blue-50'
                          : 'border border-gray-200'}
                      hover:border-blue-500 hover:bg-blue-50
                    `}
                  >
                    <div className="flex items-center">
                      <img 
                        src={`/assets/v3/img/${method}.png`} 
                        alt={method} 
                        className="w-6 mr-3" 
                      />
                      <span className="font-medium text-gray-800 capitalize font-poppins">
                        {method === 'credit-card' ? 'Credit Card' : 'PayPal'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit-card' && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
                  <h5 className="text-lg font-semibold text-gray-800 mb-6">
                    {t('Enter your Credit Card Details')}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className={labelClasses}>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
                        className={inputClasses(errors.cardNumber)}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label className={labelClasses}>Cardholder Name</label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={inputClasses(errors.cardholderName)}
                      />
                      {errors.cardholderName && (
                        <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClasses}>Expiry Month</label>
                      <input
                        type="text"
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleInputChange}
                        placeholder="MM"
                        maxLength="2"
                        className={inputClasses(errors.expiryMonth)}
                      />
                      {errors.expiryMonth && (
                        <p className="mt-1 text-sm text-red-500">{errors.expiryMonth}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClasses}>Expiry Year</label>
                      <input
                        type="text"
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleInputChange}
                        placeholder="YYYY"
                        maxLength="4"
                        className={inputClasses(errors.expiryYear)}
                      />
                      {errors.expiryYear && (
                        <p className="mt-1 text-sm text-red-500">{errors.expiryYear}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClasses}>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="***"
                        maxLength="4"
                        className={inputClasses(errors.cvv)}
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Address */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h5 className="text-lg font-semibold text-gray-800 mb-6">
                  {t('Enter your Billing Address')}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={inputClasses(errors.firstName)}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={inputClasses(errors.lastName)}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClasses(errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses(errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Country</label>
                    <CountrySelect
                      value={formData.country}
                      onChange={(value) => handleInputChange({ target: { name: 'country', value }})}
                      className={inputClasses(errors.country)}
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>Province/State</label>
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className={inputClasses(errors.province)}
                    />
                    {errors.province && (
                      <p className="mt-1 text-sm text-red-500">{errors.province}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className={labelClasses}>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={inputClasses(errors.address)}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClasses(errors.city)}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelClasses}>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      maxLength="10"
                      className={inputClasses(errors.zipCode)}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#274171] text-white rounded-lg hover:bg-[#1e3254] transition-colors duration-200 font-poppins"
                >
                  <i className="fa fa-arrow-left"></i> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className={`
                    flex items-center gap-2 px-8 py-2.5 bg-[#274171] text-white rounded-lg
                    ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1e3254]'}
                    transition-all duration-200 font-poppins
                  `}
                >
                  {isProcessing ? 'Processing...' : (
                    <>
                      Next <i className="fa fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 top-0 w-80 h-screen border-l border-gray-200 bg-[#091534]">
        <FormProgressSidebar currentStep={4} />
      </div>
    </div>
  );
};

export default PaymentForm; 
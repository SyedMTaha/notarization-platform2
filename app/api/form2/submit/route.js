import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const formData = await request.json();

    // Upload files to Cloudinary if they exist
    const uploadFileToCloudinary = async (file, folder = '') => {
      if (!file) return null;

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'WiScribbles');
        formData.append('cloud_name', 'dvhrg7bkp');
        
        if (folder) {
          formData.append('folder', folder);
        }

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dvhrg7bkp/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
      }
    };

    // Upload identification image if it exists
    let identificationImageUrl = null;
    if (formData.identificationImage) {
      identificationImageUrl = await uploadFileToCloudinary(
        formData.identificationImage,
        'form_submissions/identification'
      );
    }

    // Upload signature image if it exists
    let signatureImageUrl = null;
    if (formData.signatureImage) {
      signatureImageUrl = await uploadFileToCloudinary(
        formData.signatureImage,
        'form_submissions/signatures'
      );
    }

    // Prepare the data for Firestore
    const formSubmissionData = {
      personal_info: {
        firstName: formData.firstName || '',
        middleName: formData.middleName || '',
        lastName: formData.lastName || '',
        dateOfBirth: formData.dateOfBirth || '',
        countryOfResidence: formData.countryOfResidence || '',
        email: formData.email || '',
        identificationType: formData.identificationType || 'other',
        dateOfIssue: formData.dateOfIssue || '',
        licenseIdNumber: formData.licenseIdNumber || '',
        jurisdictionOfDocumentUse: formData.jurisdictionOfDocumentUse || '',
        identificationImage: identificationImageUrl || '', // fallback to empty URL
      },
      document_info: {
        documentType: formData.documentType || 'other',
      },
      signature_info: {
        signatureMethod: formData.signatureMethod || 'drawn',
        signatureImage: signatureImageUrl || '', // fallback to empty URL
      },
      payment_info: {
        paymentMethod: formData.paymentMethod || 'credit_card',
        cardNumber: formData.cardNumber || '',
        cardholderName: formData.cardholderName || '',
        expiryMonth: formData.expiryMonth || '',
        expiryYear: formData.expiryYear || '',
        cvv: formData.cvv || '',
        paymentFirstName: formData.paymentFirstName || '',
        paymentLastName: formData.paymentLastName || '',
        paymentEmail: formData.paymentEmail || '',
        phone: formData.phone || '',
        country: formData.country || '',
        province: formData.province || '',
        zip: formData.zip || '',
        address: formData.address || '',
        city: formData.city || '',
      },
      delivery_info: {
        method: formData.deliveryMethod || 'email',
        email: formData.deliveryEmail || formData.email || '',
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    

    // Add the document to Firestore
    const docRef = await addDoc(collection(db, 'form_submissions'), formSubmissionData);

    return NextResponse.json({ 
      success: true, 
      data: {
        id: docRef.id,
        ...formSubmissionData
      },
      message: 'Form submitted successfully' 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { submissionId, approved, notaryId, notaryName } = await request.json();

    // Get the submission document
    const submissionRef = doc(db, 'form_submissions', submissionId);
    const submissionDoc = await getDoc(submissionRef);

    if (!submissionDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Update the submission with approval status
    await updateDoc(submissionRef, {
      approvalStatus: approved ? 'approved' : 'rejected',
      notaryId,
      notaryName,
      notaryApprovedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // Get the updated document
    const updatedDoc = await getDoc(submissionRef);
    const submissionData = updatedDoc.data();

    return NextResponse.json({
      success: true,
      data: {
        id: submissionId,
        ...submissionData
      },
      message: approved ? 'Submission approved successfully' : 'Submission rejected'
    });

  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 
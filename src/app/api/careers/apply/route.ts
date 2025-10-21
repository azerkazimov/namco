import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const applicationData = JSON.parse(data.get('data') as string);
    const cv = data.get('cv') as File;

    if (!cv) {
      return NextResponse.json({ error: 'No CV file uploaded' }, { status: 400 });
    }

    // Validate file type
    if (cv.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const fullName = `${applicationData.firstName}_${applicationData.lastName}`;
    const fileName = `${fullName.replace(/\s+/g, '_')}_${timestamp}.pdf`;
    const filePath = join(process.cwd(), 'uploads', fileName);

    // Convert file to buffer and save
    const bytes = await cv.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);

    // Log application details (in production, you'd save to database)
    console.log('New multi-step job application received:', {
      personalInfo: {
        firstName: applicationData.firstName,
        lastName: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
      },
      languages: applicationData.languages?.length || 0,
      experiences: applicationData.experiences?.length || 0,
      education: applicationData.higherEducation?.length || 0,
      certificates: applicationData.certificates?.length || 0,
      trainings: applicationData.trainings?.length || 0,
      relatives: applicationData.relatives?.length || 0,
      recommenders: applicationData.recommenders?.length || 0,
      cvFileName: fileName,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      fileName 
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' }, 
      { status: 500 }
    );
  }
}

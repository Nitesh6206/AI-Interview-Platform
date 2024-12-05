// app/api/upload/route.js
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  // Handle the uploaded file (e.g., save to storage)
  return NextResponse.json({ message: 'File uploaded successfully' });
}

import { NextResponse } from 'next/server';

// Tạm thời dùng URL rỗng, sẽ thay thế khi người dùng cung cấp link Apps Script
const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwg1qOmxP5N-DsTTbVHQfxmQ6R74PwGePeoajx3yR_Ax0Emx54-Sj0vz9HtFLZbTWTc/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!APPS_SCRIPT_URL) {
      console.warn('Thiếu cấu hình GOOGLE_APPS_SCRIPT_URL');
      // Trả về success giả lập trong lúc chưa có URL thật để có thể test UI
      return NextResponse.json({ 
        status: 'success', 
        orderId: 'TPE-DUMMY',
        message: 'Đây là chế độ giả lập vì chưa có link Apps Script'
      });
    }

    // Chuyển tiếp request tới Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script trả về lỗi: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: unknown) {
    console.error('Lỗi API Checkout:', error);
    const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi hệ thống';
    return NextResponse.json(
      { status: 'error', message: errorMessage },
      { status: 500 }
    );
  }
}

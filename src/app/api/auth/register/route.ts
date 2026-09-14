import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone } = body;

    // 1. Validation đầu vào
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Email không đúng định dạng (VD: mebe@gmail.com)!' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải chứa tối thiểu 6 ký tự!' },
        { status: 400 }
      );
    }

    // 2. Kiểm tra trùng lặp email
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Địa chỉ Email này đã được đăng ký. Mẹ vui lòng chọn Đăng nhập nhé!' },
        { status: 409 }
      );
    }

    // 3. Mã hóa mật khẩu với bcrypt (10 rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Lưu User mới vào Database (Role: user, Status: active, Points: 100)
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        phone: phone ? phone.trim() : null,
        role: 'user',
        status: 'active',
        points: 100, // Quà tặng 100 điểm chào mừng
        babyGender: 'be-gai',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        phone: true,
        points: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Đăng ký tài khoản thành công! T\'Petie tặng mẹ 100 điểm thưởng chào mừng.',
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi máy chủ khi đăng ký tài khoản. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

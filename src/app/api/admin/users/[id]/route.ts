import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// PATCH: Cập nhật Role (Phân quyền) hoặc Status (Khóa/Mở khóa)
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '403 Forbidden: Bạn không có quyền thực hiện thao tác này.' },
        { status: 403 }
      );
    }

    const { id: targetUserId } = params;
    const body = await req.json();
    const { role, status } = body;

    // Không cho phép Admin tự khóa hoặc tự hạ quyền chính mình
    if (session.user.id === targetUserId) {
      if (role && role !== 'admin') {
        return NextResponse.json(
          { error: 'Bạn không thể tự hạ quyền Quản Trị Viên của chính mình.' },
          { status: 400 }
        );
      }
      if (status && status === 'blocked') {
        return NextResponse.json(
          { error: 'Không thể tự khóa tài khoản của chính mình.' },
          { status: 400 }
        );
      }
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Không tìm thấy người dùng.' }, { status: 404 });
    }

    const updateData: Record<string, string> = {};
    if (role && (role === 'admin' || role === 'user')) {
      updateData.role = role;
    }
    if (status && (status === 'active' || status === 'blocked')) {
      updateData.status = status;
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Cập nhật tài khoản thành công!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error in Admin PATCH /api/admin/users/[id]:', error);
    return NextResponse.json({ error: 'Lỗi server khi cập nhật tài khoản' }, { status: 500 });
  }
}

// DELETE: Xóa tài khoản người dùng
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '403 Forbidden: Bạn không có quyền thực hiện thao tác này.' },
        { status: 403 }
      );
    }

    const { id: targetUserId } = params;

    // Không cho phép Admin tự xóa chính mình
    if (session.user.id === targetUserId) {
      return NextResponse.json(
        { error: 'Không thể xóa tài khoản Quản trị viên bạn đang đăng nhập.' },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Không tìm thấy người dùng cần xóa.' }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id: targetUserId },
    });

    return NextResponse.json({
      success: true,
      message: `Đã xóa tài khoản ${targetUser.email} thành công!`,
    });
  } catch (error) {
    console.error('Error in Admin DELETE /api/admin/users/[id]:', error);
    return NextResponse.json({ error: 'Lỗi server khi xóa người dùng' }, { status: 500 });
  }
}

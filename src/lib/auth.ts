import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';
import { UserRole, UserStatus, BabyProfile } from '@/types/auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },
  secret: process.env.NEXTAUTH_SECRET || 'tpetie_super_secret_jwt_key_2024_for_auth_session_signing',
  pages: {
    signIn: '/dang-nhap',
    error: '/dang-nhap',
  },
  providers: [
    // 1. Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user' as UserRole,
          status: 'active' as UserStatus,
          points: 100, // Tặng 100 điểm chào mừng
          phone: null,
          address: null,
          city: null,
          babyProfile: null,
        };
      },
    }),

    // 2. Email & Password Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'mebe@gmail.com' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập đầy đủ Email và Mật khẩu!');
        }

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        // Tìm kiếm user trong PostgreSQL qua Prisma
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('Tài khoản không tồn tại. Mẹ có thể đăng ký tài khoản mới hoặc chọn tài khoản dùng thử!');
        }

        if (user.status === 'blocked') {
          throw new Error('Tài khoản này đã bị tạm khóa bởi Quản trị viên. Vui lòng liên hệ hỗ trợ T\'Petie.');
        }

        // Nếu user tạo qua OAuth chưa có mật khẩu
        if (!user.password) {
          throw new Error('Tài khoản này được tạo qua Google. Mẹ vui lòng chọn Đăng nhập bằng Google nhé!');
        }

        // So sánh mật khẩu đã băm với bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Mật khẩu không chính xác! Vui lòng thử lại.');
        }

        // Cập nhật thời điểm đăng nhập gần nhất (async)
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        }).catch((err) => console.error('Error updating lastLoginAt:', err));

        // Định dạng hồ sơ bé yêu nếu có
        let babyProfile: BabyProfile | null = null;
        if (user.babyName) {
          babyProfile = {
            name: user.babyName,
            birthDate: user.babyBirthDate ? user.babyBirthDate.toISOString().split('T')[0] : undefined,
            weight: user.babyWeight || 10,
            height: user.babyHeight || 80,
            gender: (user.babyGender as 'be-gai') || 'be-gai',
            recommendedSize: user.recommendedSize || 'Size 2 (10 - 12kg)',
          };
        }

        return {
          id: user.id,
          name: user.name || 'Thành Viên',
          email: user.email,
          image: user.image,
          role: (user.role as UserRole) || 'user',
          status: (user.status as UserStatus) || 'active',
          phone: user.phone,
          address: user.address,
          city: user.city,
          points: user.points || 100,
          babyProfile,
        };
      },
    }),
  ],
  callbacks: {
    // Lưu thông tin custom (Role, Status, Phone, Points, BabyProfile) vào JWT Token
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.phone = user.phone;
        token.address = user.address;
        token.city = user.city;
        token.points = user.points;
        token.babyProfile = user.babyProfile;
      }

      // Xử lý khi Frontend gọi update() của useSession
      if (trigger === 'update' && session) {
        if (session.name) token.name = session.name;
        if (session.phone !== undefined) token.phone = session.phone;
        if (session.address !== undefined) token.address = session.address;
        if (session.city !== undefined) token.city = session.city;
        if (session.babyProfile !== undefined) token.babyProfile = session.babyProfile;
        if (session.points !== undefined) token.points = session.points;
        if (session.role !== undefined) token.role = session.role;
      }

      return token;
    },

    // Truyền dữ liệu từ JWT Token sang Session Client
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.points = token.points;
        session.user.babyProfile = token.babyProfile;
      }
      return session;
    },
  },
};

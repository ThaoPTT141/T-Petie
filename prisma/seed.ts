import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang bắt đầu seed dữ liệu người dùng T\'Petie...');

  // Mã hóa mật khẩu mẫu
  const adminHashedPassword = await bcrypt.hash('AdminPassword123!', 10);
  const userHashedPassword = await bcrypt.hash('UserPassword123!', 10);

  // 1. Tài khoản Quản Trị Viên (Admin)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tpetie.vn' },
    update: {
      role: 'admin',
      status: 'active',
    },
    create: {
      email: 'admin@tpetie.vn',
      name: "Quản Trị Viên T'Petie",
      password: adminHashedPassword,
      role: 'admin',
      status: 'active',
      phone: '0988123456',
      address: "Trụ sở T'Petie, 188 Cầu Giấy",
      city: 'Hà Nội',
      points: 1250,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
  });

  // 2. Tài khoản Khách Hàng (User) - Mẹ Thu Trang & Bé Bắp
  const customer1 = await prisma.user.upsert({
    where: { email: 'user@tpetie.vn' },
    update: {
      role: 'user',
      status: 'active',
    },
    create: {
      email: 'user@tpetie.vn',
      name: 'Mẹ Thu Trang',
      password: userHashedPassword,
      role: 'user',
      status: 'active',
      phone: '0912345678',
      address: 'Số 28 Ngõ 12 Phố Đào Tấn, Ba Đình',
      city: 'Hà Nội',
      points: 350,
      babyName: 'Bé Bắp (Tuệ Mẫn)',
      babyBirthDate: new Date('2023-05-12'),
      babyWeight: 11.2,
      babyHeight: 86,
      babyGender: 'be-gai',
      recommendedSize: 'Size 2 (10 - 12kg)',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    },
  });

  // 3. Tài khoản Khách Hàng (User) - Mẹ Bắp Xinh & Bé Thỏ
  const customer2 = await prisma.user.upsert({
    where: { email: 'mebap@gmail.com' },
    update: {
      role: 'user',
      status: 'active',
    },
    create: {
      email: 'mebap@gmail.com',
      name: 'Mẹ Bắp Xinh',
      password: userHashedPassword,
      role: 'user',
      status: 'active',
      phone: '0978999888',
      address: 'Chung cư Masteri Thảo Điền, Quận 2',
      city: 'TP. Hồ Chí Minh',
      points: 520,
      babyName: 'Bé Thỏ',
      babyBirthDate: new Date('2022-11-08'),
      babyWeight: 13.5,
      babyHeight: 94,
      babyGender: 'be-gai',
      recommendedSize: 'Size 3 (12 - 15kg)',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    },
  });

  // 4. Tài khoản Khách Hàng (User) - Mẹ Lan Anh
  const customer3 = await prisma.user.upsert({
    where: { email: 'lananh.baby@gmail.com' },
    update: {
      role: 'user',
      status: 'active',
    },
    create: {
      email: 'lananh.baby@gmail.com',
      name: 'Mẹ Lan Anh',
      password: userHashedPassword,
      role: 'user',
      status: 'active',
      phone: '0905123456',
      address: '128 Đường Lê Lợi, Q. Hải Châu',
      city: 'Đà Nẵng',
      points: 180,
      babyName: 'Bé Mây',
      babyWeight: 9.8,
      babyHeight: 80,
      babyGender: 'be-gai',
      recommendedSize: 'Size 1 (8 - 10kg)',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    },
  });

  console.log('✅ Seed dữ liệu thành công:');
  console.log(` - Admin: ${adminUser.email} (Role: ${adminUser.role})`);
  console.log(` - User 1: ${customer1.email} (Role: ${customer1.role})`);
  console.log(` - User 2: ${customer2.email} (Role: ${customer2.role})`);
  console.log(` - User 3: ${customer3.email} (Role: ${customer3.role})`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

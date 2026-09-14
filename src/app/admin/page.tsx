'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { User, UserRole, UserStatus } from '@/types/auth';
import { 
  ShieldCheck, 
  Users, 
  Crown, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Trash2, 
  Lock, 
  Unlock, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle,
  X,
  Mail,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AdminPortalPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminContent />
    </ProtectedRoute>
  );
}

function AdminContent() {
  const { user: currentAdmin, getAllUsers, updateUserRole, toggleUserStatus, deleteUser, addUser } = useAuth();
  const { showToast } = useToast();

  const allUsers = getAllUsers();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');

  // Add User Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('user');
  const [addError, setAddError] = useState<string | null>(null);

  // Filtered Users
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phone && u.phone.includes(searchQuery));

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Thống kê nhanh
  const totalUsers = allUsers.length;
  const adminCount = allUsers.filter((u) => u.role === 'admin').length;
  const customerCount = allUsers.filter((u) => u.role === 'user').length;
  const activeCount = allUsers.filter((u) => u.status === 'active').length;

  // Xử lý đổi quyền (Phân quyền)
  const handleRoleChange = async (targetUser: User, newRole: UserRole) => {
    if (targetUser.id === currentAdmin?.id && newRole !== 'admin') {
      showToast('Bạn không thể tự hạ quyền Admin của chính mình.', 'info');
      return;
    }

    const res = await updateUserRole(targetUser.id, newRole);
    if (res.success) {
      showToast(`Đã đổi quyền của tài khoản ${targetUser.email} thành ${newRole === 'admin' ? 'Quản Trị Viên (Admin)' : 'Khách Hàng (User)'}!`);
    } else {
      showToast(res.error || 'Lỗi khi cập nhật quyền.', 'info');
    }
  };

  // Xử lý khóa / mở khóa tài khoản
  const handleToggleStatus = async (targetUser: User) => {
    if (targetUser.id === currentAdmin?.id) {
      showToast('Không thể tự khóa tài khoản của chính mình.', 'info');
      return;
    }

    const res = await toggleUserStatus(targetUser.id);
    if (res.success) {
      const nextStatus = targetUser.status === 'active' ? 'Đã khóa' : 'Đang hoạt động';
      showToast(`Đã cập nhật trạng thái tài khoản ${targetUser.name}: ${nextStatus}!`);
    } else {
      showToast(res.error || 'Lỗi khi cập nhật trạng thái.', 'info');
    }
  };

  // Xử lý xóa tài khoản
  const handleDeleteUser = async (targetUser: User) => {
    if (targetUser.id === currentAdmin?.id) {
      showToast('Không thể xóa tài khoản của chính mình.', 'info');
      return;
    }

    if (confirm(`Mẹ có chắc chắn muốn xóa vĩnh viễn tài khoản "${targetUser.name}" (${targetUser.email}) khỏi hệ thống không?`)) {
      const res = await deleteUser(targetUser.id);
      if (res.success) {
        showToast(`Đã xóa tài khoản ${targetUser.email} thành công!`);
      } else {
        showToast(res.error || 'Lỗi khi xóa tài khoản.', 'info');
      }
    }
  };

  // Xử lý thêm user mới
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newUserName.trim() || !newUserEmail.trim()) {
      setAddError('Vui lòng điền đầy đủ Họ tên và Email.');
      return;
    }

    const res = await addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim(),
      role: newUserRole,
      status: 'active',
      points: newUserRole === 'admin' ? 9999 : 100,
    });

    if (res.success) {
      showToast(`Đã tạo tài khoản mới (${newUserRole}) thành công!`);
      setIsAddModalOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      setNewUserRole('user');
    } else {
      setAddError(res.error || 'Lỗi khi tạo tài khoản.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Cổng Quản Trị Hệ Thống (Admin)', href: '/admin' }]} />

      {/* 1. ADMIN HEADER BAR */}
      <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-honey-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-honey-500/20 border border-honey-400/40 text-honey-400 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>Admin Control Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Quản Lý &amp; Phân Quyền Người Dùng
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 max-w-xl leading-relaxed">
            Xem toàn bộ danh sách khách hàng, cấp quyền Admin hoặc khóa tài khoản vi phạm.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm Thành Viên</span>
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card space-y-1">
          <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">Tổng Người Dùng</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal-900">{totalUsers}</div>
          <p className="text-[11px] text-sage-600 font-medium">Toàn hệ thống T&apos;Petie</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card space-y-1">
          <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">Quản Trị Viên (Admin)</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-honey-600">{adminCount}</div>
          <p className="text-[11px] text-honey-700 font-medium">Có quyền quản lý cấp cao</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card space-y-1">
          <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">Khách Hàng (User)</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal-800">{customerCount}</div>
          <p className="text-[11px] text-charcoal-500 font-medium">Mẹ bỉm mua sắm</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-card space-y-1">
          <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">Đang Hoạt Động</span>
          <div className="text-2xl sm:text-3xl font-extrabold font-heading text-sage-600">{activeCount}</div>
          <p className="text-[11px] text-sage-700 font-medium">Tài khoản hợp lệ</p>
        </div>
      </div>

      {/* 3. USER MANAGEMENT DATA TABLE */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Table Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tên, email, sđt..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-cream-300 focus:border-honey-500 focus:ring-2 focus:ring-honey-100 outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-700 bg-white outline-none cursor-pointer"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Chỉ Admin</option>
              <option value="user">Chỉ User</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-charcoal-700 bg-white outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="blocked">Đã bị khóa</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border border-cream-200 rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-cream-50 text-charcoal-800 font-bold border-b border-cream-200">
              <tr>
                <th className="py-3.5 px-4">Thành Viên</th>
                <th className="py-3.5 px-4">Liên Hệ</th>
                <th className="py-3.5 px-4">Vai Trò (Role)</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Điểm Thưởng</th>
                <th className="py-3.5 px-4 text-right">Hành Động &amp; Phân Quyền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-charcoal-400">
                    Không tìm thấy thành viên nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSelf = u.id === currentAdmin?.id;
                  const isAdmin = u.role === 'admin';
                  const isBlocked = u.status === 'blocked';

                  return (
                    <tr key={u.id} className="hover:bg-cream-50/50 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-honey-100 text-honey-700 font-bold flex items-center justify-center shrink-0 overflow-hidden text-xs">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                              u.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-charcoal-900 flex items-center space-x-1.5">
                              <span>{u.name}</span>
                              {isSelf && (
                                <span className="text-[9px] bg-honey-100 text-honey-700 font-bold px-1.5 py-0.2 rounded-full">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-charcoal-400 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Phone & Address */}
                      <td className="py-3 px-4 text-charcoal-600">
                        <div>{u.phone || 'Chưa cập nhật SĐT'}</div>
                        <div className="text-[10px] text-charcoal-400 truncate max-w-[150px]">{u.address || u.city || '—'}</div>
                      </td>

                      {/* Role Dropdown (Phân quyền trực tiếp) */}
                      <td className="py-3 px-4">
                        {isSelf ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-honey-100 text-honey-800 border border-honey-200">
                            <Crown className="w-3 h-3 text-honey-600" />
                            <span>Admin (Chính bạn)</span>
                          </span>
                        ) : (
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u, e.target.value as UserRole)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold border outline-none cursor-pointer transition-all ${
                              isAdmin
                                ? 'bg-honey-100 text-honey-800 border-honey-300'
                                : 'bg-cream-100 text-charcoal-700 border-cream-300 hover:bg-cream-200'
                            }`}
                          >
                            <option value="user">User (Khách hàng)</option>
                            <option value="admin">👑 Admin (Quản trị)</option>
                          </select>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          isBlocked
                            ? 'bg-blush-100 text-blush-700 border-blush-200'
                            : 'bg-sage-100 text-sage-700 border-sage-200'
                        }`}>
                          <span>{isBlocked ? '● Đã khóa' : '● Hoạt động'}</span>
                        </span>
                      </td>

                      {/* Points */}
                      <td className="py-3 px-4 font-bold text-honey-700 font-heading">
                        {u.points || 0} ⭐
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Toggle Status (Khóa/Mở) */}
                          <button
                            onClick={() => handleToggleStatus(u)}
                            disabled={isSelf}
                            title={isBlocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                            className={`p-1.5 rounded-lg border transition-all active:scale-95 disabled:opacity-30 ${
                              isBlocked
                                ? 'bg-sage-50 text-sage-700 border-sage-300 hover:bg-sage-100'
                                : 'bg-cream-100 text-charcoal-600 border-cream-300 hover:bg-cream-200'
                            }`}
                          >
                            {isBlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={isSelf}
                            title="Xóa tài khoản vĩnh viễn"
                            className="p-1.5 rounded-lg border border-cream-300 bg-cream-50 text-charcoal-500 hover:text-blush-600 hover:bg-blush-50 hover:border-blush-200 transition-all active:scale-95 disabled:opacity-30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. MODAL THÊM USER MỚI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-cream-200 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <h3 className="text-lg font-bold font-heading text-charcoal-900">
                Thêm Thành Viên Mới
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cream-100 text-charcoal-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="p-3 bg-blush-50 border border-blush-200 rounded-xl text-xs text-blush-700">
                {addError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-800">Họ và tên</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs sm:text-sm outline-none focus:border-honey-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-800">Email</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="nhanvien@tpetie.vn"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs sm:text-sm outline-none focus:border-honey-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-800">Số điện thoại</label>
                <input
                  type="tel"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="0988 123 456"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs sm:text-sm outline-none focus:border-honey-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-800">Phân quyền vai trò (Role)</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs font-bold text-charcoal-800 outline-none focus:border-honey-500"
                >
                  <option value="user">User (Khách Hàng Mẹ Bỉm)</option>
                  <option value="admin">👑 Admin (Quản Trị Viên Toàn Quyền)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full hover:bg-cream-100 text-charcoal-600 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-honey-500 hover:bg-honey-600 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  Tạo Thành Viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

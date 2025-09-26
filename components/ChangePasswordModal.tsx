
import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';

interface ChangePasswordModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ setIsOpen }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { changePassword } = useAuth();

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("كلمة المرور الجديدة غير متطابقة.");
      return;
    }
    if (newPassword.length < 4) {
      setError("كلمة المرور الجديدة يجب أن تكون على الأقل 4 أحرف.");
      return;
    }

    if (changePassword(currentPassword, newPassword)) {
      alert("تم تغيير كلمة المرور بنجاح.");
      setIsOpen(false);
    } else {
      setError("كلمة المرور الحالية غير صحيحة.");
    }
  };

  return (
    <Modal title="تغيير كلمة المرور" onClose={() => setIsOpen(false)}>
      <div className="space-y-4 text-right">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور الحالية</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border-2 border-slate-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">كلمة المرور الجديدة</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border-2 border-slate-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">تأكيد كلمة المرور الجديدة</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border-2 border-slate-300 rounded-md"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">إلغاء</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">حفظ</button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;

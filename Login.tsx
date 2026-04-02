import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, ShieldCheck, Mail, Lock, Fingerprint, UserPlus, ArrowRight } from 'lucide-react';
import { useFirebase } from '../lib/firebase';

export const Login: React.FC = () => {
  const { signIn, signInWithEmail, signUpWithEmail } = useFirebase();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometric = () => {
    // WebAuthn placeholder - in a real app this would trigger device authentication
    setError('خاصية البصمة متاحة فقط على الأجهزة المتوافقة. يرجى تسجيل الدخول بكلمة المرور أولاً.');
  };

  return (
    <div className="min-h-screen bg-[#022c22] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#fbbf24]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#fbbf24]/20 to-emerald-500/20 border border-white/10">
            <ShieldCheck size={40} className="text-[#fbbf24]" />
          </div>
          <h1 className="text-3xl font-black text-white mb-1 tracking-tighter">نظام الصالح</h1>
          <p className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-[0.2em]">الإدارة المالية المتقدمة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                <label className="text-xs font-bold text-emerald-100/50 mr-2">الاسم الكامل</label>
                <div className="relative">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-100/30" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 text-white text-sm focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
                    placeholder="أدخل اسمك"
                    required={isRegister}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-xs font-bold text-emerald-100/50 mr-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-100/30" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 text-white text-sm focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-emerald-100/50 mr-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-100/30" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 text-white text-sm focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-[10px] font-bold text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-emerald-950 font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-[#fbbf24]/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-emerald-950/30 border-t-emerald-950 rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={signIn}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-emerald-100/70 text-xs font-bold hover:bg-white/10 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
            جوجل
          </button>
          <button
            onClick={handleBiometric}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-emerald-100/70 text-xs font-bold hover:bg-white/10 transition-colors"
          >
            <Fingerprint size={16} className="text-[#fbbf24]" />
            البصمة
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-emerald-400/60 text-xs font-bold hover:text-[#fbbf24] transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            {isRegister ? (
              <>
                لديك حساب بالفعل؟ <ArrowRight size={14} />
              </>
            ) : (
              <>
                ليس لديك حساب؟ <UserPlus size={14} />
              </>
            )}
          </button>
        </div>

        <p className="mt-8 text-emerald-100/20 text-[8px] uppercase tracking-widest font-bold text-center">
          نظام آمن ومحمي &copy; ٢٠٢٤
        </p>
      </motion.div>
    </div>
  );
};

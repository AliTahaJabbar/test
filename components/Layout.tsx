
import React, { useState } from 'react';
import { Section, UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ChangePasswordModal from './ChangePasswordModal';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const NavLink: React.FC<{
  section: Section;
  icon: string;
  label: string;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  hiddenFor?: UserRole[];
  closeMobileNav?: () => void;
}> = ({ section, icon, label, activeSection, setActiveSection, hiddenFor = [], closeMobileNav }) => {
  const { userRole } = useAuth();
  if (hiddenFor.includes(userRole)) {
    return null;
  }
  const isActive = activeSection === section;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(section);
    if (closeMobileNav) {
      closeMobileNav();
    }
  };

  return (
    <li>
      <a
        href="#"
        onClick={handleClick}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 whitespace-nowrap ${
          isActive ? 'bg-white/10' : 'hover:bg-white/10'
        }`}
      >
        <i className={`fas ${icon}`}></i>
        <span>{label}</span>
      </a>
    </li>
  );
};


const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection }) => {
  const { userRole, logout } = useAuth();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const roleText = {
    follower: 'المتابع',
    teamLeader: 'قائد فريق',
    admin: 'المسؤول',
  };

  const navLinks: { section: Section; icon: string; label: string; hiddenFor?: UserRole[] }[] = [
    { section: Section.Home, icon: 'fa-home', label: 'الرئيسية' },
    { section: Section.Maps, icon: 'fa-map', label: 'الخرائط' },
    { section: Section.Offers, icon: 'fa-percent', label: 'العروض', hiddenFor: ['teamLeader'] },
    { section: Section.Vlans, icon: 'fa-network-wired', label: 'الفيلانات' },
    { section: Section.Materials, icon: 'fa-microchip', label: 'المواد' },
    { section: Section.Maintenance, icon: 'fa-tools', label: 'الصيانة' },
    { section: Section.Columns, icon: 'fa-columns', label: 'الأعمدة' },
    { section: Section.Contact, icon: 'fa-phone', label: 'اتصل بنا' },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img src="https://dc585.4shared.com/img/O-lyn4tEku/s24/19933795a18/_online?async&rand=0.6523859132132545" alt="Logo" className="h-10" />
            <span className="text-xl font-bold whitespace-nowrap">شركة العصر الذكي</span>
          </div>
          
          <nav className="hidden xl:flex">
            <ul className="flex items-center gap-2">
              {navLinks.map(link => <NavLink key={link.section} {...link} activeSection={activeSection} setActiveSection={setActiveSection} />)}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                <i className="fas fa-user-circle text-blue-400 text-xl"></i>
                <span className="font-semibold text-sm">{roleText[userRole!]}</span>
              </div>
              {userRole === 'admin' && (
                <button onClick={() => setPasswordModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold border-2 border-yellow-500 text-yellow-500 px-3 py-1.5 rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-colors">
                  <i className="fas fa-key"></i>
                  <span>تغيير كلمة المرور</span>
                </button>
              )}
              <button onClick={logout} className="flex items-center gap-2 text-sm font-semibold border-2 border-red-500 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                <i className="fas fa-sign-out-alt"></i>
                <span>تسجيل الخروج</span>
              </button>
            </div>
            <button className="xl:hidden text-2xl" onClick={() => setMobileNavOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <span className="text-lg font-bold">القائمة</span>
          <button onClick={() => setMobileNavOpen(false)} className="text-2xl">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="p-4">
          <ul className="flex flex-col gap-2">
             {navLinks.map(link => <NavLink key={link.section} {...link} activeSection={activeSection} setActiveSection={setActiveSection} closeMobileNav={() => setMobileNavOpen(false)} />)}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 flex flex-col gap-3">
           <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                <i className="fas fa-user-circle text-blue-400 text-xl"></i>
                <span className="font-semibold">{roleText[userRole!]}</span>
              </div>
              {userRole === 'admin' && (
                <button onClick={() => {setPasswordModalOpen(true); setMobileNavOpen(false)}} className="w-full flex items-center justify-center gap-2 text-sm font-semibold border-2 border-yellow-500 text-yellow-500 px-3 py-1.5 rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-colors">
                  <i className="fas fa-key"></i>
                  <span>تغيير كلمة المرور</span>
                </button>
              )}
              <button onClick={logout} className="w-full flex items-center justify-center gap-2 text-sm font-semibold border-2 border-red-500 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                <i className="fas fa-sign-out-alt"></i>
                <span>تسجيل الخروج</span>
              </button>
        </div>
      </div>
      {isMobileNavOpen && <div className="fixed inset-0 bg-black/60 z-40 xl:hidden" onClick={() => setMobileNavOpen(false)}></div>}

      <main>
        {children}
      </main>
      
      <footer className="bg-slate-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-right">
                <div>
                    <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 pb-2 inline-block">عن الشركة</h3>
                    <p className="text-slate-300 text-sm">شركة إنترنت رائدة في تقديم خدمات الإنترنت عالية الجودة والحلول التقنية المتطورة لعملائنا في جميع المناطق.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 pb-2 inline-block">روابط سريعة</h3>
                    <ul className="text-slate-300 space-y-2 text-sm">
                       {navLinks.map(link => (
                          <li key={`footer-${link.section}`} className={link.hiddenFor?.includes(userRole) ? 'hidden' : ''}>
                             <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection(link.section); window.scrollTo(0,0); }} className="hover:text-blue-400 transition-colors">
                                <i className={`fas ${link.icon} ml-2`}></i>{link.label}
                             </a>
                          </li>
                       ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4 border-b-2 border-blue-500 pb-2 inline-block">معلومات الاتصال</h3>
                    <div className="text-slate-300 space-y-2 text-sm">
                        <p><i className="fas fa-map-marker-alt ml-2 text-blue-400"></i>العنوان: الحرية, الدور, قرب مصور عيسى</p>
                        <p><i className="fas fa-phone ml-2 text-blue-400"></i>الهاتف: 07838102085</p>
                        <p><i className="fas fa-envelope ml-2 text-blue-400"></i>البريد: alitahasmartnet@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="text-center pt-4 border-t border-white/10 text-xs text-slate-400">
                <p>شركة العصر الذكي &copy; {new Date().getFullYear()}</p>
            </div>
        </div>
      </footer>

      {isPasswordModalOpen && <ChangePasswordModal setIsOpen={setPasswordModalOpen} />}
    </>
  );
};

export default Layout;

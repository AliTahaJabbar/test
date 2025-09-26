
import React from 'react';

const Contact: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">تواصل معنا</h2>
                <p className="text-slate-600 mb-8">يسعدنا تواصلكم معنا عبر التطبيقات التالية:</p>
                
                <div className="flex justify-center gap-12">
                    <a href="https://instagram.com/alitaha.98" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl text-white bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 group-hover:scale-110 transition-transform">
                            <i className="fab fa-instagram"></i>
                        </div>
                        <span className="font-semibold text-slate-700">حساب الإنستغرام</span>
                    </a>
                    <a href="https://wa.me/+9647759313075" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl text-white bg-gradient-to-br from-green-400 to-teal-600 group-hover:scale-110 transition-transform">
                            <i className="fab fa-whatsapp"></i>
                        </div>
                        <span className="font-semibold text-slate-700">واتساب الدعم الفني</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;

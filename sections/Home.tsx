
import React from 'react';
import { Section } from '../types';

interface HomeProps {
  setActiveSection: (section: Section) => void;
}

const ServiceCard: React.FC<{
  imgSrc: string;
  title: string;
  description: string;
  section: Section;
  setActiveSection: (section: Section) => void;
}> = ({ imgSrc, title, description, section, setActiveSection }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <div className="h-44 overflow-hidden">
      <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4 text-sm">{description}</p>
      <button onClick={() => setActiveSection(section)} className="font-semibold text-blue-500 hover:text-blue-600">
        استعرض الآن <i className="fas fa-arrow-left mr-2"></i>
      </button>
    </div>
  </div>
);

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  return (
    <div className="animate-fade-in">
      <section className="hero bg-cover bg-center h-[65vh] flex items-center justify-center text-white" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://dc585.4shared.com/img/B9PkdLWRfa/s24/1993358aae8/_online?async&rand=0.5108986475801636')"}}>
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-shadow-lg">خدمات إنترنت فائقة السرعة</h1>
          <p className="text-lg md:text-xl mb-6 text-shadow">نقدم لكم أحدث حلول الإنترنت والاتصالات مع أفضل الخدمات التقنية والدعم الفني المتميز.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">خدماتنا</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            imgSrc="https://dc585.4shared.com/img/TpHWOgkfge/s24/199335dee90/_online?async&rand=0.9971719481601765"
            title="خرائط المناطق"
            description="استكشف خرائط الشبكة التفصيلية لجميع المناطق."
            section={Section.Maps}
            setActiveSection={setActiveSection}
          />
          <ServiceCard
            imgSrc="https://dc525.4shared.com/img/exrQ5Iyjfa/s24/1993358a318/_online?async&rand=0.6069926996845987"
            title="العروض والخصومات"
            description="اكتشف أحدث العروض والخصومات على باقات الإنترنت."
            section={Section.Offers}
            setActiveSection={setActiveSection}
          />
          <ServiceCard
            imgSrc="https://dc585.4shared.com/img/1jFK99w6ge/s24/19933619fe0/__online?async&rand=0.9196284863098757"
            title="الأجهزة والمواد"
            description="تصفح أحدث أجهزة الإنترنت والمواد التقنية."
            section={Section.Materials}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;


import React from 'react';

const maintenanceNumbers = {
    "منطقة (الدور والسلام والمجمع)": "07765991787",
    "منطقة حي العدل": "07719327451",
    "منطقة (الاولى والثالثة والبستان وربيع ودباش)": "07738494801",
    "منطقة ربيع ودباش": "07838755260",
    "منطقة الثانية": "07750633390",
    "منطقة الدولعي": "07859024132",
    "منطقة جكوك": "07858478756",
    "منطقة السيدية وحي العامل": "07838514192 او 07848775048",
    "رقم سوبرسيل حكومي": "07781050006",
    "رقم الشكاوي": "07759313075",
};

const stickersData = [
    { name: 'ستيكر وطني الدور وحي العدل', thumb: 'https://dc585.4shared.com/img/jzCZFS6Iku/s24/1993374b698/____?async&rand=0.08830512109580269' },
    { name: 'ستيكر السلام والزراعي والمجمع وسوبرسيل', thumb: 'https://dc730.4shared.com/img/2IMubdtljq/s24/1993374a6f8/____?async&rand=0.2608503140747772' },
    { name: 'ستيكر وطني (الاولى والثانية والثالثة والبستان وربيع ودباش)', thumb: 'https://dc730.4shared.com/img/NBIC_b16ku/s24/1993374b2b0/_________?async&rand=0.7303803786917789' },
    { name: 'ستيكر جكوك والدولعي', thumb: 'https://dc730.4shared.com/img/2N4HIxMtjq/s24/1993374aec8/___online?async&rand=0.550228095590632' }
];

const Maintenance: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">أرقام هواتف الصيانة</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(maintenanceNumbers).map(([area, number]) => (
                    <div key={area} className="bg-white p-6 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{area}</h3>
                        <p className="text-2xl font-extrabold text-blue-500 tracking-wider">{number}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl font-bold text-center mt-20 mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">ستيكرات المناطق</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {stickersData.map((sticker) => (
                    <a href={sticker.thumb} target="_blank" rel="noopener noreferrer" key={sticker.name} className="bg-white p-4 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300">
                        <img src={sticker.thumb} alt={sticker.name} className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-slate-200" />
                        <p className="font-semibold text-slate-700">{sticker.name}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Maintenance;

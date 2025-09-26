
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const categories = [
    { id: 'routers', name: 'الراوترات' },
    { id: 'onu', name: 'ONU' },
    { id: 'ont', name: 'ONT' },
    { id: 'other', name: 'المواد الأخرى' },
];

const Materials: React.FC = () => {
    const { data } = useData();
    const [activeCategory, setActiveCategory] = useState('routers');

    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">الأجهزة والمواد</h2>
            
            <div className="flex justify-center flex-wrap gap-4 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            activeCategory === cat.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.materials[activeCategory]?.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <div className="h-48 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                            <p className="text-2xl font-extrabold text-red-500 my-2">{item.price}</p>
                            <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside mt-auto">
                                {item.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
                {(data.materials[activeCategory]?.length === 0 || !data.materials[activeCategory]) && (
                    <p className="col-span-full text-center text-slate-500">لا توجد مواد في هذه الفئة.</p>
                )}
            </div>
        </section>
    );
};

export default Materials;

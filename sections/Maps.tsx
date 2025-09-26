
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MapItem } from '../types';

const Maps: React.FC = () => {
    const { data, updateData } = useData();
    const { userRole } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newMap, setNewMap] = useState<MapItem>({ name: '', link: '' });

    const filteredMaps = data.maps.filter(map =>
        map.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSaveMap = () => {
        if (newMap.name && newMap.link) {
            updateData({ ...data, maps: [...data.maps, newMap] });
            setNewMap({ name: '', link: '' });
            setShowForm(false);
        }
    };

    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">خرائط المناطق</h2>
            
            <div className="max-w-xl mx-auto mb-8 relative">
                <input
                    type="text"
                    placeholder="ابحث عن خريطة المنطقة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                />
                <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
            
            {userRole === 'admin' && (
                <div className="max-w-xl mx-auto my-6 p-4 bg-slate-50 border rounded-lg">
                    <button onClick={() => setShowForm(!showForm)} className="text-blue-600 font-semibold">
                        {showForm ? 'إلغاء' : 'إضافة خريطة جديدة'}
                    </button>
                    {showForm && (
                        <div className="mt-4 space-y-3 text-right">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">اسم الخريطة</label>
                                <input type="text" value={newMap.name} onChange={e => setNewMap({...newMap, name: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">رابط الخريطة</label>
                                <input type="text" value={newMap.link} onChange={e => setNewMap({...newMap, link: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
                            </div>
                            <button onClick={handleSaveMap} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">حفظ الخريطة</button>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
                {filteredMaps.map((map, index) => (
                    <a
                        key={index}
                        href={map.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-lg shadow-md overflow-hidden text-center transform hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="bg-slate-800 text-white font-bold p-2">{index + 1}</div>
                        <div className="p-4 font-semibold text-slate-700">{map.name}</div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Maps;

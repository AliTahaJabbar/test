
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const Vlans: React.FC = () => {
    const { data, updateData } = useData();
    const { userRole } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [vlanResult, setVlanResult] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [newVlan, setNewVlan] = useState({ area: '', number: '' });

    const handleSearch = () => {
        setVlanResult(data.vlans[searchTerm] || `لا يوجد فيلان للمنطقة: ${searchTerm}`);
    };
    
    const handleSaveVlan = () => {
        if (newVlan.area && newVlan.number) {
            updateData({ ...data, vlans: { ...data.vlans, [newVlan.area]: newVlan.number } });
            setNewVlan({ area: '', number: '' });
            setShowForm(false);
        }
    };

    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">فيلانات المناطق</h2>
            
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">ابحث عن فيلان منطقة</h3>
                <div className="mb-4">
                    <label htmlFor="vlanInput" className="block text-lg font-semibold text-slate-700 mb-2">أدخل رقم المنطقة أو اسمها:</label>
                    <input
                        type="text"
                        id="vlanInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full p-3 border-2 border-slate-300 rounded-lg text-center"
                        placeholder="مثال: 151, مجمع..."
                    />
                </div>
                <button onClick={handleSearch} className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
                    عرض الفيلان <i className="fas fa-arrow-left mr-2"></i>
                </button>
                
                {vlanResult && (
                    <div className="mt-6 p-4 bg-slate-100 rounded-lg text-2xl font-bold text-slate-800">
                        {vlanResult}
                    </div>
                )}
            </div>

            {userRole === 'admin' && (
                <div className="max-w-xl mx-auto my-6 p-4 bg-slate-50 border rounded-lg">
                    <button onClick={() => setShowForm(!showForm)} className="text-blue-600 font-semibold">
                        {showForm ? 'إلغاء' : 'إضافة أو تعديل فيلان'}
                    </button>
                    {showForm && (
                        <div className="mt-4 space-y-3 text-right">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">المنطقة</label>
                                <input type="text" value={newVlan.area} onChange={e => setNewVlan({...newVlan, area: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">رقم الفيلان</label>
                                <input type="text" value={newVlan.number} onChange={e => setNewVlan({...newVlan, number: e.target.value})} className="mt-1 w-full p-2 border rounded-md" />
                            </div>
                            <button onClick={handleSaveVlan} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">حفظ الفيلان</button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Vlans;

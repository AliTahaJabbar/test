
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const EditableCell: React.FC<{ value: string; onSave: (newValue: string) => void; isAdmin: boolean }> = ({ value, onSave, isAdmin }) => {
    const handleBlur = (e: React.FocusEvent<HTMLTableCellElement>) => {
        onSave(e.currentTarget.textContent || '');
    };

    return (
        <td
            contentEditable={isAdmin}
            onBlur={handleBlur}
            suppressContentEditableWarning={true}
            className="p-3 border-b border-slate-200"
        >
            {value}
        </td>
    );
};

const Offers: React.FC = () => {
    const { data, updateData } = useData();
    const { userRole } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    const isAdmin = userRole === 'admin';

    const handleSearch = () => {
        if (data.offers[searchTerm]) {
            setSelectedArea(searchTerm);
        } else {
            setSelectedArea(null);
            if(searchTerm) alert(`لا توجد عروض للمنطقة: ${searchTerm}`);
        }
    };
    
    const handleUpdate = (area: string, offerIndex: number, field: 'title' | 'note' | 'table', value: any, rowIndex?: number, cellIndex?: number) => {
        const newData = { ...data };
        if (field === 'table' && rowIndex !== undefined && cellIndex !== undefined) {
            newData.offers[area][offerIndex].table[rowIndex][cellIndex] = value;
        } else if (field !== 'table') {
            (newData.offers[area][offerIndex] as any)[field] = value;
        }
        updateData(newData);
    };

    const handleAddRow = (area: string, offerIndex: number) => {
        const newData = { ...data };
        newData.offers[area][offerIndex].table.push(["مدة جديدة", "0", "0", "0", "0"]);
        updateData(newData);
    };

    const handleDeleteRow = (area: string, offerIndex: number, rowIndex: number) => {
        if (confirm('هل أنت متأكد من حذف هذا الصف؟')) {
            const newData = { ...data };
            newData.offers[area][offerIndex].table.splice(rowIndex, 1);
            updateData(newData);
        }
    };
    
    const handleAddNewAreaOffer = () => {
        const newArea = prompt("أدخل اسم أو رقم المنطقة الجديدة:");
        if (newArea && !data.offers[newArea]) {
            const newData = { ...data };
            newData.offers[newArea] = [{
                title: `عرض جديد للمنطقة ${newArea}`,
                table: [["شهر", "15000", "20000", "30000", "75000"]],
                note: "ملاحظات العرض الجديد."
            }];
            updateData(newData);
            setSearchTerm(newArea);
            setSelectedArea(newArea);
        } else if (newArea) {
            alert("هذه المنطقة موجودة بالفعل.");
        }
    };

    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">العروض المتاحة</h2>
            
            <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <label htmlFor="areaNumber" className="block text-lg font-semibold text-slate-700 mb-2">أدخل رقم المنطقة أو اسمها:</label>
                <input
                    type="text"
                    id="areaNumber"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full p-3 border-2 border-slate-300 rounded-lg focus:border-blue-500"
                    placeholder="مثال: 44, 115, مجمع..."
                />
                <div className="mt-4 flex flex-col gap-2">
                    <button onClick={handleSearch} className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
                        عرض العروض <i className="fas fa-arrow-left mr-2"></i>
                    </button>
                    {isAdmin && (
                        <button onClick={handleAddNewAreaOffer} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                            إضافة عرض لمنطقة جديدة
                        </button>
                    )}
                </div>
            </div>

            {selectedArea && (
                <div className="mt-12 space-y-8">
                    {data.offers[selectedArea].map((offer, offerIndex) => (
                        <div key={offerIndex} className="bg-white rounded-lg shadow-lg p-6">
                            <h3
                                contentEditable={isAdmin}
                                onBlur={(e) => handleUpdate(selectedArea, offerIndex, 'title', e.currentTarget.textContent || '')}
                                suppressContentEditableWarning={true}
                                className="text-2xl font-bold text-center mb-6 text-slate-800"
                            >
                                {offer.title}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-center">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="p-3">المدة</th>
                                            <th className="p-3">فئة اولى</th>
                                            <th className="p-3">فئة ثانية</th>
                                            <th className="p-3">فئة ثالثة</th>
                                            <th className="p-3">فئة رابعة</th>
                                            {isAdmin && <th className="p-3 w-12"></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {offer.table.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="odd:bg-slate-50">
                                                {row.map((cell, cellIndex) => (
                                                    <EditableCell
                                                        key={cellIndex}
                                                        value={cell}
                                                        isAdmin={isAdmin}
                                                        onSave={(newValue) => handleUpdate(selectedArea, offerIndex, 'table', newValue, rowIndex, cellIndex)}
                                                    />
                                                ))}
                                                {isAdmin && (
                                                    <td className="p-3 border-b border-slate-200">
                                                        <button onClick={() => handleDeleteRow(selectedArea, offerIndex, rowIndex)} className="text-red-500 hover:text-red-700">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {isAdmin && (
                                <div className="text-center mt-4">
                                    <button onClick={() => handleAddRow(selectedArea, offerIndex)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                        <i className="fas fa-plus mr-2"></i> إضافة مدة
                                    </button>
                                </div>
                            )}
                            <div
                                contentEditable={isAdmin}
                                onBlur={(e) => handleUpdate(selectedArea, offerIndex, 'note', e.currentTarget.textContent || '')}
                                suppressContentEditableWarning={true}
                                className="mt-6 p-4 bg-slate-100 rounded-md text-center text-slate-700 font-semibold"
                            >
                                {offer.note}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Offers;

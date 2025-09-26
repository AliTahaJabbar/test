
import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Area, Zone, Pole } from '../types';

const PoleItem: React.FC<{
  pole: Pole;
  areaName: string;
  zoneNumber: string;
}> = ({ pole, areaName, zoneNumber }) => {
    const { updatePole } = useData();
    const { userRole } = useAuth();
    const canEdit = userRole === 'admin' || userRole === 'follower';

    const handleCountChange = (type: 'connected' | 'moved', amount: number) => {
        const currentValue = pole[type];
        if (currentValue + amount >= 0) {
            updatePole(areaName, zoneNumber, pole.number, { [type]: currentValue + amount });
        }
    };
    
    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updatePole(areaName, zoneNumber, pole.number, { notes: e.target.value });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0 md:w-1/3">
                <h4 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">عمود {pole.number}</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">المتصلين:</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleCountChange('connected', -1)} disabled={!canEdit} className="w-7 h-7 bg-red-100 text-red-600 rounded-full disabled:opacity-50">-</button>
                            <span className="w-8 text-center font-bold text-lg">{pole.connected}</span>
                            <button onClick={() => handleCountChange('connected', 1)} disabled={!canEdit} className="w-7 h-7 bg-green-100 text-green-600 rounded-full disabled:opacity-50">+</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">المنتقلين:</span>
                         <div className="flex items-center gap-2">
                            <button onClick={() => handleCountChange('moved', -1)} disabled={!canEdit} className="w-7 h-7 bg-red-100 text-red-600 rounded-full disabled:opacity-50">-</button>
                            <span className="w-8 text-center font-bold text-lg">{pole.moved}</span>
                            <button onClick={() => handleCountChange('moved', 1)} disabled={!canEdit} className="w-7 h-7 bg-green-100 text-green-600 rounded-full disabled:opacity-50">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow">
                <textarea
                    placeholder="ملاحظات..."
                    value={pole.notes}
                    onChange={handleNotesChange}
                    readOnly={!canEdit}
                    className="w-full h-full min-h-[80px] p-2 bg-slate-50 border rounded-md resize-none"
                />
            </div>
        </div>
    );
};


const Columns: React.FC = () => {
    const { data } = useData();
    const [search, setSearch] = useState('');
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    useEffect(() => {
        if (!selectedArea && data.columns.areas.length > 0) {
            setSelectedArea(data.columns.areas[0]);
        }
    }, [data.columns.areas, selectedArea]);

    useEffect(() => {
        if (selectedArea && !selectedZone && selectedArea.zones.length > 0) {
            setSelectedZone(selectedArea.zones[0]);
        } else if (selectedArea && selectedArea.zones.length === 0) {
            setSelectedZone(null);
        } else if (selectedArea && selectedZone && !selectedArea.zones.find(z => z.number === selectedZone.number)) {
            setSelectedZone(selectedArea.zones[0] || null);
        }
    }, [selectedArea, selectedZone]);
    
    useEffect(() => {
        if (search.includes('-')) {
            const [zoneNum, poleNumStr] = search.split('-');
            const poleNum = parseInt(poleNumStr);

            if (zoneNum && !isNaN(poleNum)) {
                for (const area of data.columns.areas) {
                    const foundZone = area.zones.find(z => z.number === zoneNum);
                    if (foundZone) {
                        const foundPole = foundZone.poles.find(p => p.number === poleNum);
                        if (foundPole) {
                            setSelectedArea(area);
                            setSelectedZone(foundZone);
                            // Highlight or scroll logic can be added here
                            break;
                        }
                    }
                }
            }
        }
    }, [search, data.columns.areas]);


    return (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
             <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-blue-500 after:left-1/2 after:-translate-x-1/2 after:bottom-[-10px] after:rounded-full">الأعمدة</h2>

            <div className="max-w-md mx-auto mb-8 relative">
                <input
                    type="text"
                    placeholder="ابحث عن عمود (مثال: 50-1)"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full p-3 pl-10 border-2 border-slate-300 rounded-lg"
                />
                 <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Areas Sidebar */}
                <aside className="lg:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
                    <h3 className="text-xl font-bold mb-4 text-slate-800">المناطق</h3>
                    <ul className="space-y-1">
                        {data.columns.areas.map(area => (
                            <li key={area.name}>
                                <button onClick={() => {setSelectedArea(area); setSelectedZone(area.zones[0] || null);}} className={`w-full text-right px-4 py-2 rounded-md transition-colors ${selectedArea?.name === area.name ? 'bg-blue-500 text-white' : 'hover:bg-slate-100'}`}>
                                    {area.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Zones and Poles */}
                <main className="lg:w-3/4">
                    {selectedArea && (
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4 text-slate-800">زونات منطقة {selectedArea.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedArea.zones.map(zone => (
                                    <button key={zone.number} onClick={() => setSelectedZone(zone)} className={`px-4 py-2 rounded-md font-semibold transition-colors ${selectedZone?.number === zone.number ? 'bg-slate-800 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>
                                        {zone.number}
                                    </button>
                                ))}
                            </div>

                            {selectedZone && (
                                <div className="space-y-4">
                                    {selectedZone.poles
                                      .slice() // Create a shallow copy to avoid mutating the original array
                                      .sort((a, b) => a.number - b.number)
                                      .map(pole => <PoleItem key={pole.number} pole={pole} areaName={selectedArea.name} zoneNumber={selectedZone.number} />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
};

export default Columns;

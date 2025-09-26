
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteData, Pole } from '../types';
import { INITIAL_DATA } from '../constants';

interface DataContextType {
  data: SiteData;
  updateData: (newData: SiteData) => void;
  updatePole: (areaName: string, zoneNumber: string, poleNumber: number, updatedPole: Partial<Pole>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(INITIAL_DATA);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('smartAgeSiteData');
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        localStorage.setItem('smartAgeSiteData', JSON.stringify(INITIAL_DATA));
      }
    } catch (error) {
      console.error("Failed to load or parse data from localStorage", error);
      localStorage.setItem('smartAgeSiteData', JSON.stringify(INITIAL_DATA));
    }
  }, []);

  const updateData = (newData: SiteData) => {
    setData(newData);
    localStorage.setItem('smartAgeSiteData', JSON.stringify(newData));
  };
  
  const updatePole = (areaName: string, zoneNumber: string, poleNumber: number, updatedPole: Partial<Pole>) => {
    const newData = { ...data };
    const area = newData.columns.areas.find(a => a.name === areaName);
    if (area) {
        const zone = area.zones.find(z => z.number === zoneNumber);
        if (zone) {
            const poleIndex = zone.poles.findIndex(p => p.number === poleNumber);
            if (poleIndex !== -1) {
                zone.poles[poleIndex] = { ...zone.poles[poleIndex], ...updatedPole };
                updateData(newData);
            }
        }
    }
  };


  return (
    <DataContext.Provider value={{ data, updateData, updatePole }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

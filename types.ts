
export type UserRole = 'follower' | 'teamLeader' | 'admin' | null;

export enum Section {
    Home = 'home',
    Maps = 'maps',
    Offers = 'offers',
    Vlans = 'vlans',
    Materials = 'materials',
    Maintenance = 'maintenance',
    Columns = 'columns',
    Contact = 'contact'
}

export interface MapItem {
    name: string;
    link: string;
}

export interface Offer {
    title: string;
    table: string[][];
    note: string;
}

export interface Material {
    name: string;
    price: string;
    image: string;
    specs: string[];
}

export interface Pole {
    number: number;
    connected: number;
    moved: number;
    notes: string;
}

export interface Zone {
    number: string;
    poles: Pole[];
}

export interface Area {
    name: string;
    zones: Zone[];
}

export interface SiteData {
    offers: Record<string, Offer[]>;
    maps: MapItem[];
    vlans: Record<string, string>;
    materials: Record<string, Material[]>;
    columns: {
        areas: Area[];
    };
}

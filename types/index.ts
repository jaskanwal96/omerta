export interface Family {
    id: string;
    name: string;
    city: string;
    founded: number;
    description: string;
    imageUrl: string;
}

export interface Person {
    id: string;
    name: string;
    birthYear: number;
    deathYear: number | null;
    imageUrl?: string;
}

export interface Position {
    id: string;
    personId: string;
    familyId: string;
    role: 'Boss' | 'Underboss' | 'Consigliere' | 'Capo' | 'Soldier' | 'Associate';
    startYear: number;
    endYear: number | null;
    reportsTo?: string; // ID of the position they report to
}

// The "Joined" view used in the API and Frontend
export interface MafiaMember extends Position {
    name: string;
    birthYear: number;
    deathYear: number | null;
    imageUrl?: string;
    // Enriched recursive structure for the tree
    children?: MafiaMember[];
    data?: MafiaMember; // Sometimes used in d3/tree structures to hold the raw data
}

export interface FamilyWithMembers extends Family {
    members: MafiaMember[];
}

export interface Certification {
    name: string;
    issuer: string;
    year: string;
    url?: string;
    status: 'completed' | 'in-progress';
}

export const certifications: Certification[] = [
    { 
        name: "Azure Fundamentals (AZ-900)", 
        issuer: "Microsoft", 
        year: "Sept 2026",
        url: "https://learn.microsoft.com/api/credentials/share/en-gb/AlfieHine-6121/7A50DA2969DB11EC?sharingId=B29944E295ACEED2",
        status: "completed",
    },
    { 
        name: "Network+ (N10-009)", 
        issuer: "CompTIA", 
        year: "Dec 2026",
        status: "in-progress",
    },
];

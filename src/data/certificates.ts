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
        url: "",
        status: "completed"
    },
    { 
        name: "Azure Fundamentals (AZ-900)", 
        issuer: "Microsoft", 
        year: "Sept 2026",
        url: "https://www.alfiehine.co.uk",
        status: "in-progress"
    },
];

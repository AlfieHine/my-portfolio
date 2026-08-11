export interface Certification {
    name: string;
    issuer: string;
    year: string;
    url?: string;
}

export const certifications: Certification[] = [
    { name: "N/A", issuer: "N/A", year: "N/A" },
];
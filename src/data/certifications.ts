export interface Certification {
    name: string;
    issuer: string;
    year: string;
    url?: string;
}

export const certifications: Certification[] = [
    { name: "Proxmox VE Virtualization", issuer: "Proxmox", year: "2025" },
    { name: "Google Workspace Administration", issuer: "Google", year: "2024" },
    { name: "CompTIA Network+", issuer: "CompTIA", year: "2023" }
];
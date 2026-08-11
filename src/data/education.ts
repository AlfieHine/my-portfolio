export interface Education {
    degree: string;
    institution: string;
    period: string;
    location: string;
    highlights: string[];
}

export const education: Education = {
    degree: "Level 3 Extended Diploma in IT and Computing",
    institution: "Richard Huish College",
    period: "2020 – 2022",
    location: "Taunton, Somerset",
    highlights: [
        "Specialized in Systems Architecture, Networking, and IT Support",
        "Focused on practical implementation of hardware and software solutions"
    ]
};
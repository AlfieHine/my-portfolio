export interface Education {
    degree: string;
    institution: string;
    period: string;
    location: string;
    highlights: string[];
}

export const education: Education = {
    degree: "Level 3 Extended Diploma in IT and Computing",
    institution: "UK Institution",
    period: "2020 – 2022",
    location: "United Kingdom",
    highlights: [
        "Specialized in Systems Architecture, Networking, and IT Support",
        "Focused on practical implementation of hardware and software solutions"
    ]
};
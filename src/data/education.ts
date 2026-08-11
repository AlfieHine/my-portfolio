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
        "Broad course with units covering networking, programming, and systems administration",
        "Focused on practical implementation of hardware and software solutions with real world scenarios",
    ]
};
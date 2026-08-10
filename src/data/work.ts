export interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    type: string;
    summary: string;
    isCurrent?: boolean;
    bullets: string[];
}

export const experiences: Experience[] = [
    {
        role: "IT Infrastructure and Systems Specialist",
        company: "UK Public Education Sector",
        period: "2024 - Present",
        location: "United Kingdom",
        type: "Hybrid",
        summary: "Managing core infrastructure, endpoint deployment pipelines, and administrative workflows across public school systems.",
        isCurrent: true,
        bullets: [
            "Managing core infrastructure, maintaining endpoint deployment pipelines, and administering user permissions, security policies, and device enrollment for staff and students.",
            "Focused on virtualization and network health, including ZFS pool configuration and Nginx reverse proxy management."
        ]
    },
    {
        role: "IT Technician",
        company: "School Technical Services",
        period: "2022 - 2024",
        location: "United Kingdom",
        type: "On Site",
        summary: "Executed hardware upgrades, component-level diagnostics, and preventative maintenance for student and staff workstations.",
        isCurrent: false,
        bullets: [
            "Executed hardware upgrades, performed component-level diagnostics, and managed preventative maintenance for student and staff workstations."
        ]
    }
];
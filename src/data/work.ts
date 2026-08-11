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
        role: "Level 1 IT Support Technician",
        company: "Bucklers Mead School",
        period: "2024 - Present",
        location: "Yeovil, United Kingdom",
        type: "On Site",
        summary: "Managing everyday school IT support, server infrastructure, user accounts, and hardware setups across campus.",
        isCurrent: true,
        bullets: [
            "Managing Google Workspace accounts, user permissions, and software rollouts for staff and students.",
            "Maintaining Proxmox hypervisors, ZFS storage pools, and Nginx reverse proxies for internal school services.",
            "Handling day-to-day tickets, hardware fixes, and physical network cabling across classrooms."
        ]
    },
    {
        role: "Technical Solutions Placement",
        company: "Somerset Council",
        period: "2021 - 6 Weeks",
        location: "Taunton, Somerset",
        type: "On Site",
        summary: "Completed a 6-week placement within the Somerset Council, contributing heavily to the creation of a chatbot to aid users in navigating the council's vast handbook of general day-to-day FAQ's.",
        isCurrent: false,
        bullets: [
            "Setup keyword rules to pick up on what the user is asking, and then route them to the correct answer.",
            "Converted council policy documents into structured Q&A routes for an FAQ chatbot.",
            "Tested and tweaked the chatbot's responses to make sure users got accurate, plain-English answers."
        ]
    }
];
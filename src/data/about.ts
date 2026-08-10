export interface AboutInfo {
    name: string;
    imageUrl: string;
    basedIn: string;
    currentlyStudying: string;
    skillFocus: string;
    headline: string;
    bio: string[];
    philosophy: string;
    coreCompetencies: string[];
    personalInterests: string[];
}

export const aboutData: AboutInfo = {
    name: "Alfie Hine",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    basedIn: "United Kingdom",
    currentlyStudying: "Microsft Azure Fundamentals (AZ-900)",
    skillFocus: "Full-stack, Cloud, & Systems Infrastructure",
    headline: "IT Infrastructure & Systems Specialist focused on dependable networks and clean automation.",
    bio: [
        "I'm a 20-year-old IT Technician working in the UK public education sector. My day-to-day work revolves around maintaining school IT infrastructure, deploying virtualised server environments, and building automated workflows that simplify administrative overhead.",
        "Beyond hardware and enterprise networking, I have a strong passion for software engineering—building clean, high-performance web applications using modern frameworks like Astro, TypeScript, and Tailwind CSS.",
        "When I'm not configuring server clusters or troubleshooting network routes, you'll usually find me outdoors wild camping and multi-day trail backpacking across places like Dartmoor and Snowdonia."
    ],
    philosophy: "Systems should be straightforward, robust, and well-documented. Whether it's a physical network stack or web architecture, clear design always wins over over-engineered complexity.",
    coreCompetencies: [
        "School IT Infrastructure & Fleet Management",
        "Proxmox VE Hypervisors & Containerisation (LXC/KVM)",
        "Google Workspace Administration & Scripted Provisioning",
        "ZFS Storage Pool Configuration & Data Recovery",
        "Linux Server Administration (Debian / Ubuntu)",
        "Static Web Architecture (Astro, TypeScript, Tailwind CSS)"
    ],
    personalInterests: [
        "Multi-day Backpacking & Wild Camping",
        "Custom Small-Form-Factor (SFF) Hardware Builds",
        "Automated Home Lab Infrastructure",
        "Tactical & Strategy Gaming"
    ]
};
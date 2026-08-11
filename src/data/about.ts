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
    imageUrl: "src/assets/about_pfp.JPEG",
    basedIn: "Somerset, United Kingdom",
    currentlyStudying: "Microsoft Azure Fundamentals (AZ-900)",
    skillFocus: "Systems Infrastructure & Automation",
    headline: "IT Technician building reliable networks, homelabs, and web automations.",
    bio: [
        "I'm a 20-year-old IT Technician based in the UK. Day-to-day, I maintain networks, manage virtual servers, and write scripts to automate repetitive admin tasks.",
        "Outside of sysadmin work, I build clean, fast web applications using Astro, TypeScript, and Tailwind CSS. As well as maintaining my own homelab with Proxmox VE, hosting multiple virtual machines and containers for personal projects.",
        "When I'm not tweaking server configs or diagnosing network drops, you'll usually find me wild camping or hiking across Dartmoor and Eryri (Snowdonia)."
    ],
    philosophy: "I believe IT systems should be simple, well-documented, and dependable. Good design always beats over-complicated setups.",
    coreCompetencies: [
        "IT Infrastructure & Fleet Management",
        "Proxmox VE Hypervisors & Containerisation (LXC/KVM)",
        "Google Workspace Admin & Account Automation",
        "ZFS Storage Pool Configuration & Data Recovery",
        "Linux Server Administration (Debian / Ubuntu)",
        "Static Web Architecture (Astro, TypeScript, Tailwind CSS)"
    ],
    personalInterests: [
        "Multi-day Backpacking & Wild Camping",
        "CAD Modelling & 3D Printing",
        "Automated Home Lab Infrastructure",
        "Tactical & Strategy Gaming"
    ]
};
export interface SideBarItem {
    title: string;
    url: string;
    icon: React.ElementType;
    child: SubItem[];
}

interface SubItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

export interface ScheduleProps {
    day: string;
    events: {
        title: string;
        time: string;
        description: string;
        pic: string;
        note?: string;
        contact: string;
        category: string;
        status?: string;
    }[];
}
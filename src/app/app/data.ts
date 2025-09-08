import { ScheduleProps } from "@/components/type";

export const schedules: ScheduleProps[] = [
    {
        day: "Monday",
        events: [
            {
                title: "Team Meeting",
                time: "9:00 AM - 10:00 AM",
                note: "Bring your own device",
                contact: "team@example.com",
                category: "Meeting",
                status: "Confirmed",
                description: "Weekly sync-up with the team to discuss project updates and tasks.",
                pic: "N/A"
            },
            {
                title: "Design Review",
                time: "10:30 AM - 11:30 AM",
                note: "",
                contact: "design@example.com",
                category: "Research",
                status: "Pending",
                description: "Reviewing the latest design mockups with the UI/UX team.",
                pic: "N/A"
            }
        ]
    },
    {
        day: "Tuesday",
        events: [
            {
                title: "Client Presentation",
                time: "10:00 AM - 11:00 AM",
                note: "",
                contact: "client@example.com",
                category: "Presentation",
                status: "Scheduled",
                description: "Presenting the project proposal to the client and gathering feedback.",
                pic: "N/A"
            },
            {
                title: "QA Testing",
                time: "2:00 PM - 3:00 PM",
                note: "",
                contact: "qa@example.com",
                category: "Testing",
                status: "Scheduled",
                description: "Testing new features and logging bugs.",
                pic: "N/A"
            }
        ]
    },
    {
        day: "Wednesday",
        events: [
            {
                title: "Workshop on UX Design",
                time: "11:00 AM - 12:00 PM",
                note: "",
                contact: "ux@example.com",
                category: "Workshop",
                status: "Scheduled",
                description: "An interactive workshop focusing on the principles of user experience design.",
                pic: "N/A"
            }
        ]
    },
    {
        day: "Thursday",
        events: [
            {
                title: "Sprint Planning",
                time: "1:00 PM - 2:00 PM",
                note: "",
                contact: "scrum@example.com",
                category: "Planning",
                status: "Scheduled",
                description: "Planning the next sprint and assigning tasks.",
                pic: "N/A"
            }
        ]
    },
    {
        day: "Friday",
        events: [
            {
                title: "Code Review",
                time: "2:00 PM - 3:00 PM",
                note: "",
                contact: "dev@example.com",
                category: "Review",
                status: "Scheduled",
                description: "Reviewing code submissions and providing feedback.",
                pic: "N/A"
            },
            {
                title: "Retrospective",
                time: "4:00 PM - 5:00 PM",
                note: "",
                contact: "scrum@example.com",
                category: "Meeting",
                status: "Scheduled",
                description: "Discussing what went well and what can be improved.",
                pic: "N/A"
            }
        ]
    }
];

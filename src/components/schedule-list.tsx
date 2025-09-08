import { RequestDialog } from "./request-dialog"
import ScheduleCard from "./schedule-card"
import { ScheduleProps } from "./type"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

export default function ScheduleList({schedules}: {schedules: ScheduleProps[]}) {
    return (
        <div className="px-4 lg:gap-2 lg:px-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Weekly Schedule</h1>
                {/* <Button className="bg-blue-400">Request Lab +</Button> */}
                <RequestDialog />
            </div>
            <div className="flex gap-4 overflow-x-scroll">
                {schedules.map((schedule, index) => (
                    <ScheduleCard key={index} {...schedule} />
                ))}
            </div>
        </div>
    )
}
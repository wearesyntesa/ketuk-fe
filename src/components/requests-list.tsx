import RequestCard from "./request-card";
import { EventRequest } from "./type";
import { Input } from "./ui/input";

export default function RequestsList({ items }: { items: EventRequest[] }) {
    return (
        <>
            <div className="max-w-2xl flex flex-col gap-4 mx-auto">
                <Input placeholder="Search requests..." className="mb-4" />
                {items.map(item => (
                    <RequestCard key={item.id} item={item} />
                ))}
            </div>
        </>
    )
}
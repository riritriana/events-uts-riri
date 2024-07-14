import { Pen, Trash2 } from "lucide-react";
import { Event } from "../App";

export default function CardEvent({
  event,
  handleDelete,
  setUpdateEvent,
}: {
  event: Event;
  handleDelete: (id: number) => void;
  setUpdateEvent: (event: Partial<Event>) => void;
}) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.name}</div>
        <p className="text-gray-700 text-base">Location: {event.location}</p>
        <p className="text-gray-700 text-base">Organizer: {event.organizer}</p>
        <p className="text-gray-700 text-base">Description: {event.description}</p>
        <p className="text-gray-700 text-base">Ticket Price: ${event.ticket_price}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          onClick={() => setUpdateEvent(event)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Pen />
        </button>
        <button
          onClick={() => handleDelete(event.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}

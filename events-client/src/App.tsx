import { useEffect, useState } from "react";
import CardEvent from "./components/CardEvent";
import Header from "./components/Header";

export interface Event {
  id: number;
  name: string;
  location: string;
  organizer: string;
  description: string;
  ticket_price: number;
}

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [updateEvent, setUpdateEvent] = useState<Partial<Event>>({
    id: 0,
    name: "",
    location: "",
    organizer: "",
    description: "",
    ticket_price: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/event")
      .then((response) => response.json())
      .then((events) => setEvents(events));
  }, []);

  function handleDelete(id: number) {
    fetch(`http://localhost:8080/api/event/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setEvents(events.filter((event) => event.id !== id));
      }
    });
  }

  function handleEdit() {
    fetch(`http://localhost:8080/api/event`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateEvent),
    })
      .then((response) => response.json())
      .then((event) => {
        setEvents(events.map((e) => (e.id === event.id ? event : e)));
        setUpdateEvent({
          id: 0,
          name: "",
          location: "",
          organizer: "",
          description: "",
          ticket_price: 0,
        });
      });
  }

  function handleAdd() {
    fetch("http://localhost:8080/api/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateEvent),
    })
      .then((response) => response.json())
      .then((newEvent) => {
        setEvents([...events, newEvent]);
        setUpdateEvent({
          id: 0,
          name: "",
          location: "",
          organizer: "",
          description: "",
          ticket_price: 0,
        });
      });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <CardEvent
              key={event.id}
              event={event}
              handleDelete={handleDelete}
              setUpdateEvent={setUpdateEvent}
            />
          ))}
        </div>
       
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (updateEvent.id) {
              handleEdit();
            } else {
              handleAdd();
            }
          }}
        >
          tambah
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className="text-gray-700">Name Event</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={updateEvent.name}
                onChange={(e) => {
                  setUpdateEvent({
                    ...updateEvent,
                    name: e.target.value,
                  });
                }}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Location</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={updateEvent.location}
                onChange={(e) => {
                  setUpdateEvent({
                    ...updateEvent,
                    location: e.target.value,
                  });
                }}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Organizer</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={updateEvent.organizer}
                onChange={(e) => {
                  setUpdateEvent({
                    ...updateEvent,
                    organizer: e.target.value,
                  });
                }}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Description</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={updateEvent.description}
                onChange={(e) => {
                  setUpdateEvent({
                    ...updateEvent,
                    description: e.target.value,
                  });
                }}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Ticket Price</span>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={updateEvent.ticket_price}
                onChange={(e) => {
                  setUpdateEvent({
                    ...updateEvent,
                    ticket_price: parseInt(e.target.value),
                  });
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800 disabled:opacity-25 transition"
          >
            Save
          </button>
          <button onClick={()=>{}}>cancel</button>
        </form>
      </div>
    </div>
  );
}

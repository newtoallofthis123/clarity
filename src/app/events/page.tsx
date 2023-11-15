import React from "react";
import About from "~/components/base/about";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function EventPage() {
  const events = await api.event.getAllEvents.query({});

  const session = await getServerAuthSession();

  const user = await api.user.get.query({ id: session?.user.id ?? "" });

  return (
    <main className="flex flex-row justify-between gap-x-5">
      <div className="ml-4 w-[20%]">
        <About user={user} />
      </div>
      <div className="w-[60%] py-0">
        <div className="flex flex-col justify-center">
          {events.map((event) => {
            return (
              <div
                className=" my-3 rounded-md border-2 border-b-4 border-black p-3"
                key={event.id}
              >
                <div>
                  <h1 className="text-3xl font-bold">{event.title}</h1>
                  <p className="pt-1 text-lg">
                    Organized by <span>{event.organizer.name}</span>
                  </p>
                  <p className="mt-2">
                    <i className="bi bi-geo-alt mr-1"></i>
                    {event.location} {"     "}
                    <i className="bi bi-calendar3 ml-4 mr-1"></i>
                    {new Date(event.date).toDateString()}{" "}
                  </p>
                  <p className="pt-4 text-lg">{event.content}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Button className="mt-4 text-lg">
                    <a href={"/events/" + event.id}>RSVP to this event</a>
                  </Button>
                  <p>
                    <a
                      className="flex flex-row items-center justify-center"
                      href={event.link}
                    >
                      <i
                        className="bi bi-link-45deg text-3xl
                            "
                      ></i>
                      {event.link.split("/")[2]}
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[20%]"></div>
    </main>
  );
}

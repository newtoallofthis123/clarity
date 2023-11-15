import Image from "next/image";
import React from "react";
import About from "~/components/base/about";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function EventPage({ params: { id } }: Props) {
  const event =
    (await api.event.getEvent.query({
      id,
    })) ?? undefined;

  const session = await getServerAuthSession();

  const user = await api.user.get.query({ id: session?.user.id ?? "" });

  const rsvps = await api.event.getAllRSVPs.query({ id: id });

  let isDone = false;
  if (rsvps?.rsvp.length !== 0) {
    rsvps?.rsvp.forEach((rsvp) => {
      if (rsvp.id == user?.id) {
        isDone = true;
      }
    });
  }

  async function addRsVP(formdata: FormData) {
    "use server";

    console.log(formdata);
    const add_rsvp = await api.event.addRSVP.mutate({
      eventId: id,
      user_id: user?.id ?? "",
    });
    console.log(add_rsvp);
  }

  return (
    <main className="flex flex-row items-center justify-center gap-x-5">
      <div className="w-[60%] py-0">
        <div className="flex flex-col justify-center">
          <div
            className=" my-3 rounded-md border-2 border-b-4 border-black p-3"
            key={event?.id}
          >
            <div>
              <h1 className="text-3xl font-bold">{event?.title}</h1>
              <p className="pt-1 text-lg">
                Organized by <span>{event?.organizerId}</span>
              </p>
              <p className="mt-2">
                <i className="bi bi-geo-alt mr-1"></i>
                {event?.location} {"     "}
                <i className="bi bi-calendar3 ml-4 mr-1"></i>
                {new Date(event?.date ?? "").toDateString()}{" "}
              </p>
              <p className="pt-4 text-lg">{event?.content}</p>
            </div>
            <form
              action={addRsVP}
              className="flex flex-row items-center justify-between"
            >
              {!isDone ? (
                <>
                  <Button type="submit" className="mt-4 text-lg">
                    Click to RSVP to this event
                  </Button>
                </>
              ) : (
                <>
                  <p className="mt-4 text-lg">You have a RSVP to this event</p>
                </>
              )}
              <p>
                <a
                  className="flex flex-row items-center justify-center"
                  href={event?.link}
                >
                  <i
                    className="bi bi-link-45deg text-3xl
                            "
                  ></i>
                  {event?.link.split("/")[2]}
                </a>
              </p>
            </form>
          </div>
          <div>
            <p className="text-xl">
              Attended by{" "}
              <span className="font-bold">{rsvps?.rsvp.length}</span>{" "}
              {rsvps?.rsvp.length === 1 ? "person" : "people"} in your class
              {rsvps?.rsvp.length === 0 && ". Be the first to 🎈RSVP!"}
            </p>
            <div>
              {rsvps?.rsvp.length !== 0 && (
                <div>
                  <h2 className="py-3 text-2xl font-bold">
                    Your friends who are attending:
                  </h2>
                  <div className="flex flex-row items-center gap-x-2">
                    {rsvps?.rsvp.map((rsvp) => (
                      <div
                        key={rsvp.id}
                        className="flex flex-row items-center justify-center gap-x-2"
                      >
                        <Image
                          className="h-8 w-8 rounded-full"
                          width={40}
                          height={40}
                          src={"https://i.pravatar.cc/300?u=" + rsvp.name}
                          alt="avatar"
                        />
                        <p className="text-lg">{rsvp.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

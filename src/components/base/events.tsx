import React from 'react'
import { api } from '~/trpc/server';

export default async function Events() {
    const events = await api.event.getAllEvents.query({});
    
    let posts = await api.post.getAll.query({});
    posts = posts?.filter((post) => post.post_type == "comment");

    return (
      <div>
        <div className="flex flex-col rounded-md border-2 px-3 border-neutral-200 shadow-sm hover:shadow-md transition duration-300 ease-in-out">
          <div className="px-2 py-4 text-xl">
            <h2 className="pb-2 text-3xl font-bold">🔥 Trending Events</h2>
            {events.map((event) => {
              return (
                <div className="py-1" key={event.id}>
                  <a href={"/events/" + event.id}>{event.title}</a>
                </div>
              );
            })}
          </div>
          <div className="px-2 py-4 text-xl">
            <h2 className="pb-2 text-3xl font-bold">
              👀 Catch Up!
            </h2>
            {posts.map((event) => {
              return (
                <div className="py-1 flex flex-row justify-between items-center" key={event.id}>
                  <a href={"/events/" + event.id}>{event.title}</a>
                  <p className='text-sm text-neutral-600'>
                    {event.likes.length > 0 ? event.likes.length + " hits" : ""} by {Math.floor(Math.random() * 10) + 1} people
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}
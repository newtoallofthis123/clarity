"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {
  eventId: string;
  user_id: string;
};

export default function SubmitButton({ eventId, user_id }: Props) {
  const add_rsvp = api.event.addRSVP.useMutation();

  function addRsVP() {
    add_rsvp.mutate({
      eventId,
      user_id,
    });
    
    typeof window !== "undefined" && window.location.reload();
  }

  return (
    <div>
      <Button onClick={addRsVP} type="submit" className="mt-4 text-lg">
        Click to RSVP
      </Button>
    </div>
  );
}

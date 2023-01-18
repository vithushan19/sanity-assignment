import { Button, Heading, Stack, TextInput } from "@sanity/ui";
import { mockHttpClient as notificationsClient } from "./datastore/mockHttpClient";
import { v4 as uuid } from "uuid";
import { FormEvent, useRef } from "react";

const range = new Array(5).fill(0);

export function CreateNotificationTest() {
  const textRef = useRef<HTMLInputElement | null>(null);
  function onAddText(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const elements = event.currentTarget.elements;
    range.forEach((_, i) => {
      const element = elements.namedItem(`text-${i}`);
      if (element instanceof HTMLInputElement && element.value) {
        notificationsClient.create({
          id: uuid(),
          message: element.value,
        });
        element.value = "";
      }
    });
  }
  return (
    <form onSubmit={onAddText}>
      <Stack space={4}>
        <Heading size={1}>Add notifications</Heading>
        {range.map((_, i) => (
          <label key={i}>
            <TextInput
              name={`text-${i}`}
              type="text"
              ref={textRef}
              placeholder={`Notification #${i}`}
            />
          </label>
        ))}

        <Button text="Add all" type="submit" />
      </Stack>
    </form>
  );
}

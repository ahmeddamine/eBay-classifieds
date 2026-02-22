import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MessageThread } from "../messaging/message-thread";

describe("MessageThread", () => {
  it("submits outgoing message via callback", async () => {
    const onSend = vi.fn().mockResolvedValue(undefined);

    render(
      <MessageThread
        sending={false}
        onSend={onSend}
        items={[{ id: "1", sender: "them", text: "Hi", sentAt: "12:00" }]}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Write a message"), { target: { value: "Hello there" } });
    fireEvent.submit(screen.getByRole("button", { name: "Send" }).closest("form")!);

    await waitFor(() => expect(onSend).toHaveBeenCalledWith("Hello there"));
  });
});

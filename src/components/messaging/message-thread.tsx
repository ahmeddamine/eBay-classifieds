"use client";

import { cn } from "@/lib/utils";

type ThreadMessage = {
  id: string;
  sender: "me" | "them";
  text: string;
  sentAt: string;
};

export function MessageThread({
  items,
  onSend,
  sending
}: {
  items: ThreadMessage[];
  onSend: (message: string) => Promise<void>;
  sending: boolean;
}) {
  return (
    <section className="card flex h-[65vh] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {items.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-xl px-3 py-2 text-sm",
              message.sender === "me" ? "ml-auto bg-brand-600 text-white" : "bg-slate-100 text-slate-900"
            )}
          >
            {message.text}
            <div className={cn("mt-1 text-[10px]", message.sender === "me" ? "text-white/80" : "text-slate-500")}>{message.sentAt}</div>
          </div>
        ))}
      </div>
      <form
        className="border-t border-slate-200 p-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const input = form.elements.namedItem("message") as HTMLInputElement | null;
          const text = input?.value.trim() ?? "";
          if (!text) return;
          await onSend(text);
          form.reset();
        }}
      >
        <div className="flex gap-2">
          <input name="message" className="flex-1 rounded-lg border border-slate-200 px-3 py-2" placeholder="Write a message" />
          <button disabled={sending} className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white disabled:opacity-60">
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}

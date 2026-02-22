import { Message } from "@/types/marketplace";
import { cn } from "@/lib/utils";

export function MessageThread({ items }: { items: Message[] }) {
  return (
    <section className="card flex h-[65vh] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {items.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-xl px-3 py-2 text-sm",
              message.sender === "me"
                ? "ml-auto bg-brand-600 text-white"
                : "bg-slate-100 text-slate-900"
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="border-t border-slate-200 p-3">
        <div className="flex gap-2">
          <input className="flex-1 rounded-lg border border-slate-200 px-3 py-2" placeholder="Write a message" />
          <button className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">Send</button>
        </div>
      </form>
    </section>
  );
}

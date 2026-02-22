import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";
import { conversations } from "@/data/mock";

export default function MessagesPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <section className="card divide-y divide-slate-200">
          {conversations.map((conversation) => (
            <Link
              href={`/messages/${conversation.id}`}
              key={conversation.id}
              className="block p-4 hover:bg-slate-50"
            >
              <p className="font-semibold">{conversation.counterpartName}</p>
              <p className="text-sm text-slate-600">{conversation.listingTitle}</p>
              <p className="text-sm text-slate-500">{conversation.lastMessage}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

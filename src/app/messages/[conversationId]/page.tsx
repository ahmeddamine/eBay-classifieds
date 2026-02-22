import { TopNav } from "@/components/layout/top-nav";
import { MessageThread } from "@/components/messaging/message-thread";
import { messages } from "@/data/mock";

export default function MessageDetailPage() {
  return (
    <div>
      <TopNav />
      <main className="container-px space-y-4 py-6">
        <h1 className="text-2xl font-bold">Conversation</h1>
        <MessageThread items={messages} />
      </main>
    </div>
  );
}

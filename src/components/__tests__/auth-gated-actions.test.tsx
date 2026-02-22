import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FavoriteToggleButton } from "../listing/favorite-toggle-button";
import { StartConversationButton } from "../messaging/start-conversation-button";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh })
}));

const getUser = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: { getUser },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
      delete: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({})
    }))
  })
}));

describe("auth-gated actions", () => {
  beforeEach(() => {
    push.mockReset();
    refresh.mockReset();
    getUser.mockResolvedValue({ data: { user: null } });
  });

  it("redirects unauthenticated user when toggling favorite", async () => {
    render(<FavoriteToggleButton listingId="l123" />);
    fireEvent.click(screen.getByRole("button", { name: /save favorite/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/auth/login?next=/listing/l123");
    });
  });

  it("redirects unauthenticated user when starting conversation", async () => {
    render(<StartConversationButton listingId="l777" sellerId="seller-1" />);
    fireEvent.click(screen.getByRole("button", { name: /message seller/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/auth/login?next=/listing/l777");
    });
  });
});

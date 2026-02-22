export function canEditListing(currentUserId: string | null | undefined, ownerId: string) {
  return Boolean(currentUserId && ownerId && currentUserId === ownerId);
}

export function canAccessConversation(
  currentUserId: string | null | undefined,
  conversation: { buyer_id: string; seller_id: string }
) {
  if (!currentUserId) return false;
  return currentUserId === conversation.buyer_id || currentUserId === conversation.seller_id;
}

declare function Stripe(
  publicAPIKey: string
): {
  redirectToCheckout: (options: { sessionId: string }) => Promise<void>
}

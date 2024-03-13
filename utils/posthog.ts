import { PostHog } from "posthog-node"

export default function PostHogClient() {
  const posthogClient = new PostHog("phc_2c41yYmBmxzlHBCaEkwhkU2uRUEXgdR94P0NEwX7vGi", {
    host: "https://app.posthog.com",
  })
  return posthogClient
}
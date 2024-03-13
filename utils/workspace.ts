import { useRouter } from "next/router"

export function workspaceId() {
  const router = useRouter()
  return String(router.query.workspaceId)
}

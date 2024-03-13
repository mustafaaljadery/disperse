import { useState } from "react"

export default function compositionState() {
  const [compositionId, setCompositionId] = useState<string>("")

  return {
    compositionId,
    setCompositionId
  }
}
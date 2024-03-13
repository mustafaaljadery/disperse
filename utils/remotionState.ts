import { useState } from "react"

export default function remotionState() {
  const [remotionRefetch, setRemotionRefetch] = useState<boolean>(true)

  return {
    remotionRefetch,
    setRemotionRefetch
  }
}
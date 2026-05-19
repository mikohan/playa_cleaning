"use client"

import React, { useState } from "react"
import { sendServerTestEvent } from "./actions"

export default function GTMTestPage() {
  const [isPending, setIsPending] = useState(false)

  const getCookie = (name: string): string => {
    if (typeof document === "undefined") return ""
    const parts = `; ${document.cookie}`.split(`; ${name}=`)
    return parts.length === 2 ? parts.pop()?.split(";").shift() || "" : ""
  }

  const handleTestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const serviceType = formData.get("service_type") as string
    const estimatedValue = Number(formData.get("estimated_value"))
    const formType = "test_lab_form"

    // Generate the baseline unique ID
    const generatedEventId =
      "id_" + Date.now() + "_" + Math.floor(Math.random() * 1000)

    // 1. Send cleanly to Browser dataLayer
    if (typeof window !== "undefined") {
      const target = window as unknown as {
        dataLayer: Array<Record<string, unknown>>
      }
      target.dataLayer = target.dataLayer || []
      target.dataLayer.push({
        event: "debug_form_success",
        event_id: generatedEventId,
        service_type: serviceType,
        estimated_value: estimatedValue,
        form_type: formType,
      })
    }

    // 150ms delay to let GTM capture dataLayer variables before server fires
    await new Promise((resolve) => setTimeout(resolve, 150))

    // 2. Prepare payload for Server Action
    const serverPayload = new FormData()
    serverPayload.append("event_id", generatedEventId)
    serverPayload.append("service_type", serviceType)
    serverPayload.append("estimated_value", String(estimatedValue))
    serverPayload.append("form_type", formType)
    serverPayload.append("userAgent", navigator.userAgent)
    serverPayload.append("fbp", getCookie("_fbp"))
    serverPayload.append("fbc", getCookie("_fbc"))

    await sendServerTestEvent(serverPayload)
    setIsPending(false)
  }

  return (
    <div
      style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "400px" }}
    >
      <h3>🔬 Micro Test Lab</h3>
      <form
        onSubmit={handleTestSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="service_type"
          placeholder="Service Type (e.g. Couch Cleaning)"
          required
          style={{ padding: "8px" }}
        />
        <input
          type="number"
          name="estimated_value"
          placeholder="Value (e.g. 150)"
          required
          style={{ padding: "8px" }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
          }}
        >
          {isPending ? "Firing..." : "Run Perfect Sync Test"}
        </button>
      </form>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import Cookies from "js-cookie"
import { META_TEST_COOKIE } from "@/lib/booking"

/**
 * Meta Test Events: opening any page with ?meta_test=TEST12345 (the code shown in
 * Events Manager) marks this browser's leads and bookings as test events for 3 hours,
 * in every tab, like Meta's own test session. ?meta_test=off ends it.
 * Every form reads the cookie and sends it to the server with the lead.
 */
export function MetaTestLink() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("meta_test")
    if (!code) return
    if (code.toLowerCase() === "off") Cookies.remove(META_TEST_COOKIE)
    else Cookies.set(META_TEST_COOKIE, code, { expires: 1 / 8, sameSite: "Lax" })
  }, [])
  return null
}

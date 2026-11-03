import { permanentRedirect } from "next/navigation"

// /projects/<city> has no page of its own: the city page lists its recent jobs.
export default async function ProjectsByLocationRedirect({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location } = await params
  permanentRedirect(`/locations/${location}#recent-jobs`)
}

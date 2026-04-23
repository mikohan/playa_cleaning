type Props = {
  text: string
}
export const Tag = ({ text }: Props) => (
  <div className="mt-8 inline-flex w-64 justify-center rounded-2xl border border-primary-blue/50 px-4 py-2 text-primary-blue/70">
    {text}
  </div>
)

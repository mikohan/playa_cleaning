import ReactMarkdown from "react-markdown"

export function RichTextRenderer({ content }: { content: string }) {
  if (!content) return null

  return (
    // The 'prose' class now has real HTML tags to style!
    <div className="prose prose-slate dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

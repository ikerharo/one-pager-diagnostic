import { annexSections } from "@/data/annexes";

const AnnexContent = ({ section }: { section: (typeof annexSections)[number] }) => (
  <div className="space-y-4 pt-1">
    {section.content?.map((block, i) => (
      <div key={i}>
        <p className="font-medium text-foreground">{block.subtitle}</p>
        {block.text && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{block.text}</p>}
        {block.list && (
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {block.list.map((item, j) => (
              <li key={j} className="flex gap-2">
                <span className="mt-0.5 text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}

    {section.table && (
      <div className="overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              {section.table.headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 transition-colors hover:bg-secondary/30 even:bg-secondary/20">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-2.5 ${
                      j === 0
                        ? "font-medium text-foreground"
                        : j === row.length - 1
                        ? "font-mono text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {section.example && (
      <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">💡 </span>
        {section.example}
      </div>
    )}

    {section.notes && (
      <ul className="space-y-0.5 text-xs italic text-muted-foreground/70">
        {section.notes.map((note, i) => (
          <li key={i}>* {note}</li>
        ))}
      </ul>
    )}
  </div>
);

export default AnnexContent;

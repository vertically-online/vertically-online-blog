import { site } from "@/content/site";

export default function SchemaBox() {
  const { label, nodes } = site.schemaBox;

  return (
    <div className="glass-dark ml-auto w-full max-w-[220px] rounded-2xl p-4">
      <p className="mb-3 text-xs font-medium text-white/50">{label}</p>
      {nodes.map((node, i) => (
        <div key={node}>
          <div className="rounded-full border border-white/15 bg-gradient-to-r from-aurora-1/20 to-aurora-2/20 px-3 py-2 text-center text-xs font-medium text-white">
            {node}
          </div>
          {i < nodes.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-white/40"
                strokeWidth={2}
              >
                <path
                  d="M12 4v14M12 18l-5-5M12 18l5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CoverageCard({ title, items }: any) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-bold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map((item: string, i: number) => (
          <div key={i} className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm flex items-center gap-2">
            ✅ {item}
          </div>
        ))}
      </div>
    </div>
  );
}

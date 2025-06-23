export function JobDescription({ description }: { description: string }) {
  return (
    <div className="min-h-[20rem] space-y-4 py-2 border-y">
      <p className="text-foreground leading-relaxed">{description}</p>
    </div>
  );
}

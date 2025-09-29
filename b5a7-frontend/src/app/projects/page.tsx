/* eslint-disable @typescript-eslint/no-explicit-any */
export const revalidate = 120;

async function getProjects() {
    const base = process.env.NEXT_PUBLIC_API_BASE!;
    const res = await fetch(`${base}/projects`, { next: { revalidate } });
    if (!res.ok) return [] as any[];
    return res.json();
}

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-bold">Projects</h1>
            {projects.length === 0 ? (
                <p className="text-sm text-gray-600">No projects yet.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((p: any) => (
                        <article key={p.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                                {p.thumbnailUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={p.thumbnailUrl} alt={p.title} className="h-full w-full object-cover" />
                                ) : null}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">{p.description}</p>
                            {Array.isArray(p.features) && p.features.length > 0 && (
                                <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
                                    {p.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                                </ul>
                            )}
                            <div className="mt-3 flex gap-3 text-sm">
                                {p.repoUrl && <a className="text-blue-600 underline" href={p.repoUrl} target="_blank">Repo</a>}
                                {p.liveUrl && <a className="text-blue-600 underline" href={p.liveUrl} target="_blank">Live</a>}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

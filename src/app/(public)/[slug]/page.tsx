import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getPage(slug: string) {
  try {
    return await prisma.page.findUnique({
      where: { slug, status: "PUBLISHED" },
    });
  } catch {
    return null;
  }
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);

  if (!page) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto text-center">
          <h1>{page.title}</h1>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div
            className="prose-church"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </>
  );
}

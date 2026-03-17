import { prisma } from "@/lib/prisma";
import { FiDownload, FiFile, FiFileText } from "react-icons/fi";

export const metadata = {
  title: "Church Resources | Calvary Lutheran Church Chandler AZ",
  description: "Download Bible study materials, bulletins, sermon notes, and newsletters from Calvary Lutheran Church in Chandler, AZ.",
};

const CATEGORY_LABELS: Record<string, string> = {
  BIBLE_STUDY: "Bible Study",
  BULLETIN: "Bulletin",
  SERMON_NOTES: "Sermon Notes",
  NEWSLETTER: "Newsletter",
  OTHER: "Other",
};

const CATEGORY_COLORS: Record<string, string> = {
  BIBLE_STUDY: "bg-blue-100 text-blue-700",
  BULLETIN: "bg-green-100 text-green-700",
  SERMON_NOTES: "bg-purple-100 text-purple-700",
  NEWSLETTER: "bg-amber-100 text-amber-700",
  OTHER: "bg-gray-100 text-secondary-600",
};

async function getPublicDocuments() {
  try {
    return await prisma.document.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ResourcesPage() {
  const documents = await getPublicDocuments();

  // Group by category
  const categories = Object.keys(CATEGORY_LABELS);
  const grouped = categories
    .map((cat) => ({
      key: cat,
      label: CATEGORY_LABELS[cat],
      docs: documents.filter((d) => d.category === cat),
    }))
    .filter((g) => g.docs.length > 0);

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <img
            src="/images/multiple-bibles.jpg"
            alt="Church resources"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Resources</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Bulletins, Bible studies, sermon notes, and newsletters.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          {documents.length === 0 ? (
            <div className="text-center py-16">
              <FiFileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400">No resources available yet</h3>
              <p className="text-secondary-400 mt-2">Check back soon for downloadable resources.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map((group) => (
                <div key={group.key}>
                  <h2 className="text-2xl mb-6">{group.label}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.docs.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card p-6 group hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 bg-gray-100 rounded-lg group-hover:bg-primary-50 transition-colors">
                            <FiFile className="w-6 h-6 text-secondary-400 group-hover:text-primary-500 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-secondary-800 group-hover:text-primary-500 transition-colors line-clamp-2">
                              {doc.title}
                            </h3>
                            {doc.description && (
                              <p className="text-sm text-secondary-400 mt-1 line-clamp-2">
                                {doc.description}
                              </p>
                            )}
                            <div className="flex items-center gap-3 mt-3">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.OTHER
                                }`}
                              >
                                {CATEGORY_LABELS[doc.category] || doc.category}
                              </span>
                              <span className="text-xs text-secondary-400 flex items-center gap-1">
                                <FiDownload className="w-3 h-3" /> Download
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

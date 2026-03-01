import { prisma } from "@/lib/prisma";
import { FiMail } from "react-icons/fi";
import { format } from "date-fns";

async function getContacts() {
  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminContactsPage() {
  const contacts = await getContacts();
  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-800">Contact Messages</h1>
        <p className="text-secondary-500 mt-1">{unread} unread message{unread !== 1 ? "s" : ""}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {contacts.length === 0 ? (
          <div className="text-center py-16 text-secondary-400">
            <FiMail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No contact messages yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {contacts.map((contact) => (
              <div key={contact.id} className={`p-6 hover:bg-gray-50 ${!contact.read ? "bg-primary-50/30" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {contact.read ? (
                      <FiMail className="w-5 h-5 text-gray-400 mt-1" />
                    ) : (
                      <FiMail className="w-5 h-5 text-primary-500 mt-1" />
                    )}
                    <div>
                      <p className={`font-medium ${!contact.read ? "text-secondary-800" : "text-secondary-500"}`}>
                        {contact.name} — {contact.subject}
                      </p>
                      <p className="text-sm text-secondary-400 mt-1">{contact.email}{contact.phone ? ` · ${contact.phone}` : ""}</p>
                      <p className="text-sm text-secondary-500 mt-2 line-clamp-2">{contact.message}</p>
                    </div>
                  </div>
                  <span className="text-xs text-secondary-400 whitespace-nowrap ml-4">
                    {format(new Date(contact.createdAt), "MMM d, yyyy h:mm a")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

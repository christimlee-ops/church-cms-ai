import { FiMail, FiPhone } from "react-icons/fi";

export const metadata = { title: "Our Staff" };

const staff = [
  {
    name: "Pastor Martin Spaude",
    role: "Pastor",
    bio: "Pastor Spaude faithfully serves at Calvary Lutheran Church, preaching and teaching God's Word to the congregation and caring for the spiritual needs of the church and community in Chandler, Arizona.",
    email: "pastor@calvarychandler.net",
    phone: "(480) 963-9397",
    image: "/images/final_m1624a02d2e54bb2.484022011-edited-1024x1024-1.jpg",
  },
  {
    name: "Bridget Spaude",
    role: "Mornings with Mommy Co-Director",
    bio: "Bridget helps lead the Mornings with Mommy program, serving young families in the Chandler area with activities and fellowship rooted in God's love.",
    email: "",
    phone: "(480) 963-9397",
    image: "",
  },
  {
    name: "Rachel Traudt",
    role: "Mornings with Mommy Co-Director",
    bio: "Rachel co-directs the Mornings with Mommy program, creating a welcoming environment for children ages 0-6 and their parents to learn and grow together.",
    email: "",
    phone: "(480) 963-9397",
    image: "",
  },
];

export default function StaffPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto text-center">
          <h1 className="mb-6">Our Staff</h1>
          <p className="text-lg text-secondary-500 leading-relaxed max-w-2xl mx-auto">
            Meet the people who serve at Calvary Lutheran Church.
          </p>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {staff.map((member) => (
              <div key={member.name} className="card p-8 text-center">
                {member.image ? (
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-gold-200 shadow-lg">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-navy-500 to-navy-700 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-gold-200">
                    <span className="text-white font-heading font-bold text-5xl">
                      {member.name.split(" ").map((n: string) => n[0]).join("")}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl mb-1">{member.name}</h3>
                <p className="text-gold-600 font-semibold mb-4">{member.role}</p>
                <p className="text-secondary-400 leading-relaxed mb-6">{member.bio}</p>
                <div className="space-y-2">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 text-sm text-navy-500 hover:text-gold-600 transition-colors">
                      <FiMail className="w-4 h-4" /> {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-2 text-sm text-navy-500 hover:text-gold-600 transition-colors">
                      <FiPhone className="w-4 h-4" /> {member.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

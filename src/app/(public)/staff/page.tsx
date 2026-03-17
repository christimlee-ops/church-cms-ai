import Image from "next/image";
import { FiMail, FiPhone } from "react-icons/fi";

export const metadata = { title: "Our Staff" };

const staff = [
  {
    name: "Pastor Martin Spaude",
    role: "Pastor",
    bio: "Pastor Spaude was born and raised in Aberdeen, South Dakota. He attended Northwestern College in Watertown, Wisconsin, and graduated from Wisconsin Lutheran Seminary in 1986. He has served congregations in the WELS throughout his ministry and has been faithfully serving at Calvary Lutheran Church in Chandler, Arizona. Pastor Spaude is married to Debbie (née Sprain), and together they have four children and six grandchildren.",
    email: "pastor@calvarychandler.net",
    phone: "(602) 903-0035",
    image: "/images/final_m1624a02d2e54bb2.484022011-edited-1024x1024-1.jpg",
  },
  {
    name: "Pastor Roger Sprain",
    role: "Retired Pastor",
    bio: "Pastor Sprain was born in Kenosha, Wisconsin. He graduated from Wisconsin Lutheran Seminary and served in pastoral ministry for decades, with extensive experience in Spanish-language ministry throughout the United States. Pastor Sprain and his wife have been blessed with a large family, including eleven grandchildren. Though retired, he continues to serve and support the ministry at Calvary.",
    email: "",
    phone: "",
    image: "",
  },
  {
    name: "Bridget Spaude",
    role: "Mornings with Mommy Co-Director",
    bio: "Bridget helps lead the Mornings with Mommy program, serving young families in the Chandler area with Christ-centered activities and fellowship rooted in God's love.",
    email: "",
    phone: "(480) 963-9397",
    image: "",
  },
  {
    name: "Rachel Traudt",
    role: "Mornings with Mommy Co-Director",
    bio: "Rachel co-directs the Mornings with Mommy program, creating a welcoming environment for children ages 0-6 and their caregivers to learn and grow together.",
    email: "",
    phone: "(480) 963-9397",
    image: "",
  },
];

export default function StaffPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/alter.jpg" alt="Inside Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/30" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-6">Our Staff</h1>
            <p className="text-lg text-navy-100 leading-relaxed max-w-2xl mx-auto">
              Meet the people who serve at Calvary Lutheran Church.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {staff.map((member) => (
              <div key={member.name} className="card p-8 text-center">
                {member.image ? (
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-gold-200 shadow-lg">
                    <Image src={member.image} alt={member.name} width={192} height={192} className="w-full h-full object-cover" />
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
                <p className="text-secondary-400 leading-relaxed mb-6 text-sm">{member.bio}</p>
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

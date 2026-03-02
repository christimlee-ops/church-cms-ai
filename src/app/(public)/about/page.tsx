import { FiHeart, FiBookOpen, FiUsers, FiBook } from "react-icons/fi";

const values = [
  { icon: FiBookOpen, title: "God's Word", description: "We believe Scripture is the inspired, inerrant Word of God -- 100% flawless and the sole authority for faith and life." },
  { icon: FiHeart, title: "Worship", description: "Christ crucified is at the center of all we do. Our worship proclaims the saving grace of Jesus for all people." },
  { icon: FiBook, title: "Education", description: "From Little Lions Preschool to Sunday School and adult Bible Study, we nurture faith at every age." },
  { icon: FiUsers, title: "Community", description: "We are a caring congregation united in fellowship, supporting one another through every season of life." },
];

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-navy-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/candle-light-service.webp" alt="Candle light service at St. Mark" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/30" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-6">About St. Mark Evangelical Lutheran Church</h1>
            <p className="text-lg text-navy-100 leading-relaxed max-w-2xl mx-auto">
              St. Mark Evangelical Lutheran Church is a congregation of the Wisconsin Evangelical
              Lutheran Synod (WELS), founded in 1974 in Salina, Kansas. We are a community of
              believers grounded in God&apos;s Word, united in worship, and dedicated to sharing
              the saving message of Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card p-8 text-center">
                <value.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-8">Our Story</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <img src="/Chruch.webp" alt="St. Mark Lutheran Church building" className="rounded-xl shadow-lg w-full object-cover" />
          </div>
          <div className="flex-1 prose-church">
            <p>
              St. Mark Evangelical Lutheran Church was founded in 1974 as a mission congregation
              of the Wisconsin Evangelical Lutheran Synod (WELS) in Salina, Kansas. From humble
              beginnings, God has blessed our congregation with steady growth and a deep commitment
              to His Word and Sacraments.
            </p>
            <p>
              As a WELS congregation, we hold firmly to the teachings of the Lutheran Confessions
              and the inerrant Scriptures. We believe that salvation is by grace alone, through
              faith alone, in Christ alone -- and we joyfully share this message with our community.
            </p>
            <p>
              In 2006, we established Little Lions Preschool to serve families in the Salina area
              with quality early childhood education rooted in Christian values. In 2023, Pastor Jim
              Winterstein arrived to shepherd our congregation. Today, St. Mark continues to be a
              place where people of all ages can hear the Gospel, grow in faith, and experience
              the love of Christ in a caring congregation.
            </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

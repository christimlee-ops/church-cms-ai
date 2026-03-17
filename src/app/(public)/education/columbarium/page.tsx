import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiHeart, FiMapPin, FiPhone } from "react-icons/fi";

export const metadata = {
  title: "Columbarium | Calvary Lutheran Church Chandler AZ",
  description: "Calvary Lutheran Church offers a Christian columbarium in Chandler, AZ — a sacred resting place for loved ones, reflecting our hope in Christ's resurrection.",
};

export default function ColumbariumPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/headers/columbarium.jpg" alt="Columbarium at Calvary Lutheran Church Chandler AZ" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Columbarium</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              A sacred resting place for loved ones, reflecting our hope in Christ&apos;s resurrection.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm mb-8 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Ministries
          </Link>

          <div className="flex flex-col lg:flex-row items-start gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
                <Image src="/images/pages/columbarium.jpg" alt="Columbarium at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="flex-1 prose-church">
              <h2>A Place of Peace and Hope</h2>
              <p>
                Calvary Lutheran Church offers a columbarium on our church grounds — a peaceful
                and dignified resting place for the cremated remains of loved ones. Our columbarium
                provides a permanent, sacred space where families can come to remember and reflect
                on the hope we have in Christ&apos;s resurrection.
              </p>
              <p>
                As Christians, we find comfort in the words of Scripture: &quot;I am the resurrection
                and the life. The one who believes in me will live, even though they die&quot; (John 11:25).
                The columbarium at Calvary is a testament to this promise — a place where the faithful
                rest in the sure and certain hope of the resurrection to eternal life.
              </p>
              <p>
                Niches are available for both members and non-members. If you would like more
                information about the columbarium, including availability and pricing, please
                contact the church office.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiHeart className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Open to All</h3>
              <p className="text-secondary-500 text-sm">Available to both members and non-members of Calvary Lutheran Church.</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">On Church Grounds</h3>
              <p className="text-secondary-500 text-sm">Located on the beautiful grounds of Calvary Lutheran Church in Chandler.</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiPhone className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Contact Us</h3>
              <p className="text-secondary-500 text-sm">
                Call <a href="tel:4809639397" className="text-navy-500 hover:text-gold-600">(480) 963-9397</a> for information and availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

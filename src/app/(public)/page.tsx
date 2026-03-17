import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { format, startOfDay, addMonths } from "date-fns";
import { generateOccurrences } from "@/lib/recurrence";
import {
  FiCalendar,
  FiBookOpen,
  FiUsers,
  FiHeart,
  FiPlay,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiUser,
  FiBook,
  FiMusic,
  FiStar,
  FiHome,
  FiCoffee,
  FiGlobe,
} from "react-icons/fi";
import { IconType } from "react-icons";
import EventGrid from "@/components/events/EventGrid";

const iconMap: Record<string, IconType> = {
  FiBookOpen,
  FiBook,
  FiUsers,
  FiHeart,
  FiCalendar,
  FiMusic,
  FiStar,
  FiHome,
  FiCoffee,
  FiGlobe,
};

const defaultHero = {
  welcomeLabel: "Welcome to Calvary",
  title: "Grow in Grace.",
  titleAccent: "Know Your Savior.",
  description:
    "God's love for the world is a gift for all people — shown through Jesus Christ's life, death, and resurrection. You're welcome here.",
  primaryBtnText: "Plan Your Visit",
  primaryBtnLink: "/visit",
  secondaryBtnText: "Watch Sermons",
  secondaryBtnLink: "/sermons",
};

const defaultService = {
  label: "Join Us This Week",
  title: "Worship & Study Schedule",
  description:
    "All are welcome — whether you've been a Lutheran your whole life or are stepping into a church for the first time.",
  times: [
    { name: "Saturday Worship", time: "6:00 PM", subtitle: "Scripture, music & proclamation" },
    { name: "Sunday Worship", time: "9:00 AM", subtitle: "Scripture, music & proclamation" },
    { name: "Bible Study & Sunday School", time: "10:30 AM", subtitle: "All ages — toddlers to adults" },
  ],
};

const defaultHighlight = {
  label: "Get Connected",
  title: "Life at Calvary",
  description:
    "From Saturday and Sunday worship to Bible Classes, Sunday School, and Mornings with Mommy, there are many ways to grow in faith and community.",
  items: [
    { title: "Saturday & Sunday Worship", description: "Christ and Him crucified are at the center of our worship every Saturday at 6:00 PM and Sunday at 9:00 AM with Scripture readings, music, and pastoral proclamation of God's Word.", link: "/sermons", icon: "FiBookOpen" },
    { title: "Bible Classes", description: "Grow in the grace and knowledge of our Lord at 10:30 AM on Sundays and Wednesday evenings. Classes for all ages.", link: "/education", icon: "FiBook" },
    { title: "Sunday School", description: "Children learn Bible stories, sing songs, and grow in their faith every Sunday at 10:30 AM.", link: "/education/sunday-school", icon: "FiUsers" },
    { title: "Community & Fellowship", description: "Connect with a caring congregation rooted in God's Word. We welcome visitors and new members warmly.", link: "/contact", icon: "FiHeart" },
  ],
};

const defaultSermon = {
  label: "This Week's Message",
  title: "Watch Our Latest Sermon",
  description:
    "Missed a service? Our sermons are available online so you can stay connected with God's Word throughout the week.",
  buttonText: "View All Sermons",
  buttonLink: "/sermons",
};

const defaultCta = {
  title: "New to Chandler? Visiting for the First Time?",
  description:
    "Whether you've been a Lutheran your whole life or are just beginning to explore the Christian faith, we'd love to welcome you. Our guests should not feel compelled to give — just come and receive God's grace.",
  primaryBtnText: "Plan Your Visit",
  primaryBtnLink: "/visit",
  secondaryBtnText: "Contact Pastor Spaude",
  secondaryBtnLink: "/contact",
};

async function getHomepageContent() {
  try {
    const content = await prisma.homepageContent.findUnique({
      where: { id: "default" },
    });
    if (!content) return null;
    return {
      hero: { ...defaultHero, ...(content.heroSection as Record<string, unknown>) },
      service: { ...defaultService, ...(content.serviceSection as Record<string, unknown>) },
      highlight: { ...defaultHighlight, ...(content.highlightSection as Record<string, unknown>) },
      sermon: { ...defaultSermon, ...(content.sermonSection as Record<string, unknown>) },
      cta: { ...defaultCta, ...(content.ctaSection as Record<string, unknown>) },
      customSections: (content.customSections as { id: string; title: string; content: string; bgColor: string }[]) || [],
    };
  } catch {
    return null;
  }
}

async function getFeaturedEvents() {
  const today = startOfDay(new Date());
  const rangeEnd = addMonths(today, 3);
  try {
    const [oneTime, recurring] = await Promise.all([
      prisma.event.findMany({
        where: {
          status: "UPCOMING",
          recurring: null,
          OR: [
            { endDate: { gte: today } },
            { endDate: null, startDate: { gte: today } },
          ],
        },
        orderBy: { startDate: "asc" },
      }),
      prisma.event.findMany({
        where: { status: "UPCOMING", recurring: { not: null } },
      }),
    ]);

    const expandedRecurring = recurring.flatMap((event) =>
      generateOccurrences(event, today, rangeEnd).map((occ) => ({
        ...event,
        id: occ.id,
        startDate: new Date(occ.startDate),
        endDate: occ.endDate ? new Date(occ.endDate) : null,
        recurring: null,
        recurringDays: null,
        recurringTime: null,
      }))
    );

    return [...oneTime, ...expandedRecurring].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  } catch {
    return [];
  }
}

async function getLatestPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [homepage, events, posts] = await Promise.all([
    getHomepageContent(),
    getFeaturedEvents(),
    getLatestPosts(),
  ]);

  const hero = (homepage?.hero ?? defaultHero) as typeof defaultHero;
  const service = (homepage?.service ?? defaultService) as typeof defaultService;
  const hl = (homepage?.highlight ?? defaultHighlight) as typeof defaultHighlight;
  const sermonData = (homepage?.sermon ?? defaultSermon) as typeof defaultSermon;
  const cta = (homepage?.cta ?? defaultCta) as typeof defaultCta;
  const customSections = homepage?.customSections ?? [];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative bg-black text-white overflow-hidden" aria-label="Welcome to Calvary Lutheran Church">
        <div className="absolute inset-0">
          <Image src="/images/Calvary-Front-Yard-scaled.jpg" alt="Calvary Lutheran Church building on Dobson Road in Chandler AZ" fill className="object-cover object-right" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative container-wide mx-auto px-4 pt-14 pb-28 md:pt-20 md:pb-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-gold-500/30">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              {hero.welcomeLabel}
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              {hero.title}
              <br />
              <span className="text-gold-400">{hero.titleAccent}</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-100 mb-10 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={hero.primaryBtnLink}
                className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3.5 px-8 rounded-lg transition-colors inline-flex items-center gap-2 text-lg shadow-lg shadow-gold-500/25"
              >
                {hero.primaryBtnText}
                <FiArrowRight />
              </Link>
              <Link
                href={hero.secondaryBtnLink}
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-lg transition-colors inline-flex items-center gap-2 text-lg"
              >
                <FiPlay className="w-5 h-5" />
                {hero.secondaryBtnText}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="block w-full h-[60px] md:h-[120px]">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="#fefcf8" />
          </svg>
        </div>
      </section>

      {/* ── Service Times + Map ── */}
      <section className="py-8 md:py-12 px-4 bg-church-cream" aria-label="Service times and location">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{service.label}</span>
            <h2 className="mt-3 mb-4">{service.title}</h2>
            <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
              {service.description}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="grid grid-cols-1 gap-6">
              {service.times.map((st: { name: string; time: string; subtitle: string }, i: number) => (
                <article key={i} className="card p-6 flex items-center gap-5 border-l-4 border-gold-500">
                  <FiClock className="w-8 h-8 text-gold-500 shrink-0" />
                  <div>
                    <h3 className="text-lg mb-0.5">{st.name}</h3>
                    <p className="text-2xl font-heading font-bold text-navy-500">{st.time}</p>
                    <p className="text-secondary-400 text-sm mt-0.5">{st.subtitle}</p>
                  </div>
                </article>
              ))}
              <div className="flex items-center gap-2 text-secondary-500 text-sm px-2">
                <FiMapPin className="w-4 h-4 text-gold-500" />
                1270 N Dobson Rd, Chandler, AZ 85224
              </div>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src="https://maps.google.com/maps?q=1270+N+Dobson+Rd,+Chandler,+AZ+85224&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Calvary Lutheran Church location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Ministry Highlights ── */}
      <section className="py-8 md:py-12 px-4 bg-church-light" aria-label="Ministries and programs at Calvary">
        <div className="container-wide mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{hl.label}</span>
            <h2 className="mt-3 mb-4">{hl.title}</h2>
            <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
              {hl.description}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-14">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg ring-4 ring-gold-500/30 hover:ring-gold-500/60 transition-all hover:scale-105">
              <Image src="/images/christmas.jpg" alt="Christmas celebration at Calvary Lutheran Church Chandler" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg ring-4 ring-gold-500/30 hover:ring-gold-500/60 transition-all hover:scale-105">
              <Image src="/images/church-event.webp" alt="Church event at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg ring-4 ring-gold-500/30 hover:ring-gold-500/60 transition-all hover:scale-105">
              <Image src="/images/childrens-message.webp" alt="Children's message at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg ring-4 ring-gold-500/30 hover:ring-gold-500/60 transition-all hover:scale-105">
              <Image src="/images/playground.jpg" alt="Playground at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg ring-4 ring-gold-500/30 hover:ring-gold-500/60 transition-all hover:scale-105">
              <Image src="/images/bible-study.jpg" alt="Bible study at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg ring-4 ring-gold-500/30 hover:ring-gold-500/60 transition-all hover:scale-105">
              <Image src="/images/sunday-school.webp" alt="Sunday school at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hl.items.map((item: { title: string; description: string; link: string; icon: string }) => {
              const Icon = iconMap[item.icon] || FiBookOpen;
              return (
                <Link key={item.title} href={item.link} className="card p-8 group border-b-4 border-transparent hover:border-gold-500 transition-all">
                  <div className="w-14 h-14 bg-navy-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-500/10 transition-colors">
                    <Icon className="w-7 h-7 text-navy-500 group-hover:text-gold-600 transition-colors" />
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-navy-500 transition-colors">{item.title}</h3>
                  <p className="text-secondary-400 text-sm leading-relaxed">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="py-8 md:py-12 px-4 bg-church-cream" aria-label="Upcoming church events in Chandler AZ">
        <div className="container-wide mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Upcoming</span>
              <h2 className="mt-3">Upcoming Events</h2>
            </div>
            <Link href="/events" className="hidden md:inline-flex items-center gap-2 text-navy-500 hover:text-gold-600 font-semibold transition-colors">
              View All Events <FiArrowRight />
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <FiCalendar className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400 mb-2">No upcoming events</h3>
              <p className="text-secondary-400">Check back soon or follow us on Facebook for announcements.</p>
            </div>
          ) : (
            <EventGrid events={events} perPage={8} />
          )}
        </div>
      </section>

      {/* ── Latest Blog Posts ── */}
      <section className="py-8 md:py-12 px-4 bg-white" aria-label="Latest blog posts from Calvary Lutheran Church">
        <div className="container-wide mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">From Our Blog</span>
              <h2 className="mt-3">Latest Posts</h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-navy-500 hover:text-gold-600 font-semibold transition-colors">
              View All Posts <FiArrowRight />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-church-light rounded-xl border border-gray-100">
              <FiBookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400 mb-2">No blog posts yet</h3>
              <p className="text-secondary-400">Blog posts will appear here once published.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card group">
                  {post.featuredImage ? (
                    <div className="aspect-[16/10] bg-church-light overflow-hidden relative">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center">
                      <span className="text-white/20 font-heading text-6xl font-bold">CLC</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-secondary-400 mb-3">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="w-3.5 h-3.5 text-gold-500" />
                          {format(new Date(post.publishedAt), "MMM d, yyyy")}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <FiUser className="w-3.5 h-3.5 text-gold-500" />
                        {post.author.name}
                      </span>
                    </div>
                    <h3 className="text-lg mb-2 group-hover:text-navy-500 transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="text-secondary-400 text-sm line-clamp-2">{post.excerpt}</p>}
                    <span className="inline-flex items-center gap-1 text-gold-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      Read More <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="btn-outline">View All Posts <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ── Sermon / Video ── */}
      <section className="py-8 md:py-12 px-4 bg-church-light" aria-label="Watch recent sermons from Calvary Lutheran Church">
        <div className="container-wide mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{sermonData.label}</span>
              <h2 className="mt-3 mb-4">{sermonData.title}</h2>
              <p className="text-secondary-500 text-lg mb-6 leading-relaxed">
                {sermonData.description}
              </p>
              <Link href={sermonData.buttonLink} className="btn-secondary">
                {sermonData.buttonText} <FiArrowRight />
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="relative">
                {/* Main image with rounded corners */}
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl relative">
                  <Image src="/images/Chruch-Empty-Photo.jpg" alt="Inside Calvary Lutheran Church sanctuary in Chandler AZ" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                {/* Decorative circular cutout overlay */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold-500/40 overflow-hidden shadow-2xl">
                  <Image src="/images/stained-glass.jpg" alt="Stained glass at Calvary Lutheran Church" fill className="object-cover" sizes="160px" />
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-navy-500/30 bg-navy-500/20 backdrop-blur-sm flex items-center justify-center">
                  <FiPlay className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Sections ── */}
      {customSections.map((section: { id: string; title: string; content: string; bgColor: string }) => (
        <section key={section.id} className={`section-padding ${section.bgColor}`}>
          <div className="container-wide mx-auto">
            {section.title && <h2 className="text-center mb-8">{section.title}</h2>}
            <div className="prose-church max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="relative bg-navy-500 text-white py-8 md:py-12 px-4 overflow-hidden" aria-label="Visit Calvary Lutheran Church in Chandler Arizona">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-wide mx-auto text-center">
          <h2 className="text-white mb-4">{cta.title}</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            {cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={cta.primaryBtnLink} className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-gold-500/25">
              {cta.primaryBtnText}
            </Link>
            <Link href={cta.secondaryBtnLink} className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
              {cta.secondaryBtnText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

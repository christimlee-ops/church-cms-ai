import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const defaults = {
  heroSection: {
    welcomeLabel: "Welcome to Calvary",
    title: "Grow in Grace.",
    titleAccent: "Know Your Savior.",
    description:
      "God's love for the world is a gift for all people — shown through Jesus Christ's life, death, and resurrection. You're welcome here.",
    primaryBtnText: "Plan Your Visit",
    primaryBtnLink: "/visit",
    secondaryBtnText: "Watch Sermons",
    secondaryBtnLink: "/sermons",
  },
  serviceSection: {
    label: "Join Us This Week",
    title: "Worship & Study Schedule",
    description:
      "All are welcome — whether you've been a Lutheran your whole life or are stepping into a church for the first time.",
    times: [
      {
        name: "Saturday Worship",
        time: "6:00 PM",
        subtitle: "Scripture, music & proclamation",
      },
      {
        name: "Sunday Worship",
        time: "9:00 AM",
        subtitle: "Scripture, music & proclamation",
      },
      {
        name: "Bible Study & Sunday School",
        time: "10:30 AM",
        subtitle: "All ages — toddlers to adults",
      },
      {
        name: "Confirmation",
        time: "11:30 AM",
        subtitle: "7th & 8th grade catechism",
      },
    ],
  },
  highlightSection: {
    label: "Get Connected",
    title: "Life at Calvary",
    description:
      "From Saturday and Sunday worship to Bible studies, Mornings with Mommy, and Confirmation, there are many ways to grow in faith and community.",
    items: [
      {
        title: "Weekend Worship",
        description:
          "Christ and Him crucified are at the center of our worship every Saturday at 6:00 PM and Sunday at 9:00 AM with Scripture readings, music, and pastoral proclamation of God's Word.",
        link: "/sermons",
        icon: "FiBookOpen",
      },
      {
        title: "Bible Study & Sunday School",
        description:
          "Grow in the grace and knowledge of our Lord at 10:30 AM. Classes for all ages, from toddlers through adults.",
        link: "/education",
        icon: "FiBook",
      },
      {
        title: "Mornings with Mommy",
        description:
          "A Christ-centered ministry for children ages 0-6 and their caregivers, held the 1st Tuesday of each month.",
        link: "/education/mornings-with-mommy",
        icon: "FiUsers",
      },
      {
        title: "Community & Fellowship",
        description:
          "Connect with a caring congregation rooted in God's Word. We welcome visitors and new members warmly.",
        link: "/contact",
        icon: "FiHeart",
      },
    ],
  },
  sermonSection: {
    label: "This Week's Message",
    title: "Watch Our Latest Sermon",
    description:
      "Missed a service? Our sermons are available online so you can stay connected with God's Word throughout the week.",
    buttonText: "View All Sermons",
    buttonLink: "/sermons",
  },
  ctaSection: {
    title: "New to Chandler? Visiting for the First Time?",
    description:
      "Whether you've been a Lutheran your whole life or are just beginning to explore the Christian faith, we'd love to welcome you. Our guests should not feel compelled to give — just come and receive God's grace.",
    primaryBtnText: "Plan Your Visit",
    primaryBtnLink: "/visit",
    secondaryBtnText: "Contact Pastor Spaude",
    secondaryBtnLink: "/contact",
  },
};

export async function GET() {
  try {
    let content = await prisma.homepageContent.findUnique({
      where: { id: "default" },
    });

    if (!content) {
      content = await prisma.homepageContent.create({
        data: {
          id: "default",
          heroSection: defaults.heroSection,
          serviceSection: defaults.serviceSection,
          highlightSection: defaults.highlightSection,
          sermonSection: defaults.sermonSection,
          ctaSection: defaults.ctaSection,
        },
      });
    }

    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch homepage content" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const content = await prisma.homepageContent.upsert({
      where: { id: "default" },
      update: {
        heroSection: body.heroSection,
        serviceSection: body.serviceSection,
        highlightSection: body.highlightSection,
        sermonSection: body.sermonSection,
        ctaSection: body.ctaSection,
      },
      create: {
        id: "default",
        heroSection: body.heroSection ?? defaults.heroSection,
        serviceSection: body.serviceSection ?? defaults.serviceSection,
        highlightSection: body.highlightSection ?? defaults.highlightSection,
        sermonSection: body.sermonSection ?? defaults.sermonSection,
        ctaSection: body.ctaSection ?? defaults.ctaSection,
      },
    });

    return NextResponse.json(content);
  } catch {
    return NextResponse.json(
      { error: "Failed to update homepage content" },
      { status: 500 }
    );
  }
}

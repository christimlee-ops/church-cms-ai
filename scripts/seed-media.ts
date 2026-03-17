import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Map of old flat paths to new subfolder paths
const pathMigrations: Record<string, string> = {
  "/images/Saturday-Worship-Service-1.webp": "/images/events/Saturday-Worship-Service-1.webp",
  "/images/Sunday-Worship-Service-2.webp": "/images/events/Sunday-Worship-Service-2.webp",
  "/images/bible-class-creative.webp": "/images/events/bible-class-creative.webp",
  "/images/book-club.webp": "/images/events/book-club.webp",
  "/images/church-council-meeting-2.webp": "/images/events/church-council-meeting-2.webp",
  "/images/evangelism-stewardship-meeting-2.webp": "/images/events/evangelism-stewardship-meeting-2.webp",
  "/images/family-bible-hour-1-1024x683.webp": "/images/events/family-bible-hour-1-1024x683.webp",
  "/images/Lent-Dinner.webp": "/images/events/Lent-Dinner.webp",
  "/images/Mens-Group.webp": "/images/events/Mens-Group.webp",
  "/images/Quarthaus-logo.webp": "/images/events/Quarthaus-logo.webp",
  "/images/ChatGPT-Image-Feb-7-2026-01_34_22-PM.webp": "/images/events/ChatGPT-Image-Feb-7-2026-01_34_22-PM.webp",
  "/images/ChatGPT-Image-Feb-8-2026-06_34_05-AM.webp": "/images/events/ChatGPT-Image-Feb-8-2026-06_34_05-AM.webp",
  "/images/ChatGPT-Image-Feb-8-2026-06_40_12-AM.webp": "/images/events/ChatGPT-Image-Feb-8-2026-06_40_12-AM.webp",
  "/images/ChatGPT-Image-Feb-8-2026-06_44_29-AM.webp": "/images/events/ChatGPT-Image-Feb-8-2026-06_44_29-AM.webp",
  "/images/ChatGPT-Image-Feb-8-2026-06_49_33-AM.webp": "/images/events/ChatGPT-Image-Feb-8-2026-06_49_33-AM.webp",
  // Pages images
  "/images/childrens-message.webp": "/images/pages/childrens-message.webp",
  "/images/christmas.jpg": "/images/pages/christmas.jpg",
  "/images/Chruch-Empty-Photo.jpg": "/images/pages/Chruch-Empty-Photo.jpg",
  "/images/church-event.webp": "/images/pages/church-event.webp",
  "/images/playground.jpg": "/images/pages/playground.jpg",
  "/images/bible-study.jpg": "/images/pages/bible-study.jpg",
  "/images/sunday-school.webp": "/images/pages/sunday-school.webp",
  "/images/cross-front.jpg": "/images/pages/cross-front.jpg",
  "/images/stain.jpg": "/images/pages/stain.jpg",
  "/images/worship-service.jpg": "/images/pages/worship-service.jpg",
  "/images/Synod2-1024x1024-1.png": "/images/pages/Synod2-1024x1024-1.png",
  "/images/columbarium.jpg": "/images/pages/columbarium.jpg",
  "/images/mailbox.jpg": "/images/pages/mailbox.jpg",
  "/images/Window.jpg": "/images/pages/Window.jpg",
  "/images/final_m1624a02d2e54bb2.484022011-edited-1024x1024-1.jpg": "/images/pages/final_m1624a02d2e54bb2.484022011-edited-1024x1024-1.jpg",
  // Headers
  "/images/alter.jpg": "/images/headers/alter.jpg",
  "/images/books-1.jpg": "/images/headers/books-1.jpg",
  "/images/brass.jpg": "/images/headers/brass.jpg",
  "/images/candles.jpg": "/images/headers/candles.jpg",
  "/images/church.jpg": "/images/headers/church.jpg",
  "/images/classroom-smaller-kids.jpg": "/images/headers/classroom-smaller-kids.jpg",
  "/images/closed-book.jpg": "/images/headers/closed-book.jpg",
  "/images/Flowers.jpg": "/images/headers/Flowers.jpg",
  "/images/Hymn.jpg": "/images/headers/Hymn.jpg",
  "/images/multiple-bibles.jpg": "/images/headers/multiple-bibles.jpg",
  "/images/Piano.jpg": "/images/headers/Piano.jpg",
  "/images/sacrament.jpg": "/images/headers/sacrament.jpg",
  "/images/seats.jpg": "/images/headers/seats.jpg",
  "/images/stained-glass.jpg": "/images/headers/stained-glass.jpg",
  // Staff
  "/images/Pastor.jpg": "/images/staff/Pastor.jpg",
  "/images/PastorSprain.jpg": "/images/staff/PastorSprain.jpg",
};

function getMimeType(ext: string): string {
  const mimes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return mimes[ext.toLowerCase()] || "application/octet-stream";
}

function humanName(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\d{3,}x\d{3,}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  console.log("=== Step 1: Fix event featured image paths ===");

  const events = await prisma.event.findMany({ select: { id: true, title: true, featuredImage: true } });
  let fixed = 0;
  for (const event of events) {
    if (event.featuredImage && pathMigrations[event.featuredImage]) {
      const newPath = pathMigrations[event.featuredImage];
      await prisma.event.update({
        where: { id: event.id },
        data: { featuredImage: newPath },
      });
      console.log(`  Fixed: "${event.title}" → ${newPath}`);
      fixed++;
    }
  }
  console.log(`  ${fixed} event image paths updated.\n`);

  // Also fix blog post images
  console.log("=== Step 2: Fix blog post featured image paths ===");
  const posts = await prisma.blogPost.findMany({ select: { id: true, title: true, featuredImage: true } });
  let fixedPosts = 0;
  for (const post of posts) {
    if (post.featuredImage && pathMigrations[post.featuredImage]) {
      const newPath = pathMigrations[post.featuredImage];
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { featuredImage: newPath },
      });
      console.log(`  Fixed: "${post.title}" → ${newPath}`);
      fixedPosts++;
    }
  }
  console.log(`  ${fixedPosts} blog post image paths updated.\n`);

  console.log("=== Step 3: Add images to Media library ===");
  const folders = ["headers", "staff", "pages", "events"];
  const rootFiles = ["Calvary-Front-Yard-scaled.jpg", "calvary-lutheren-chruch-blue-logo.png", "calvary-lutheren-chruch-white-logo.png"];
  let added = 0;
  let skipped = 0;

  // Root images
  for (const f of rootFiles) {
    const filePath = path.join("images", f);
    const url = `/images/${f}`;
    if (!fs.existsSync(filePath)) continue;

    const existing = await prisma.media.findFirst({ where: { url } });
    if (existing) { skipped++; continue; }

    const stat = fs.statSync(filePath);
    const ext = path.extname(f);
    await prisma.media.create({
      data: {
        filename: f,
        url,
        mimeType: getMimeType(ext),
        size: stat.size,
        alt: humanName(f),
        caption: "Homepage",
      },
    });
    added++;
    console.log(`  Added: ${url}`);
  }

  // Subfolder images
  for (const folder of folders) {
    const dir = path.join("images", folder);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const f of files) {
      const filePath = path.join(dir, f);
      const url = `/images/${folder}/${f}`;

      const existing = await prisma.media.findFirst({ where: { url } });
      if (existing) { skipped++; continue; }

      const stat = fs.statSync(filePath);
      const ext = path.extname(f);
      const isAI = f.startsWith("ChatGPT-Image");

      await prisma.media.create({
        data: {
          filename: f,
          url,
          mimeType: getMimeType(ext),
          size: stat.size,
          alt: humanName(f),
          caption: folder.charAt(0).toUpperCase() + folder.slice(1),
          aiGenerated: isAI,
        },
      });
      added++;
      console.log(`  Added: ${url} [${folder}]`);
    }
  }

  console.log(`\n  ${added} images added to media library.`);
  console.log(`  ${skipped} images already existed (skipped).`);
  console.log("\n=== Done ===");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

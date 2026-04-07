/**
 * compress-images.mjs
 * Nén toàn bộ ảnh trong /public/images/ bằng Sharp
 * - JPEG → quality 82, progressive
 * - PNG  → quality 85, progressive
 * - WebP → quality 82
 * Giữ nguyên file gốc với suffix .orig (backup)
 */

import sharp from "sharp";
import { readdirSync, statSync, renameSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const IMAGES_DIR = decodeURIComponent(new URL("../public/images", import.meta.url).pathname);
const JPEG_Q   = 82;
const PNG_Q    = 85;
const WEBP_Q   = 82;

const files = readdirSync(IMAGES_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

console.log(`\n🖼  Tìm thấy ${files.length} ảnh — bắt đầu nén...\n`);

let totalBefore = 0;
let totalAfter  = 0;
let skipped     = 0;

for (const file of files) {
  const filePath = join(IMAGES_DIR, file);
  const ext      = extname(file).toLowerCase();
  const origPath = filePath + ".orig";

  // Nếu đã có backup → bỏ qua (đã nén lần trước)
  if (existsSync(origPath)) {
    skipped++;
    continue;
  }

  const beforeSize = statSync(filePath).size;
  totalBefore += beforeSize;

  try {
    // Đọc ảnh gốc vào buffer
    let pipeline = sharp(filePath);

    let outputBuffer;
    if (ext === ".jpg" || ext === ".jpeg") {
      outputBuffer = await pipeline
        .jpeg({ quality: JPEG_Q, progressive: true, mozjpeg: true })
        .toBuffer();
    } else if (ext === ".png") {
      outputBuffer = await pipeline
        .png({ quality: PNG_Q, progressive: true, compressionLevel: 9 })
        .toBuffer();
    } else if (ext === ".webp") {
      outputBuffer = await pipeline
        .webp({ quality: WEBP_Q })
        .toBuffer();
    } else {
      continue;
    }

    const afterSize = outputBuffer.length;

    // Chỉ ghi đè nếu nhỏ hơn (không làm ảnh to hơn)
    if (afterSize < beforeSize) {
      // Backup gốc
      renameSync(filePath, origPath);
      // Ghi file nén
      await sharp(outputBuffer).toFile(filePath);
      totalAfter += afterSize;

      const saved   = beforeSize - afterSize;
      const pct     = ((saved / beforeSize) * 100).toFixed(1);
      console.log(`  ✅ ${file.padEnd(50)} ${fmt(beforeSize)} → ${fmt(afterSize)} (-${pct}%)`);
    } else {
      // Ảnh đã tối ưu sẵn, giữ nguyên
      totalAfter += beforeSize;
      console.log(`  ⏭  ${file.padEnd(50)} ${fmt(beforeSize)} (đã tối ưu)`);
    }
  } catch (err) {
    totalAfter += beforeSize;
    console.warn(`  ⚠️  ${file}: ${err.message}`);
  }
}

const savedTotal = totalBefore - totalAfter;
const savedPct   = totalBefore > 0 ? ((savedTotal / totalBefore) * 100).toFixed(1) : 0;

console.log(`\n${"─".repeat(70)}`);
console.log(`📦 Trước : ${fmt(totalBefore)}`);
console.log(`📦 Sau   : ${fmt(totalAfter)}`);
console.log(`💾 Tiết kiệm: ${fmt(savedTotal)} (${savedPct}%)`);
if (skipped > 0) console.log(`⏭  Bỏ qua (đã nén): ${skipped} ảnh`);
console.log(`\n✨ Xong! Backup gốc lưu tại *.orig (xoá nếu hài lòng)\n`);

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
  if (bytes >= 1024)        return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

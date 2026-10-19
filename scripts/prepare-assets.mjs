import { readFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = fileURLToPath(new URL("../../docs/", import.meta.url));
const target = fileURLToPath(new URL("../public/images/", import.meta.url));
await mkdir(target, { recursive: true });

// Read only the flattened composite of the supplied, 8-bit CMYK PSDs.
// Preserve their ICC profile in an intermediate in-memory TIFF so libvips
// performs the colour conversion instead of approximating CMYK in JavaScript.
async function psdComposite(filename) {
  const data = await readFile(`${source}/${filename}`);
  if (data.toString("ascii", 0, 4) !== "8BPS" || data.readUInt16BE(4) !== 1)
    throw new Error(`Unsupported PSD: ${filename}`);
  const channels = data.readUInt16BE(12);
  const height = data.readUInt32BE(14);
  const width = data.readUInt32BE(18);
  if (
    data.readUInt16BE(22) !== 8 ||
    data.readUInt16BE(24) !== 4 ||
    channels !== 4
  )
    throw new Error(`Expected 8-bit CMYK composite: ${filename}`);
  let offset = 26;
  const colorLength = data.readUInt32BE(offset);
  offset += 4 + colorLength;
  const resourceLength = data.readUInt32BE(offset);
  offset += 4;
  const endResources = offset + resourceLength;
  let profile;
  while (offset + 12 <= endResources) {
    const id = data.readUInt16BE(offset + 4);
    offset += 6;
    const nameLength = data[offset];
    offset += Math.ceil((nameLength + 1) / 2) * 2;
    const length = data.readUInt32BE(offset);
    offset += 4;
    if (id === 1039) profile = data.subarray(offset, offset + length);
    offset += length + (length % 2);
  }
  offset = endResources;
  const layerLength = data.readUInt32BE(offset);
  offset += 4 + layerLength;
  const compression = data.readUInt16BE(offset);
  offset += 2;
  const planeSize = width * height;
  const planes = Buffer.alloc(planeSize * channels);
  if (compression === 0) {
    if (data.length - offset < planes.length)
      throw new Error("Truncated PSD composite");
    data.copy(planes, 0, offset, offset + planes.length);
  } else if (compression === 1) {
    const rowTable = offset;
    offset += channels * height * 2;
    for (let row = 0; row < channels * height; row++) {
      const rowEnd = offset + data.readUInt16BE(rowTable + row * 2);
      let output = row * width;
      const expectedEnd = output + width;
      while (offset < rowEnd) {
        const count = data.readInt8(offset++);
        if (count >= 0) {
          const length = count + 1;
          if (output + length > expectedEnd || offset + length > rowEnd)
            throw new Error("Invalid PSD RLE literal");
          data.copy(planes, output, offset, offset + length);
          offset += length;
          output += length;
        } else if (count !== -128) {
          const length = 1 - count;
          if (output + length > expectedEnd || offset >= rowEnd)
            throw new Error("Invalid PSD RLE run");
          planes.fill(data[offset++], output, output + length);
          output += length;
        }
      }
      if (output !== expectedEnd) throw new Error("Unexpected PSD row width");
    }
  } else throw new Error(`Unsupported PSD compression: ${compression}`);

  const tags = [
    [256, 4, 1, width],
    [257, 4, 1, height],
    [258, 3, 4, 0],
    [259, 3, 1, 1],
    [262, 3, 1, 5],
    [273, 4, 1, 0],
    [277, 3, 1, 4],
    [278, 4, 1, height],
    [279, 4, 1, planes.length],
    [284, 3, 1, 1],
    [332, 3, 1, 1],
  ];
  if (profile) tags.push([34675, 7, profile.length, 0]);
  const bitsOffset = 8 + 2 + tags.length * 12 + 4;
  const profileOffset = bitsOffset + 8;
  const pixelOffset =
    Math.ceil((profileOffset + (profile?.length ?? 0)) / 2) * 2;
  const tiff = Buffer.alloc(pixelOffset + planes.length);
  tiff.write("II", 0);
  tiff.writeUInt16LE(42, 2);
  tiff.writeUInt32LE(8, 4);
  tiff.writeUInt16LE(tags.length, 8);
  tags.forEach(([id, type, count, value], index) => {
    const start = 10 + index * 12;
    tiff.writeUInt16LE(id, start);
    tiff.writeUInt16LE(type, start + 2);
    tiff.writeUInt32LE(count, start + 4);
    tiff.writeUInt32LE(
      id === 258
        ? bitsOffset
        : id === 273
          ? pixelOffset
          : id === 34675
            ? profileOffset
            : value,
      start + 8,
    );
  });
  for (let channel = 0; channel < 4; channel++)
    tiff.writeUInt16LE(8, bitsOffset + channel * 2);
  if (profile) profile.copy(tiff, profileOffset);
  for (let pixel = 0; pixel < planeSize; pixel++) {
    for (let channel = 0; channel < 4; channel++)
      tiff[pixelOffset + pixel * 4 + channel] =
        255 - planes[channel * planeSize + pixel];
  }
  return tiff;
}

// This supplied TIFF includes large Photoshop layer tags. The file is trusted
// local artwork, so allow libtiff to read its metadata beyond the default cap.
await sharp(`${source}/Natubras_DF5P8553_OK_recorte_capa.tif`, {
  unlimited: true,
})
  .resize({ width: 2000, withoutEnlargement: true })
  .webp({ quality: 86 })
  .toFile(`${target}/prato-natubras.webp`);
await sharp(`${source}/Natubras_DF5P8553_OK_recorte_capa.tif`, {
  unlimited: true,
})
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 86 })
  .toFile(`${target}/natubras-social.jpg`);
for (const [input, output, width] of [
  ["Foto Natubras Aerea.psd", "empresa-natubras.webp", 908],
  ["DF5P8494_ok_merge.psd", "peixes-natubras.webp", 1200],
  ["DF5P8522_FINAL.psd", "frutos-do-mar-natubras.webp", 1200],
]) {
  await sharp(await psdComposite(input))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(`${target}/${output}`);
}
for (const name of [
  "prato-natubras.webp",
  "empresa-natubras.webp",
  "peixes-natubras.webp",
  "frutos-do-mar-natubras.webp",
  "natubras-social.jpg",
])
  console.log(
    `${name}: ${Math.round((await stat(`${target}/${name}`)).size / 1024)} KB`,
  );

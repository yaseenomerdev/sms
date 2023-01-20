export const imageExt = [
  "ase",
  "art",
  "bmp",
  "blp",
  "cd5",
  "cit",
  "cpt",
  "cr2",
  "cut",
  "dds",
  "dib",
  "djvu",
  "egt",
  "exif",
  "gif",
  "gpl",
  "grf",
  "icns",
  "ico",
  "iff",
  "jng",
  "jpeg",
  "jpg",
  "jfif",
  "jp2",
  "jps",
  "lbm",
  "max",
  "miff",
  "mng",
  "msp",
  "nef",
  "nitf",
  "ota",
  "pbm",
  "pc1",
  "pc2",
  "pc3",
  "pcf",
  "pcx",
  "pdn",
  "pgm",
  "PI1",
  "PI2",
  "PI3",
  "pict",
  "pct",
  "pnm",
  "pns",
  "ppm",
  "psb",
  "psd",
  "pdd",
  "psp",
  "px",
  "pxm",
  "pxr",
  "qfx",
  "raw",
  "rle",
  "sct",
  "sgi",
  "rgb",
  "int",
  "bw",
  "tga",
  "tiff",
  "tif",
  "vtf",
  "xbm",
  "xcf",
  "xpm",
  "3dv",
  "amf",
  "ai",
  "awg",
  "cgm",
  "cdr",
  "cmx",
  "dxf",
  "e2d",
  "egt",
  "eps",
  "fs",
  "gbr",
  "odg",
  "svg",
  "stl",
  "vrml",
  "x3d",
  "sxd",
  "v2d",
  "vnd",
  "wmf",
  "emf",
  "art",
  "xar",
  "png",
  "webp",
  "jxr",
  "hdp",
  "wdp",
  "cur",
  "ecw",
  "iff",
  "lbm",
  "liff",
  "nrrd",
  "pam",
  "pcx",
  "pgf",
  "sgi",
  "rgb",
  "rgba",
  "bw",
  "int",
  "inta",
  "sid",
  "ras",
  "sun",
  "tga",
  "heic",
  "heif",
];

export const wordExt = ["docx", "doc"];

export const excelExt = ["xlsx", "xlsm", "xlsb", "xltx", "xls"];

export const pdfExt = ["pdf"];

export const getFileType = (url: string): FileType => {
  const ext = getUrlEextension(url);

  if (!ext) return { url, type: "empty" };

  const type = getFileTypeByExt(ext);

  return { url, type };
};

export const getUrlEextension = (url: string): string | undefined => {
  return url.split(/[#?]/)[0].split(".").pop()?.trim();
};

const getFileTypeByExt = (ext: string): FileType["type"] => {
  if (imageExt.includes(ext)) return "image";
  if (wordExt.includes(ext)) return "doc";
  if (excelExt.includes(ext)) return "xls";
  if (pdfExt.includes(ext)) return "pdf";
  return "empty";
};

export interface FileType {
  url: string;
  type: "image" | "doc" | "xls" | "pdf" | "empty";
}

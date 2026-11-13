// Single source of truth for business details used across every page.
// Change a value here and it updates the whole site.

export const SITE = {
  name: "WhichwoodFitters",
  legalName: "WhichwoodFitters (Pty) Ltd",
  regNo: "2019/540120/07",
  tagline: "Smart · Reliable · Professional",
  url: "https://www.whichwood.co.za",
  email: "admin@whichwood.co.za",
  displayPhone: "079 910 1465",
  intlPhone: "+27 79 910 1465",
  whatsappNumber: "27799101465",
  locality: "Sinoville, Pretoria",
  region: "Gauteng",
  country: "ZA"
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailLink(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const DEFAULT_WHATSAPP = whatsappLink(
  "Hi WhichwoodFitters, I would like a quote. I can send photos, measurements or drawings."
);

export const DEFAULT_MAIL = mailLink(
  "Quote request - WhichwoodFitters",
  "Hi WhichwoodFitters,\n\nI would like a quote.\n\nProject type:\nMeasurements / drawings:\nPhotos attached:\nLocation:\n\nThank you."
);

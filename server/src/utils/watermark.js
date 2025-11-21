import { readFile } from 'fs/promises';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

const ownerPassword = process.env.PDF_OWNER_PASSWORD || process.env.SERVER_URL || 'stackflow.dev';

export async function generateWatermarkedPdf({
  sourcePath,
  buyerName,
  email,
  orderId,
  antiPiracyCode,
  productTitle
}) {
  const pdfBytes = await readFile(sourcePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const normalizedName = buyerName?.trim() || email?.split('@')[0] || 'Valued Buyer';
  const watermarkText = [
    `Buyer: ${normalizedName}`,
    `Email: ${email}`,
    `Order: ${orderId}`,
    antiPiracyCode ? `Leak ID: ${antiPiracyCode}` : ''
  ]
    .filter(Boolean)
    .join(' • ');

  if (productTitle) pdfDoc.setTitle(`${productTitle} – secure copy`);
  pdfDoc.setAuthor('stackflow.dev');
  pdfDoc.setSubject('Secure watermarked delivery');
  pdfDoc.setKeywords(['stackflow.dev', 'watermarked', antiPiracyCode || '', email || '']);
  pdfDoc.setProducer('stackflow.dev DRM layer');
  pdfDoc.setCreator('stackflow.dev watermark service');

  const angle = degrees(-35);
  const stepX = 180;
  const stepY = 140;

  pdfDoc.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    for (let x = -width; x < width * 1.5; x += stepX) {
      for (let y = -height; y < height * 1.5; y += stepY) {
        page.drawText(watermarkText, {
          x,
          y,
          rotate: angle,
          size: 18,
          font,
          color: rgb(0.6, 0.6, 0.6),
          opacity: 0.1
        });
      }
    }

    page.drawText(`Tracking ID: ${antiPiracyCode || 'N/A'}`, {
      x: 36,
      y: 36,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
      opacity: 0.5
    });
  });

  if (typeof pdfDoc.encrypt === 'function') {
    try {
      pdfDoc.encrypt({
        ownerPassword,
        permissions: {
          printing: 'lowResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: false,
          documentAssembly: false
        }
      });
    } catch (error) {
      console.warn('PDF encryption failed, continuing without copy protection.', error);
    }
  }

  return pdfDoc.save();
}


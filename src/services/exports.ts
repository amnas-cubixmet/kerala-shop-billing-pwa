import { PDFDocument } from 'pdf-lib';
import type { Invoice, InvoiceItem, Shop } from '@/types/models';
import { fmt, qtyText } from '@/lib/money';

function saveBlob(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function escapeCsv(value: unknown): string {
  const str = String(value ?? '');
  // Prevent Excel formula injection for user-generated fields.
  const safe = /^[\s]*[=+@\-\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}
export function downloadCSV(name: string, rows: (string | number)[][]) {
  const content = '\uFEFF' + rows.map(row => row.map(escapeCsv).join(',')).join('\r\n');
  saveBlob(name, new Blob([content], { type: 'text/csv;charset=utf-8' }));
}
// Canvas uses the browser's own fonts so Malayalam shop names render in the PDF.
export async function downloadReceipt(invoice: Invoice, lines: InvoiceItem[], shop: Shop): Promise<void> {
  const width = 720, pad = 48;
  const height = 420 + lines.length * 72 + (shop.address ? 42 : 0) + (shop.gstin ? 42 : 0);
  if (height > 30000) throw new Error('Receipt too long for PDF; export sales CSV instead.');
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not available.');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,width,height);
  ctx.fillStyle = '#142a26'; ctx.textBaseline = 'top';
  let y = 45;
  const line = (text: string, size = 26, bold = false, right = false) => {
    ctx.font = `${bold ? '700' : '400'} ${size}px system-ui, sans-serif`;
    ctx.textAlign = right ? 'right' : 'left';
    ctx.fillText(text, right ? width - pad : pad, y, width - 2 * pad);
  };
  line(shop.name, 34, true); y += 49;
  if (shop.address) { line(shop.address, 21); y += 42; }
  if (shop.gstin) { line(`GSTIN: ${shop.gstin}`, 21); y += 42; }
  line(`Invoice: ${invoice.number}`, 22, true); y += 34;
  line(`Date: ${invoice.date}`, 21); y += 34;
  line(`Customer: ${invoice.customerName}`, 21); y += 44;
  ctx.strokeStyle = '#d3ded9'; ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(width - pad, y); ctx.stroke(); y += 20;
  for (const item of lines) {
    line(item.name, 23, true); y += 30;
    line(`${qtyText(item.quantityMilli)} ${item.unit} x ${fmt(item.pricePaise)}   GST ${item.taxBps / 100}%`, 19);
    line(fmt(item.totalPaise), 23, true, true); y += 42;
  }
  y += 8; ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(width - pad, y); ctx.stroke(); y += 20;
  line(`Subtotal: ${fmt(invoice.subtotalPaise)}`, 22); y += 32;
  line(`Discount: ${fmt(invoice.discountPaise)}`, 22); y += 32;
  line(`Tax: ${fmt(invoice.taxPaise)}`, 22); y += 36;
  line(`TOTAL: ${fmt(invoice.totalPaise)}`, 30, true); y += 45;
  line(`Payment: ${invoice.paymentMethod.toUpperCase()}   ${invoice.status === 'void' ? 'VOID' : ''}`, 21);
  const pngBytes = await fetch(canvas.toDataURL('image/png')).then(r => r.arrayBuffer());
  const pdf = await PDFDocument.create();
  const w = 255, h = Math.ceil(height * w / width);
  const page = pdf.addPage([w, h]);
  const png = await pdf.embedPng(pngBytes);
  page.drawImage(png, { x: 0, y: 0, width: w, height: h });
  const bytes = await pdf.save();
  saveBlob(`${invoice.number}.pdf`, new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }));
}

import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'
import { OrderedProductsInfoResponseType } from "@/types/types";

const generateInvoice = (order: OrderedProductsInfoResponseType) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    const fontSize = 18;
    doc.setFontSize(fontSize);
    const docWidth = doc.internal.pageSize.getWidth();
    const text = 'Invoice';
    const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
    const x = (docWidth - textWidth) / 2;
    doc.text(text, x, 20);

    doc.setTextColor(0, 0, 0);
    doc.text('drapegear', 15, 40);
    const logoTextWidth = doc.getTextWidth('drapegear');

    doc.setFont('times', 'bold');
    doc.setFontSize(26)
    doc.setTextColor(6, 182, 212);
    doc.text('.', 15 + logoTextWidth, 40);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Date: ${order.createdAt}`, 15, 50);
    doc.text(`Order ID: ${order._id}`, 15, 58);
    doc.text(`Transaction ID: ${order.transactionId}`, 15, 66);
    doc.text(`Name: ${order.user_name}`, 15, 74);
    doc.text(`Email: ${order.user_email}`, 15, 82);
    doc.text(`Phone: ${order.shippingAddress.phone}`, 15, 90);
    doc.text(`Address: ${order.shippingAddress.address}`, 15, 98);

    autoTable(doc, {
        startY: 108,
        head: [['#', 'Product Name', 'Quantity', 'Price', 'Subtotal']],
        body: order.items.map((item, index) => [
            index + 1,
            item.name,
            item.quantity,
            `$${item.priceAtPurchase}`,
            `$${item.priceAtPurchase * item.quantity}`,
        ]),
        theme: 'grid',
        headStyles: { font: 'helvetica', fillColor: [0, 0, 0] },
        bodyStyles: { font: 'helvetica' }
    });

    const finalY = (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY || 100;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${order.totalAmount}`, 195, finalY + 10, { align: 'right' });

    doc.save(`invoice-${order._id}.pdf`);
};

export default generateInvoice;
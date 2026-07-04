package hospitalmanagement.controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import hospitalmanagement.entity.Billing;
import hospitalmanagement.repository.BillingRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URL;

@RestController
@RequestMapping("/pdf")
@CrossOrigin(origins="*")
public class PdfController {

    @Autowired
    private BillingRepository billingRepository;

    @GetMapping("/bill/{id}")
    public void downloadBill(@PathVariable Long id,
                             HttpServletResponse response) throws Exception {

        Billing bill = billingRepository.findById(id).orElseThrow();

        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=Premium_Bill_" + id + ".pdf"
        );

        Document document = new Document(PageSize.A4, 40, 40, 40, 40);
        PdfWriter writer =
                PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font titleWhite = new Font(
                Font.FontFamily.HELVETICA, 22, Font.BOLD, BaseColor.WHITE);

        Font heading = new Font(
                Font.FontFamily.HELVETICA, 14, Font.BOLD);

        Font normal = new Font(
                Font.FontFamily.HELVETICA, 12);

        Font bold = new Font(
                Font.FontFamily.HELVETICA, 12, Font.BOLD);

        // ================= HEADER =================
        PdfPTable header = new PdfPTable(1);
        header.setWidthPercentage(100);

        PdfPCell headCell = new PdfPCell(
                new Phrase("APOLLO STYLE CARE HOSPITAL", titleWhite));
        headCell.setBackgroundColor(new BaseColor(0,102,204));
        headCell.setPadding(20);
        headCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        headCell.setBorder(Rectangle.NO_BORDER);

        header.addCell(headCell);
        document.add(header);

        Paragraph sub = new Paragraph(
                "Excellence in Healthcare Since 2026\n" +
                "Bangalore | +91 9876543210 | hmscare@gmail.com",
                normal);
        sub.setAlignment(Element.ALIGN_CENTER);
        document.add(sub);

        document.add(new Paragraph(" "));

        // ================= RED PAID STAMP =================
        PdfContentByte canvas = writer.getDirectContentUnder();

        BaseFont bf = BaseFont.createFont(
                BaseFont.HELVETICA_BOLD,
                BaseFont.WINANSI,
                BaseFont.EMBEDDED);

        canvas.saveState();

        PdfGState gs = new PdfGState();
        gs.setFillOpacity(0.25f);
        canvas.setGState(gs);

        canvas.beginText();
        canvas.setColorFill(BaseColor.RED);
        canvas.setFontAndSize(bf, 90);
        canvas.showTextAligned(
                Element.ALIGN_CENTER,
                "PAID",
                300,
                450,
                45
        );
        canvas.endText();
        canvas.restoreState();

        // ================= BILL DETAILS =================
        Paragraph p = new Paragraph("Patient & Billing Details", heading);
        document.add(p);
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);

        table.addCell("Bill ID");
        table.addCell(String.valueOf(bill.getId()));

        table.addCell("Patient Name");
        table.addCell(bill.getPatient().getName());

        table.addCell("Patient ID");
        table.addCell(String.valueOf(bill.getPatient().getId()));

        table.addCell("Doctor Name");
        table.addCell(
                bill.getAppointment().getDoctor().getName());

        table.addCell("Doctor Specialization");
        table.addCell(
                bill.getAppointment().getDoctor().getSpecialization());

        table.addCell("Appointment ID");
        table.addCell(
                String.valueOf(bill.getAppointment().getId()));

        table.addCell("Date");
        table.addCell(
                String.valueOf(
                        bill.getAppointment().getAppointmentDate()));

        table.addCell("Time");
        table.addCell(
                String.valueOf(
                        bill.getAppointment().getAppointmentTime()));

        table.addCell("Amount");
        table.addCell("₹ " + bill.getAmount());

        table.addCell("Payment Status");
        table.addCell(bill.getPaymentStatus());

        table.addCell("Payment Method");
        table.addCell(bill.getPaymentMethod());

        document.add(table);
        document.add(new Paragraph(" "));

        // ================= QR CODE =================
        Paragraph qrTitle = new Paragraph("Verification QR", heading);
        document.add(qrTitle);

        String qrUrl =
                "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=BillID:"
                        + bill.getId();

        Image qr = Image.getInstance(new URL(qrUrl));
        qr.scaleAbsolute(100,100);
        qr.setAlignment(Image.ALIGN_CENTER);
        document.add(qr);

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Scan QR to verify bill", normal));

        document.add(new Paragraph(" "));
        document.add(new Paragraph(" "));

        // ================= FOOTER =================
        Paragraph thanks = new Paragraph(
                "Thank You For Visiting Our Hospital",
                heading);
        thanks.setAlignment(Element.ALIGN_CENTER);
        document.add(thanks);

        document.add(new Paragraph(" "));
        document.add(new Paragraph(
                "Doctor Signature: ____________________", bold));
        document.add(new Paragraph(
                "Authorized Signature: ________________", bold));
        document.add(new Paragraph(
                "Hospital Seal: _______________________", bold));

        document.add(new Paragraph(" "));
        Paragraph footer = new Paragraph(
                "Generated by HMS Premium Billing System | Designed by Guru",
                normal);
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();
    }
}
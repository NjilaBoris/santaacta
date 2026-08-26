// components/download-pdf-button.tsx
"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IconDownload, IconLoader2 } from "@tabler/icons-react";

type DownloadPdfButtonProps = {
  title: string;
  contentId: string; 
};

export function DownloadPdfButton({ title, contentId }: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const element = document.getElementById(contentId);
      if (!element) throw new Error("Content element not found");

      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true, 
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;

     
      const imgWidth = usableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let yOffset = 0;
      let heightLeft = imgHeight;
      let page = 0;

      while (heightLeft > 0) {
        if (page > 0) pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin - page * (pageHeight - margin * 2),
          imgWidth,
          imgHeight,
        );

        heightLeft -= pageHeight - margin * 2;
        yOffset += pageHeight - margin * 2;
        page++;
      }

      const filename = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 60);

      pdf.save(`${filename}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {loading ? (
        <IconLoader2 className="size-4 animate-spin" />
      ) : (
        <IconDownload className="size-4" />
      )}
      {loading ? "Generating PDF…" : "Download PDF"}
    </button>
  );
}
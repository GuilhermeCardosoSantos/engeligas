"use client";

export default function OSPrintStyles() {
  return (
    <style jsx global>{`
      .print-only {
        display: none;
      }

      .screen-preview {
        width: 100%;
        min-width: 1180px;
        background: white;
        color: black;
        border-radius: 12px;
        padding: 10px;
      
      }

      @page {
        size: A4 landscape;
        margin: 5mm;
      }

      @media print {
        html,
        body {
          width: 297mm;
          height: 210mm;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: white !important;
        }

        body * {
          visibility: hidden;
        }

        .print-only {
          display: block !important;
        }

        .print-only,
        .print-only * {
          visibility: visible;
        }

        .screen-preview {
          display: none !important;
        }

        .no-print {
          display: none !important;
        }

        .print-page {
          position: fixed;
          left: 0;
          top: 0;
          width: 287mm;
          height: 200mm;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: white !important;
          color: black !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }

        .print-block {
          margin: 0 !important;
          padding: 0 !important;
          page-break-before: avoid !important;
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
          break-before: avoid !important;
          break-after: avoid !important;
          break-inside: avoid !important;
        }
      }

      .print-page {
        background: white;
        color: black;
        font-family: Arial, Helvetica, sans-serif;
      }

      .print-block {
        width: 100%;
        margin-bottom: 0;
        page-break-inside: avoid;
      }

      .os-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        font-size: 9px;
        color: black;
        background: white;
      }

      .os-table th,
      .os-table td {
        border: 1px solid black;
        height: 19px;
        padding: 1px 3px;
        vertical-align: middle;
        line-height: 1.1;
      }

      .os-table th {
        background: #bfbfbf;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
      }

      .os-table tr.blue th,
      .os-table tr.blue td {
        background: #0070b8;
        color: black;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
      }

      .center {
        text-align: center;
      }

      .bold {
        font-weight: 700;
      }

      .big {
        font-size: 15px;
      }

      .gray {
        background: #bfbfbf;
      }

      .obs {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0.3px;
        text-transform: uppercase;
      }
    `}</style>
  );
}
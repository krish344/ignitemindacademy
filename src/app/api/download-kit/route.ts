import { NextResponse } from "next/server";
import { generatePDFBuffer } from "@/lib/pdf-generator";

// Force dynamic to avoid static rendering issues
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearLevel = searchParams.get("level") || "Year 5";

    const pdfBuffer = await generatePDFBuffer(yearLevel);
    
    // Convert Node Buffer to Uint8Array for Web compatibility
    const uint8Array = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="NAPLAN-Prep-Kit-${yearLevel.replace(" ", "-")}.pdf"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

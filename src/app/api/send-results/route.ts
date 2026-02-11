import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    // Dynamic import to avoid build-time errors
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { studentName, studentEmail, testType, grade, correctCount, totalQuestions, percentage, answers, questions } = await request.json();

    // Calculate topic breakdown
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};
    for (const q of questions) {
      const topic = q.topic;
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { correct: 0, total: 0 };
      }
      topicBreakdown[topic].total += 1;
      const studentAnswer = answers[q.id];
      if (studentAnswer === q.answerIndex) {
        topicBreakdown[topic].correct += 1;
      }
    }

    // Build HTML for topic breakdown
    let topicHtml = "";
    for (const [topic, data] of Object.entries(topicBreakdown)) {
      const topicPercent = Math.round((data.correct / data.total) * 100);
      topicHtml += `
        <tr>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">${topic}</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">${data.correct}/${data.total}</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold;">${topicPercent}%</td>
        </tr>
      `;
    }

    // HTML email for student
    const studentHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NAPLAN Test Results</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%); padding: 30px; border-radius: 16px 16px 0 0;">
            <h1 style="color: white; margin: 0;">NAPLAN Practice Test Results</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #1e293b; font-size: 18px;">Hi ${studentName},</p>
            <p style="color: #64748b;">Great job completing your NAPLAN practice test! Here are your results:</p>
            
            <div style="background: white; padding: 24px; border-radius: 12px; margin: 20px 0; text-align: center; border: 2px solid #e2e8f0;">
              <div style="font-size: 48px; font-weight: bold; color: ${percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444'};">${percentage}%</div>
              <div style="color: #64748b;">Score</div>
              <div style="color: #1e293b; margin-top: 8px;">${correctCount} out of ${totalQuestions} correct</div>
            </div>
            
            <h3 style="color: #1e293b;">Topic Breakdown</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Topic</th>
                  <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">Score</th>
                  <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">%</th>
                </tr>
              </thead>
              <tbody>
                ${topicHtml}
              </tbody>
            </table>
            
            <p style="color: #64748b; margin-top: 24px;">
              Keep practicing to improve your skills! Visit 
              <a href="https://ignitemindacademy.com" style="color: #6366f1;">IgniteMind Academy</a> 
              for more NAPLAN preparation resources.
            </p>
          </div>
          <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 14px;">
            <p>© 2024 IgniteMind Academy. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    // HTML email for admin (website owner)
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New NAPLAN Test Result</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1e293b; padding: 30px; border-radius: 16px;">
            <h1 style="color: white; margin: 0;">📊 New NAPLAN Test Result</h1>
          </div>
          <div style="background: #f8fafc; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #1e293b; margin-top: 0;">Student Details</h2>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${studentName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${studentEmail}" style="color: #6366f1;">${studentEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Test Type:</td>
                <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${testType === "numeracy" ? "Numeracy" : "English Grammar"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Grade:</td>
                <td style="padding: 8px 0; color: #1e293b;">Year ${grade.replace("year", "")}</td>
              </tr>
            </table>
            
            <div style="background: white; padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center; border: 2px solid #6366f1;">
              <div style="font-size: 48px; font-weight: bold; color: #6366f1;">${percentage}%</div>
              <div style="color: #64748b;">Overall Score</div>
              <div style="color: #1e293b; margin-top: 8px;">${correctCount}/${totalQuestions} correct</div>
            </div>
            
            <h3 style="color: #1e293b;">Topic Performance</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Topic</th>
                  <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">Score</th>
                  <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">%</th>
                </tr>
              </thead>
              <tbody>
                ${topicHtml}
              </tbody>
            </table>
            
            <div style="margin-top: 24px; padding: 16px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
              <p style="margin: 0; color: #0c4a6e;">
                <strong>Action:</strong> Follow up with ${studentName} at ${studentEmail} to discuss NAPLAN preparation options.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to student
    const studentEmailResult = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [studentEmail],
      subject: `Your NAPLAN ${testType === "numeracy" ? "Numeracy" : "English Grammar"} Test Results - ${percentage}%`,
      html: studentHtml,
    });

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["ignitemind60@gmail.com"],
      subject: `New NAPLAN Result: ${studentName} - ${testType === "numeracy" ? "Numeracy" : "English Grammar"} - ${percentage}%`,
      html: adminHtml,
    });

    return NextResponse.json({
      success: true,
      studentEmail: studentEmailResult.data?.id,
      adminEmail: adminEmailResult.data?.id,
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}

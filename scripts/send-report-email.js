const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const SMTP_USER = 'ankitpatel@qable.io';
const SMTP_PASS = 'zjwtgkflbwczqrpb';

const TO = [
  'aneri.patel@qable.io',
  'nikunj.trivedi@qable.io',
  '1ee687f3.linearloop.io@in.teams.ms',
];

const reportPath = path.resolve(__dirname, '../reports/test-results.json');
const summaryPath = path.resolve(__dirname, '../reports/email-summary.txt');

function collectTests(suite, failures = []) {
  let stats = { total: 0, passed: 0, failed: 0, skipped: 0, flaky: 0, durationMs: 0, failures };
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      stats.total++;
      const result = test.results?.[test.results.length - 1];
      const status = result?.status || 'unknown';
      stats.durationMs += result?.duration || 0;
      if (status === 'passed') stats.passed++;
      else if (status === 'failed' || status === 'timedOut') {
        stats.failed++;
        const msg = result?.error?.message || 'No error message';
        stats.failures.push(`${spec.title} — ${test.title}: ${msg.split('\n')[0]}`);
      } else if (status === 'skipped') stats.skipped++;
      else if (status === 'flaky') stats.flaky++;
    }
  }
  for (const child of suite.suites || []) {
    const c = collectTests(child, stats.failures);
    stats.total += c.total; stats.passed += c.passed; stats.failed += c.failed;
    stats.skipped += c.skipped; stats.flaky += c.flaky; stats.durationMs += c.durationMs;
  }
  return stats;
}

function formatDuration(ms) {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

let stats = { total: 0, passed: 0, failed: 0, skipped: 0, flaky: 0, durationMs: 0, failures: [] };
let project = process.env.PROJECT || 'Local';

try {
  if (fs.existsSync(reportPath)) {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    for (const suite of report.suites || []) {
      const s = collectTests(suite);
      stats.total += s.total; stats.passed += s.passed; stats.failed += s.failed;
      stats.skipped += s.skipped; stats.flaky += s.flaky; stats.durationMs += s.durationMs;
      stats.failures.push(...s.failures);
    }
  }
} catch (e) {
  stats.failures.push(`Failed to parse report: ${e.message}`);
}

const status = stats.failed > 0 ? 'FAILED' : 'PASSED';
const statusColor = stats.failed > 0 ? '#cc0000' : '#00b300';
const failureRows = stats.failures.length
  ? stats.failures.slice(0, 10).map((f, i) => `<tr><td style="padding:6px;color:#cc0000">${i + 1}. ${f}</td></tr>`).join('')
  : '<tr><td style="padding:6px;color:#00b300">No failures</td></tr>';

const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:640px;margin:auto;padding:20px">
  <h2 style="background:${statusColor};color:#fff;padding:12px 16px;border-radius:4px;margin:0 0 20px">
    🎭 Playwright Report — ${status}
  </h2>
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
    <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;width:140px">Project</td><td style="padding:8px">${project}</td></tr>
    <tr><td style="padding:8px;font-weight:bold">Total Tests</td><td style="padding:8px">${stats.total}</td></tr>
    <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Passed</td><td style="padding:8px;color:#00b300"><strong>${stats.passed}</strong></td></tr>
    <tr><td style="padding:8px;font-weight:bold">Failed</td><td style="padding:8px;color:#cc0000"><strong>${stats.failed}</strong></td></tr>
    <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Skipped</td><td style="padding:8px">${stats.skipped}</td></tr>
    <tr><td style="padding:8px;font-weight:bold">Flaky</td><td style="padding:8px">${stats.flaky}</td></tr>
    <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold">Duration</td><td style="padding:8px">${formatDuration(stats.durationMs)}</td></tr>
  </table>
  <h3 style="border-bottom:2px solid #eee;padding-bottom:8px">Failure Highlights</h3>
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    ${failureRows}
  </table>
</body>
</html>`;

const subject = `[${status}] Playwright — ${project} — ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { ciphers: 'SSLv3' },
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
  } catch (err) {
    console.error('❌ SMTP verify failed:', err.message);
    process.exit(1);
  }

  const info = await transporter.sendMail({
    from: `"Playwright CI" <${SMTP_USER}>`,
    to: TO.join(', '),
    subject,
    html: htmlBody,
    text: fs.existsSync(summaryPath) ? fs.readFileSync(summaryPath, 'utf8') : subject,
  });

  console.log(`✅ Email sent → ${info.messageId}`);
  console.log(`   To: ${TO.join(', ')}`);
  console.log(`   Subject: ${subject}`);
}

sendEmail().catch(err => {
  console.error('❌ Send failed:', err.message);
  process.exit(1);
});

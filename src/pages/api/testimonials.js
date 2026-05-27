function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function getRating(value) {
  const rating = Number(value);

  if (!Number.isFinite(rating)) {
    return 5;
  }

  return Math.max(1, Math.min(5, Math.round(rating)));
}

function getDatabase(context) {
  return context?.locals?.runtime?.env?.DB || null;
}

export async function GET(context) {
  const db = getDatabase(context);

  if (!db) {
    return json({ error: "D1 database binding DB is missing." }, 500);
  }

  try {
    const result = await db
      .prepare(`
        SELECT id, name, project, rating, message, created_at
        FROM testimonials
        WHERE approved = 1
        ORDER BY created_at DESC
        LIMIT 12
      `)
      .all();

    return json({
      ok: true,
      testimonials: result.results || []
    });
  } catch {
    return json({ error: "Could not load testimonials." }, 500);
  }
}

export async function POST(context) {
  const db = getDatabase(context);

  if (!db) {
    return json({ error: "D1 database binding DB is missing." }, 500);
  }

  let body;

  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid form data." }, 400);
  }

  const honeypot = cleanText(body.company, 120);

  if (honeypot) {
    return json({ ok: true, pending: true });
  }

  const name = cleanText(body.name, 80) || "WhichwoodFitters client";
  const project = cleanText(body.project, 80) || "Custom carpentry";
  const rating = getRating(body.rating);
  const message = cleanText(body.message, 240);

  if (message.length < 8) {
    return json({ error: "Please write a slightly longer testimonial." }, 400);
  }

  try {
    await db
      .prepare(`
        INSERT INTO testimonials (name, project, rating, message, approved, created_at)
        VALUES (?, ?, ?, ?, 0, datetime('now'))
      `)
      .bind(name, project, rating, message)
      .run();

    return json({
      ok: true,
      pending: true,
      message: "Review received and waiting for approval."
    });
  } catch {
    return json({ error: "Could not save testimonial." }, 500);
  }
}

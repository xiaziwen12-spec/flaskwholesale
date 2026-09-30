"use client";

export default function QuoteForm() {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = ["Hello FlaskWholesale, I would like a quote.", `Name: ${data.get("name") || "-"}`, `Email: ${data.get("email") || "-"}`, `Company: ${data.get("company") || "-"}`, `Quantity: ${data.get("quantity") || "-"}`, `Requirements: ${data.get("message") || "-"}`, `Page: ${location.href}`];
    location.href = `https://wa.me/8613267102135?text=${encodeURIComponent(lines.join("\n"))}`;
  }
  return <div className="quote-box"><h2>Tell us what you need</h2><p>Submit the details below and continue the conversation in WhatsApp.</p><form className="quote-form" onSubmit={submit}>
    <input name="name" aria-label="Your name" placeholder="Your name" required />
    <input name="email" aria-label="Email" type="email" placeholder="Email" required />
    <input name="company" aria-label="Company" placeholder="Company" />
    <input name="quantity" aria-label="Estimated quantity" placeholder="Estimated quantity" />
    <textarea className="full" name="message" aria-label="Product requirements" rows="5" placeholder="Product, size, colour, logo and packaging requirements" required />
    <button className="button full" type="submit">Continue on WhatsApp</button>
  </form></div>;
}

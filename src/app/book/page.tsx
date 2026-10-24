import type { Metadata } from "next";
import Link from "next/link";
import { BookingAgent } from "@/components/features/BookingAgent";

export const metadata: Metadata = {
  title: "Book Tech Support — Ask Questions & Request a Session",
  description:
    "Chat with the Trini System AI assistant: ask about printer, PC, GPS or email problems and request a remote support session in about 10 short steps.",
  alternates: { canonical: "https://trinisystem.vercel.app/book" },
};

export default function BookPage() {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-black mb-3">Ask a question or book a session</h1>
        <p className="text-lg t-muted">
          Our AI assistant answers common questions and collects the details for a technician — step by step. A person
          confirms every booking.
        </p>
      </div>
      <div className="px-4">
        <BookingAgent page="/book" />
        <p className="text-center text-sm t-muted mt-4">
          Prefer a form?{" "}
          <Link href="/contact" className="underline font-semibold">
            Use the contact form
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

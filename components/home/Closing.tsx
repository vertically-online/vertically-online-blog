"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";

/** Closing call to action (blue gradient with grain), just above the footer on every page. */
export default function Closing({
  heading = home.closing.heading,
  body = home.closing.body,
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="close grain">
      <div className="wrap close-grid">
        <div className="close-copy">
          <h2>{heading}</h2>
          <p>{body}</p>
          <div className="btns">
            <BookCallButton className="btn btn-white">{site.hero.primaryCta}</BookCallButton>
            <a className="btn btn-ghost" href={site.contact.phoneHref}>Call {site.contact.phone}</a>
          </div>
          <p className="fine">{home.closing.fine}</p>
        </div>
        <div className="close-phone" aria-hidden="true">
          <Image src="/images/home/phone-angled-final.png" alt="" width={1154} height={2200} sizes="(max-width: 980px) 240px, 360px" />
        </div>
      </div>
    </section>
  );
}

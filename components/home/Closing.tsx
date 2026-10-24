"use client";

import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";

/** Closing call to action (blue gradient with grain). Also used on inner pages. */
export default function Closing({
  heading = home.closing.heading,
  body = home.closing.body,
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="close grain">
      <div className="wrap">
        <h2>{heading}</h2>
        <p>{body}</p>
        <div className="btns">
          <BookCallButton className="btn btn-white">{site.hero.primaryCta}</BookCallButton>
          <a className="btn btn-ghost" href={site.contact.phoneHref}>Call {site.contact.phone}</a>
        </div>
        <p className="fine">{home.closing.fine}</p>
      </div>
    </section>
  );
}

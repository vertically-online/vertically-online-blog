"use client";

import { site } from "@/content/site";
import { home } from "@/content/home";
import { ArrowUpRight, GmailMark, OutlookMark, SmtpMark } from "@/components/home/svg";

const PROVIDERS = [
  { name: "Gmail and Google Workspace", mark: <GmailMark label="Gmail" /> },
  { name: "Outlook and Microsoft 365", mark: <OutlookMark /> },
  { name: "Any email (SMTP)", mark: <SmtpMark /> },
];

/** Compact "front desk" row: email providers on the blue card, demo link beside it. */
export default function LiveDemo() {
  const d = home.liveDemo;
  return (
    <section className="sheet white" id="live-demo">
      <div className="wrap">
        <div data-sr>
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="big" style={{ marginTop: 14, maxWidth: 760 }}>{d.heading}</h2>
        </div>
        <div className="fd">
          <div className="fd-mail grain">
            <div className="fd-copy">
              <h3>{d.emailTitle}</h3>
              <p>{d.emailBody}</p>
            </div>
            <ul className="fd-providers">
              {PROVIDERS.map((p) => (
                <li key={p.name}>
                  <span className="mi">{p.mark}</span>
                  {p.name}
                </li>
              ))}
            </ul>
            <p className="fd-note">{d.sendOnly}</p>
          </div>
          <div className="fd-demo">
            <h3>{d.demoTitle}</h3>
            <p>{d.demoBody}</p>
            <a className="btn btn-navy" href={site.liveDemo.url} target="_blank" rel="noopener">
              {d.demoCta}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

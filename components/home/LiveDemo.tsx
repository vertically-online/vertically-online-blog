"use client";

import { site } from "@/content/site";
import { home } from "@/content/home";
import { ArrowUpRight, GmailMark, OutlookMark, Search, SmtpMark } from "@/components/home/svg";

export default function LiveDemo() {
  const d = home.liveDemo;
  const demoUrl = site.liveDemo.url;
  return (
    <section className="sheet white" id="live-demo">
      <div className="wrap">
        <div data-sr>
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="big" style={{ marginTop: 14, maxWidth: 760 }}>{d.heading}</h2>
        </div>
        <div className="bento">
          <div className="bc blue2 grain">
            <div className="vis">
              <a className="demo-btn" href={demoUrl} target="_blank" rel="noopener">
                <Search />
                <span>{d.demoPill}</span>
              </a>
            </div>
            <div className="tx">
              <h3>{d.demoTitle}</h3>
              <p>{d.demoBody}</p>
              <a className="btn btn-white" href={demoUrl} target="_blank" rel="noopener">
                {d.demoCta}
                <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="bc light">
            <div className="vis">
              <div className="mailbox">
                <div className="mc">
                  <span className="mi"><GmailMark label="Gmail" /></span>
                  <div>Gmail and Google Workspace<small>Connect in one click</small></div>
                  <span className="ok">Sent</span>
                </div>
                <div className="mc">
                  <span className="mi"><OutlookMark /></span>
                  <div>Outlook and Microsoft 365<small>Quotes go out from your address</small></div>
                </div>
                <div className="mc">
                  <span className="mi"><SmtpMark /></span>
                  <div>Any email (SMTP)<small>Your domain, your name</small></div>
                </div>
                <div className="sendonly">{d.sendOnly}</div>
              </div>
            </div>
            <div className="tx">
              <h3>{d.emailTitle}</h3>
              <p>{d.emailBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

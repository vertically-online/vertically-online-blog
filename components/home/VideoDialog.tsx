"use client";

import { useEffect, useRef } from "react";
import { CloseX } from "@/components/home/svg";

export type DialogVideo = { title: string; video: string; poster: string; captions: string };

/**
 * Accessible video modal on the native <dialog>: showModal() gives focus
 * trapping and Esc-to-close. The video only loads when opened (preload none)
 * and never autoplays with sound; the visitor presses play.
 */
export default function VideoDialog({ video, onClose }: { video: DialogVideo | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (video && !dlg.open) dlg.showModal();
    if (!video && dlg.open) dlg.close();
  }, [video]);

  return (
    <dialog
      ref={ref}
      className="vdlg"
      aria-label={video?.title}
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {video && (
        <>
          <video key={video.video} controls playsInline preload="none" poster={video.poster}>
            <source src={video.video} type="video/mp4" />
            <track kind="captions" src={video.captions} srcLang="en" label="English" default />
          </video>
          <p className="cap-t">{video.title}</p>
          <button type="button" className="x" aria-label="Close video" onClick={onClose} autoFocus>
            <CloseX />
          </button>
        </>
      )}
    </dialog>
  );
}

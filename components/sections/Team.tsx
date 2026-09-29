import Image from "next/image";
import { site } from "@/content/site";
import { existsSync } from "fs";
import path from "path";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="container-vx">
        <h2 className="font-display text-3xl font-semibold text-void sm:text-4xl">
          The team
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {site.team.map((member) => {
            const photoPath = `/images/team/${member.slug}.jpg`;
            const hasPhoto = existsSync(
              path.join(process.cwd(), "public", "images", "team", `${member.slug}.jpg`)
            );

            return (
              <div key={member.slug} className="glass rounded-2xl p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-aurora-1 to-aurora-3">
                  {hasPhoto ? (
                    <Image
                      src={photoPath}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-2xl font-semibold text-white">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-void">
                  {member.name}
                </h3>
                <p className="text-sm text-slate/80">{member.role}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-signal hover:text-tide"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

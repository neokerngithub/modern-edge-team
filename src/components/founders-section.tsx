import kiran from "@/assets/kiran-neupane.jpg.asset.json";
import samir from "@/assets/samir-hussain.jpg.asset.json";

type Founder = {
  n: string;
  name: string;
  role: string;
  lead: string;
  detail: string;
  projects: readonly string[];
  image: string;
  alt: string;
};

const FOUNDERS: readonly Founder[] = [
  {
    n: "01",
    name: "Kiran Neupane",
    role: "Director & Co-Founder",
    lead: "Over eleven years of experience in property valuation, design and construction supervision.",
    detail:
      "Kiran leads valuation assignments and design coordination, working across documentation, site assessment and supervision on projects of varying scale.",
    projects: [
      "City Cinema",
      "Centurion Mall",
      "St. Mary's School",
      "Residential developments in Morang and Sunsari",
    ],
    image: kiran.url,
    alt: "Portrait of Kiran Neupane, Director and Co-Founder of Modern Edge",
  },
  {
    n: "02",
    name: "Md Samir Hussain",
    role: "Director & Co-Founder",
    lead: "Over seven years of experience in construction, supervision and property valuation.",
    detail:
      "Samir brings Civil and Earthquake Engineering expertise to construction execution, structural review and site supervision.",
    projects: [
      "Swastik Oil Industries",
      "OCB Processing Industries",
      "Global Plastic Industries",
      "Ruchi Khadya Udhyog",
      "Itahari Stadium",
    ],
    image: samir.url,
    alt: "Portrait of Md Samir Hussain, Director and Co-Founder of Modern Edge",
  },
];

export function FoundersSection() {
  return (
    <section id="founders" className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              Founders
            </p>
            <h2 className="mt-6 text-3xl leading-[1.06] font-extrabold tracking-[-0.03em] md:text-[3.2rem]">
              Led by practising
              <br />
              <span className="text-primary">architects and engineers.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Modern Edge is directed by its founders, who remain involved in valuation, design and
            site supervision across the firm's work.
          </p>
        </div>

        <div className="mt-20 space-y-24 md:space-y-32">
          {FOUNDERS.map((f, i) => {
            const inverse = i % 2 === 1;
            return (
              <article key={f.name} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div
                  className={`relative lg:col-span-6 ${inverse ? "lg:order-2 lg:col-start-7" : ""}`}
                >
                  <span
                    className="absolute -top-6 left-0 h-px w-full bg-hairline"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -top-6 left-0 h-6 w-px bg-primary"
                    aria-hidden="true"
                  />
                  <img
                    src={f.image}
                    alt={f.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                  <p className="mt-4 flex items-center justify-between text-[0.68rem] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                    <span>{f.name}</span>
                    <span className="text-primary">{f.n}</span>
                  </p>
                </div>

                <div
                  className={`flex flex-col justify-center lg:col-span-5 ${
                    inverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"
                  }`}
                >
                  <span
                    className="text-[3.4rem] leading-none font-extrabold tracking-[-0.04em] text-foreground/10 md:text-[4.5rem]"
                    aria-hidden="true"
                  >
                    {f.n}
                  </span>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] md:text-4xl">
                    {f.name}
                  </h3>
                  <p className="mt-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary">
                    {f.role}
                  </p>
                  <p className="mt-8 max-w-md border-l border-primary pl-5 text-base leading-relaxed">
                    {f.lead}
                  </p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {f.detail}
                  </p>
                  <div className="mt-10 border-t border-hairline pt-6">
                    <p className="eyebrow">Project experience</p>
                    <ul className="mt-4 grid gap-px bg-hairline sm:grid-cols-2">
                      {f.projects.map((p) => (
                        <li
                          key={p}
                          className="bg-background px-4 py-3 text-sm text-muted-foreground"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

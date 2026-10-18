import Image from "next/image";

export type Kpi = {
  label: string;
  value: string;
  change: string;
  caption: string;
  icon: string;
  iconInset?: string;
  tightValue?: boolean;
};

export function KpiCard({
  label,
  value,
  change,
  caption,
  icon,
  iconInset = "inset-0",
  tightValue = false,
}: Kpi) {
  return (
    <article className="group relative flex h-[120px] w-full shrink-0 sm:w-[206px] flex-col items-center justify-center overflow-clip rounded-3xl border border-primary-200 bg-neutral-50 p-3 transition-[border-color,box-shadow] duration-300 hover:border-primary-300 hover:shadow-card-hover">
      <div className="relative flex flex-col items-start justify-center gap-2">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="relative size-8 shrink-0 overflow-clip rounded-xl bg-primary-50 shadow-icon">
              <span className="absolute top-1.5 left-1.5 size-5">
                <span className={`absolute ${iconInset}`}>
                  <Image alt="" src={icon} fill />
                </span>
              </span>
            </span>
            <h3 className="text-xl leading-[normal] whitespace-nowrap text-primary-950">{label}</h3>
          </div>
          <div className={`flex items-center ${tightValue ? "" : "gap-3"}`}>
            <p className="text-lg leading-[normal] whitespace-nowrap text-primary-800">{value}</p>
            <p className="flex items-center gap-0.5 text-base leading-[normal] whitespace-nowrap text-primary-500">
              <span className="flex size-[15.183px] shrink-0 items-center justify-center">
                <Image
                  alt=""
                  src="/svg/arrow-curve.svg"
                  width={15}
                  height={15}
                  className="flex-none rotate-[90.7deg] -scale-y-100"
                />
              </span>
              {change}
            </p>
          </div>
        </div>
        <p className="text-xs leading-[normal] whitespace-nowrap text-neutral-500">{caption}</p>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute top-[-4px] -right-[5px] size-[55px] transition-transform duration-300 group-hover:-translate-x-[15px] group-hover:-translate-y-2.5"
      >
        <span className="absolute inset-[-181.82%]">
          <Image alt="" src="/svg/kpi-glow-1.svg" fill />
        </span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-[72px] left-[2px] size-[47px] transition-transform duration-300 group-hover:-translate-x-3 group-hover:-translate-y-[11px]"
      >
        <span className="absolute inset-[-212.77%]">
          <Image alt="" src="/svg/kpi-glow-2.svg" fill />
        </span>
      </span>
    </article>
  );
}

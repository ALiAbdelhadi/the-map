import Image from "next/image";

const PILL =
  "rounded-full bg-primary-50 shadow-pill transition-shadow duration-300 hover:shadow-card-hover";

export function TopBar() {
  return (
    <header className="flex items-center gap-6">
      <search className="min-w-0 flex-1">
        <label
          className={`${PILL} flex items-center gap-[18px] px-1 py-2 focus-within:shadow-card-hover`}
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-50">
            <Image src="/svg/search.svg" alt="" width={24} height={24} />
          </span>
          <span className="sr-only">Search by order</span>
          <input
            type="search"
            placeholder="Search by Order"
            className="h-12 min-w-0 flex-1 bg-transparent pr-6 text-base text-primary-950 outline-none placeholder:text-neutral-600"
          />
        </label>
      </search>

      <button
        type="button"
        aria-label="Notifications"
        className={`${PILL} flex size-[62px] shrink-0 cursor-pointer items-center justify-center border border-neutral-100`}
      >
        <Image src="/svg/notification.svg" alt="" width={26.667} height={29.333} />
      </button>

      <div className={`${PILL} flex w-[193px] shrink-0 items-center gap-4 px-[3px] py-0.5`}>
        <Image
          src="/img/owner.png"
          alt=""
          width={52}
          height={52}
          className="size-[52px] rounded-full object-cover shadow-avatar"
        />
        <p className="flex flex-col">
          <span className="text-xl leading-[normal] text-primary-950">Ali Hassan</span>
          <span className="text-base leading-[normal] text-neutral-300">Owner</span>
        </p>
      </div>

      <button
        type="button"
        className={`${PILL} flex shrink-0 cursor-pointer items-center gap-2 px-[29px] py-3 text-2xl leading-[normal] text-primary-950`}
      >
        <span className="flex size-6 items-center justify-center">
          <Image src="/svg/export.svg" alt="" width={17.5} height={15.256} />
        </span>
        Export
      </button>
    </header>
  );
}

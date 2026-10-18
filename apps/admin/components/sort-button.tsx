import Image from "next/image";

export function SortButton() {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded-[30px] bg-secondary-50 p-2 text-base leading-[normal] transition-shadow duration-300 hover:shadow-pill"
    >
      <Image src="/svg/sort.svg" alt="" width={16} height={16} />
      Sort by
      <Image src="/svg/chevron-down.svg" alt="" width={16} height={16} />
    </button>
  );
}

import { ChildrenProps } from "@/types";

export const LayoutWrapper = ({ children }: ChildrenProps) => {
  return (
    <div className="bg-[#181818]">
      <div className="w-full max-w-[120rem] mx-auto ">
        <div className="max-w-[100rem] mx-auto">{children}</div>
      </div>
    </div>
  );
};

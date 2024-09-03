import React from "react";

interface ICategoryProps {
  title: string;
  avatarUrl: string;
  onClick: () => void;
}

export default function Category({
  title,
  avatarUrl,
  onClick,
}: ICategoryProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center space-y-6 cursor-pointer"
    >
      <div className="xs:size-16 sm:size-24 md:size-28 lg:size-32 xl:size-36 rounded-full">
        <img className="w-full h-full object-cover rounded-full" src={avatarUrl} />
      </div>
      <h4 className="text-center text-base font-medium">{title}</h4>
    </div>
  );
}

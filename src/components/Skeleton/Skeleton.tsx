import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
}

const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <span
      className={`nc-Skeleton bg-neutral-400 inline-flex ${className}`}
      data-nc-id="Skeleton"
    >
{/*react-loading-skeleton mr-2.5 mb-2*/}
      
    </span>
  );
};
export default Skeleton;

import React, { FC } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export interface SingleTitleProps {
  title: string;
  className?: string;
  mainClass?: string;
  loading?: boolean;
}

const SingleTitle: FC<SingleTitleProps> = ({
  mainClass = "text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100",
  className = "",
  title,
  loading
}) => {
  return (
    <>
      {
        title ? (
          <h1 className={className + " " + mainClass + " max-w-4xl "} title={title}>
            {title} oyeeeeeeeeeeeeeeeeeeee

          </h1>)
          : loading && (
            <h1 className={className + " " + mainClass + " max-w-4xl "} >
              <SkeletonTheme baseColor="#4e4e4e" highlightColor="#706e6e">
                <Skeleton height={30} width={420}  />
              </SkeletonTheme>
            </h1>
        )
      }
    </>
  ) 

};

export default SingleTitle;

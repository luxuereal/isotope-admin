import { Skeleton } from "primereact/skeleton";

const ProfileSkeleton = () => {
  return (
    <>
      <div className="rounded-md border border-border w-full h-30 sm:p-5 p-2 xl:flex xl:justify-between xl:items-center">
        <div className="h-20 sm:flex items-center font-bold xl:text-xl sm:text-base text-xs xl:mb-0 sm:mb-2 xs:mb-8 mb-16">
          <Skeleton shape="circle" size="80px" className="rounded-full border-2 border-black mr-4" />
          ID:&nbsp;&nbsp;<Skeleton width="100px" />
        </div>
        <Skeleton width="20%" />
      </div>

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Bio Data
        </div>
        <div className="w-full sm:text-base text-sm grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cold-3 xs:grid-cols-2 grid-cols-1 p-1 border-collapse gap-1">
          {
            Array(12).fill('').map((field, idx) =>
              <div className="p-4 border border-border rounded-sm" key={`bio-ele-ske-${idx}`}>
                <Skeleton width="50%"  className="text-normaltext mb-2" />
                <Skeleton width="100%" className="text-black font-bold break-all" />
              </div>
            )
          }
        </div>
      </div>
      

      <div className="rounded-md border border-border w-full my-8">
        <div className="bg-grayback text-normaltext p-4">
          Account Information
        </div>
        <div className="w-full sm:text-base text-sm grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cold-3 xs:grid-cols-2 grid-cols-1 p-1 border-collapse gap-1">
          {
            Array(12).fill('').map((field, idx) =>
              <div className="p-4 border border-border rounded-sm" key={`aco-ele-ske-${idx}`}>
                <Skeleton width="50%"  className="text-normaltext mb-2" />
                <Skeleton width="100%" className="text-black font-bold break-all" />
              </div>
            )
          }
        </div>
      </div>

      <div className="rounded-md bg-grayback border border-border w-full p-5">
        <p className="mb-4 text-normaltext font-bold sm:text-xl text-base">Verification Image</p>
        <div className="h-20">
          <div className="h-20 sm:flex items-center font-bold xl:text-xl sm:text-base text-xs xl:mb-0 sm:mb-2 xs:mb-8 mb-16">
            <Skeleton shape="circle" size="80px" className="rounded-full border-2 border-black mr-4" />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default ProfileSkeleton;
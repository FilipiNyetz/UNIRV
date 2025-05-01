import { Skeleton } from "@/components/ui/skeleton"
 
export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-[200px] w-[320px] rounded-xl" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-[165px] w-[320px] rounded-xl" />
    </div>
  )
}
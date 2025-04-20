import { Loader2 } from "lucide-react";

export function PageLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <div className="animate-pulse text-center space-y-5">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
        <h3 className="text-lg font-medium">Loading...</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Preparing your experience. Please wait a moment.
        </p>
      </div>
    </div>
  );
}

export function ComponentLoading({ 
  message = "Loading...",
  className = ""
}: { 
  message?: string; 
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

export function DataLoading() {
  return (
    <div className="w-full py-6 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading data...</p>
      </div>
    </div>
  );
}

export function ImageSkeleton({ 
  className = "rounded-md" 
}: {
  className?: string 
}) {
  return (
    <div className={`bg-muted/30 animate-pulse ${className}`}></div>
  );
}

export function TextSkeleton({ 
  width = "full",
  height = "4",
}: { 
  width?: string;
  height?: string;
}) {
  return (
    <div className={`bg-muted/30 animate-pulse h-${height} w-${width} rounded`}></div>
  );
}
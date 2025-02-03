import { StoriesManager } from "@/components/stories-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  return (
    <div className="bg-muted flex min-h-svh flex-col sm:px-6 md:px-10">
      <div className="mx-auto w-full max-w-screen-md">
        <div className="flex min-h-svh flex-col [&>*]:flex-1">
          <Card className="ring-border rounded-none border-none ring-1">
            <CardHeader>
              <CardTitle asChild className="text-2xl font-bold">
                <h1>Stories</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StoriesManager />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

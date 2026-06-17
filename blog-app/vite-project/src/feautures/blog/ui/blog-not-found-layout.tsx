import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/config/route-config";
import { Link } from "react-router-dom";

export function BlogNotFoundLayout() {
  return (
    <Card className="w-full max-w-md m-auto">
      <CardHeader>
        <CardTitle>Article not found</CardTitle>
      </CardHeader>
      <CardContent className="gap-2.5">
        <p className="text-sm text-muted-foreground">
          The article you are looking for does not exist.
        </p>
        <p className="text-sm text-muted-foreground my-2.5">
          Please check the URL and try again.
        </p>
        <Link
          to={ROUTES.MAIN.HOME}
          className="text-sm text-primary hover:underline my-2.5"
        >
          Go back to the homepage
        </Link>
      </CardContent>
    </Card>
  );
}

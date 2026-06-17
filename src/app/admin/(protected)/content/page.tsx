import { ContentManager } from "@/components/admin/content-manager";
import { getAllAdminContent } from "@/lib/admin/content-source";

export default async function AdminContentPage() {
  const initial = await getAllAdminContent();

  return <ContentManager initial={initial} />;
}

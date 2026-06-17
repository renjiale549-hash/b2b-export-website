import { ThemeDesigner } from "@/components/admin/theme-designer";
import { getThemeSettings } from "@/lib/content";

export default async function AdminDesignPage() {
  const theme = await getThemeSettings();

  return <ThemeDesigner theme={theme} />;
}

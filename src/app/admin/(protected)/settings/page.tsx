import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return <SiteSettingsForm settings={settings} />;
}

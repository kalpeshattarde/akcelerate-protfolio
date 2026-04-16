/**
 * Downloads a product file.
 * Priority: downloadUrl (GitHub Release) → Supabase Storage → README fallback
 */
export async function downloadProductFile(
  slug: string,
  productName: string,
  features: string[],
  downloadUrl?: string
): Promise<{ success: boolean; fallback: boolean }> {
  // 1. Direct download URL (GitHub Releases, etc.)
  if (downloadUrl) {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${slug}-source-code.zip`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return { success: true, fallback: false };
  }

  // 2. Try Supabase Storage
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const filePath = `${slug}.zip`;
    const { data, error } = await supabase.storage
      .from("product-files")
      .createSignedUrl(filePath, 3600);

    if (data?.signedUrl && !error) {
      const a = document.createElement("a");
      a.href = data.signedUrl;
      a.download = `${slug}-source-code.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { success: true, fallback: false };
    }
  } catch {
    // Fall through to fallback
  }

  // 3. Fallback: generate a README file
  const content = generateReadme(productName, features);
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-source-code-README.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { success: true, fallback: true };
}

function generateReadme(productName: string, features: string[]): string {
  return `# ${productName} — Source Code

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features
${features.map(f => `- ${f}`).join("\n")}

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Shadcn/ui components

## Support
Email: akceleratehq@gmail.com

© ${new Date().getFullYear()} AKcelerate. All rights reserved.
`;
}

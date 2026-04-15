import { supabase } from "@/integrations/supabase/client";

/**
 * Downloads a product file from Supabase Storage.
 * Files should be uploaded to the 'product-files' bucket with path: {product-slug}.zip
 * 
 * Falls back to generating a README if the file doesn't exist yet.
 */
export async function downloadProductFile(slug: string, productName: string, features: string[]): Promise<{ success: boolean; fallback: boolean }> {
  try {
    // Try to get a signed URL from Supabase Storage
    const filePath = `${slug}.zip`;
    const { data, error } = await supabase.storage
      .from("product-files")
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (data?.signedUrl && !error) {
      // Real file exists — trigger download
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

  // Fallback: generate a README file
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

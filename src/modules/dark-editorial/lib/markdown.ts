/**
 * Pipeline Markdown → HTML cho Dark Editorial Module.
 * Dùng remark + rehype, bảo toàn HTML thô trong markdown.
 */

import { remark }      from "remark";
import remarkGfm       from "remark-gfm";
import remarkRehype    from "remark-rehype";
import rehypeRaw       from "rehype-raw";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

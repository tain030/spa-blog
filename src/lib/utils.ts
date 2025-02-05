import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import remarkGemoji from "remark-gemoji";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractMetadata = (markdown: string) => {
  const metadataRegex = /^---\n([\s\S]*?)\n---/;
  const metadataMatch = markdown.match(metadataRegex);
  const metadata: Record<string, string> = {};
  let content = markdown;

  if (metadataMatch) {
    const yamlContent = metadataMatch[1];
    yamlContent.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();
      metadata[key.trim()] = value.replace(/^['"]|['"]$/g, "");
    });
    content = markdown.replace(metadataRegex, "").trim();
  }

  return { metadata, content };
};

// Post 데이터의 타입 정의
interface PostData {
  metadata: Record<string, string>;
  content: string;
}

// 로컬 스토리지에서 데이터 가져오기
const getFromLocalStorage = (key: string): PostData | null => {
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

// 로컬 스토리지에 데이터 저장하기
const saveToLocalStorage = (key: string, data: PostData) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Markdown 파일을 가져오고 처리하는 함수
export const fetchPostData = async (url: string): Promise<PostData> => {
  // 로컬 스토리지에서 캐시된 데이터 확인
  const cachedData = getFromLocalStorage(url);
  if (cachedData) {
    return cachedData; // 캐시된 데이터 반환
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch post");

  const markdown = await response.text();
  const { metadata, content } = extractMetadata(markdown);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImages)
    .use(remarkGemoji)
    .use(remarkRehype)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(content);

  const result: PostData = {
    metadata,
    content: processedContent.toString(),
  };

  // 캐시된 데이터 로컬 스토리지에 저장
  saveToLocalStorage(url, result);

  return result;
};

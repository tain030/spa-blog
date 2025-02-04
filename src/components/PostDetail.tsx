import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostData } from "@/lib/utils";

interface Post {
  sha: string;
  name: string;
  date: string;
  content: string;
}

const PostDetail: React.FC = () => {
  const { postName } = useParams<{ postName: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 캐시를 무효화하기 위해 현재 시간을 쿼리 파라미터로 추가
        const timestamp = new Date().getTime();
        const url = `https://raw.githubusercontent.com/tain030/blog-post/main/posts/${postName}.md?timestamp=${timestamp}`;

        // Markdown 파일을 가져오고 처리하는 공통 함수 사용
        const { metadata, content } = await fetchPostData(url);

        setPost({
          sha: postName || "N/A",
          name: metadata.title || "Untitled",
          date: metadata.date || "Unknown date",
          content: content, // 변환된 HTML 본문
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching or parsing post:", err);
        setError("Failed to load post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // post가 null일 때를 안전하게 처리
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{post.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default PostDetail;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPostData } from "@/lib/utils";

interface MetaPost {
  sha: string;
  fileName: string;
  title: string;
  date: string;
  content: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<MetaPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5; // 한 페이지에 표시할 포스트 수

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/tain030/blog-post/contents/posts`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // 포스트 메타데이터와 미리보기 생성
        const postsWithMetadata = await Promise.all(
          data.map(async (post: any) => {
            const { metadata, content } = await fetchPostData(
              post.download_url,
            );

            return {
              sha: post.sha,
              fileName: post.name.replace(".md", ""),
              title: metadata.title || "제목 없음",
              date: metadata.date || "날짜 미정",
              content: content, // 전체 본문 내용 (HTML 변환 전)
            };
          }),
        );

        const sortedPosts = postsWithMetadata.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching or parsing posts:", err);
        setError("Failed to load posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="space-y-12">
        {currentPosts.map((post) => (
          <article
            key={post.sha}
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <Link to={`/post/${post.fileName}`} className="block">
              <h2 className="text-3xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.date}
              </p>
            </Link>
          </article>
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-red-400 text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default PostList;

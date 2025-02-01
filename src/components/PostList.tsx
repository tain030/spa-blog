import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPostData } from "@/lib/utils";

interface MetaPost {
  sha: string;
  fileName: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<MetaPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedCategory = searchParams.get("category") || null;
  const postsPerPage = 5;

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
              category: metadata.category || "Uncategorized",
              content: content,
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

  // 선택된 카테고리에 맞는 포스트 필터링
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setSearchParams({
      page: pageNumber.toString(),
      category: selectedCategory || "",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="space-y-8">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <article
              key={post.sha}
              className="border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <Link to={`/post/${post.fileName}`} className="block">
                <h2 className="text-3xl font-bold mb-4 hover:text-primary dark:hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.date}
                </p>
              </Link>
            </article>
          ))
        ) : (
          <p>선택한 카테고리에 해당하는 게시물이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-primary text-white" : "bg-secondary"}`}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </>
  );
};

export default PostList;

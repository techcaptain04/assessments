import BlogFeed from "@/app/_components/blog/feed";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Home =() => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* create your own blog button */}
        <Link href="/blog/create">
          <button className="
            bg-primary text-white font-bold py-2 px-4 rounded-lg
            hover:bg-primary-dark transition-colors my-10
          ">
            Create your own blog
          </button>
        </Link>
      </div>
      <hr className="my-4"/>
      <BlogFeed/>
    </>
  )
}


export default Home;
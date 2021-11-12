import { News } from "@/types";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import { BookmarkIcon } from "./icon";

interface NewsCardProps {
  news: News;
  category: string;
}

export default function NewsCardSm({ news, category }: NewsCardProps) {
  return (
    <Link href={`/${news.title}`}>
      <a
        onClick={() => {
          localStorage.setItem(
            news.title.split(" ").join("").toLocaleLowerCase(),
            JSON.stringify(news)
          );
        }}
        className="flex space-x-3 group"
      >
        <div className="h-24 w-24 relative bg-black overflow-hidden">
          {/* <Image
          alt="random-pic"
          layout="fill"
          objectFit="cover"
          src="https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/airplane.jpg"
          className="group-hover:opacity-80 duration-300"
        /> */}
          <img
            src={news?.urlToImage || ""}
            alt={news?.urlToImage?.slice(0, 30) || ""}
            className="h-full w-full object-cover group-hover:opacity-80 duration-300"
          />
          <button className="absolute top-1 right-1 h-6 w-6 bg-gray-900/30 rounded-full hidden group-hover:grid place-items-center">
            <BookmarkIcon
              color="text-yellow-300 hover:text-yellow-400"
              size="h-3 w-3"
            />
          </button>
        </div>
        <div className="w-[calc(100%-6rem)]">
          <p className="font-extrabold uppercase text-xs lg:text-sm">
            {category}{" "}
            <span className="font-medium lowercase">
              / {formatDate(news.publishedAt)}
            </span>
          </p>
          <h5 className="oswald font-extrabold text-gray-800 text-sm lg:text-base">
            {news.title}
          </h5>
        </div>
      </a>
    </Link>
  );
}

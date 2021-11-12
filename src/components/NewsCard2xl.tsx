import formatDate from "@/utils/formatDate";
import { News } from "@/types";
import Link from "next/link";
import { BookmarkIcon } from "./icon";

interface NewsCardProps {
  news: News;
  category: string;
}

export default function NewsCard2xl({ news, category }: NewsCardProps) {
  return (
    <Link href={`/${news.title}`}>
      <a className="h-[480px] xs:h-[600px] relative block group bg-black">
        {/* <Image
        alt="random-pic"
        layout="fill"
        objectFit="cover"
        src="https://mvpthemes.com/zoxnews/wp-content/uploads/2017/07/vr-headset.jpg"
        className="group-hover:opacity-80 duration-300"
      /> */}
        <img
          src={news?.urlToImage || ""}
          alt={news?.urlToImage.slice(0, 30)}
          className="h-full w-full object-cover group-hover:opacity-80 duration-300"
        />
        <button className="absolute top-2 right-2 h-12 w-12 bg-gray-900/30 rounded-full hidden group-hover:grid place-items-center">
          <BookmarkIcon
            color="text-yellow-300 hover:text-yellow-400"
            size="h-6 w-6"
          />
        </button>
        <div className="absolute left-0 bottom-0 p-5 bg-gradient-to-t from-black via-gray-900/75">
          <p className="font-extrabold uppercase text-sm mt-2 text-green-400">
            {category}{" "}
            <span className="font-medium lowercase text-white">
              / {formatDate(news.publishedAt)}
            </span>
          </p>
          <h1 className="oswald font-extrabold text-4xl xs:text-5xl text-white">
            {news.title}
          </h1>
          <p className="mt-3 text-white hidden xs:block">{news.description}</p>
        </div>
      </a>
    </Link>
  );
}

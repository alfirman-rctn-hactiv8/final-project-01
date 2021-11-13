import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Articles } from "@/types";
import useHotNews from "@/hooks/useHotNews";
import newsAPI from "@/constants/newsAPI";
import NewsCardLg from "@/components/NewsCardLg";
import NewsCardXl from "@/components/NewsCardXl";
import NewsCard2xl from "@/components/NewsCard2xl";
import data from "@/data/indonesia.json";

interface HomeProps {
  msg?: string;
  articles: Articles;
  hotNews: {
    latest: Articles;
    popular: Articles;
    relevant: Articles;
  };
}

const Home: NextPage<HomeProps> = ({ articles, hotNews, msg }) => {
  const { hotNewsDispatch } = useHotNews();

  useEffect(() => {
    if (msg) alert(msg);
    const { latest, popular, relevant } = hotNews;
    hotNewsDispatch({ type: "SET_LATEST", payload: latest });
    hotNewsDispatch({ type: "SET_RELEVANT", payload: relevant });
    hotNewsDispatch({ type: "SET_POPULAR", payload: popular });
    hotNewsDispatch({ type: "SET_CATEGORY", payload: "Indonesia" });
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-row sm:space-x-4 md:space-x-0 lg:space-x-6">
        <div className="sm:w-1/3 md:w-auto lg:flex-1 relative mt-5 lg:mt-0">
          <h5 className="flex justify-center absolute top-0 w-full">
            <span className="oswald uppercase text-lg px-3 bg-[#FF005B] text-white skew-x-[-15deg] font-extrabold">
              Indonesia
            </span>
          </h5>
          <div className="flex sm:flex-col md:flex-row lg:flex-col border-t border-black mt-3 pt-7 space-x-2 sm:space-x-0 sm:space-y-6 md:space-y-0 lg:space-y-7 md:space-x-5 lg:space-x-0">
            {articles.length > 1 &&
              articles
                .slice(1, 3)
                .map((news, i) => (
                  <NewsCardLg key={i} category="Indonesia" news={news} />
                ))}
          </div>
        </div>
        <div className="sm:w-2/3 md:w-auto lg:flex-[2]">
          {articles.length && (
            <NewsCard2xl category="Indonesia" news={articles[0]} />
          )}
        </div>
      </div>
      <div className="mt-7 space-y-6">
        {articles.length > 3 &&
          articles
            .slice(3)
            .map((news, i) => (
              <NewsCardXl key={i} category="Indonesia" news={news} />
            ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resData = await fetch(
      newsAPI().topHeadlines({
        country: "id",
      })
    );
    const resLatest = await fetch(
      newsAPI().everything({
        q: "indonesia",
        sortBy: "publishedAt",
      })
    );
    const resPopular = await fetch(
      newsAPI().everything({
        q: "indonesia",
        sortBy: "popularity",
      })
    );
    const resRelevant = await fetch(
      newsAPI().everything({
        q: "indonesia",
        sortBy: "relevancy",
      })
    );

    const latest = await resLatest.json();
    const popular = await resPopular.json();
    const relevant = await resRelevant.json();
    const data = await resData.json();

    const props = {
      articles: data?.articles || [],
      hotNews: {
        latest: latest?.articles || [],
        popular: popular?.articles || [],
        relevant: relevant?.articles || [],
      },
    };

    return { props };
  } catch (error) {
    return {
      props: {
        msg: "error, API's not working on deployment or APi request has reached the limit\nNow you're using static data at november 14 2021",
        articles: data.data,
        hotNews: {
          latest: data.latest,
          popular: data.popular,
          relevant: data.relevant,
        },
      },
    }; // static data
  }
};

export default Home;

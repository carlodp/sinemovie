import Head from "next/head";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <Head>
        <title>SineMovie</title>
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
        <MovieList title="Action" data={movies} />
        <MovieList title="Comedy" data={movies} />
        <MovieList title="TV Series" data={movies} />
      </div>
      <footer className="flex justify-between sm:h-[70px] text-white px-10 bg-[#E3A433] items-center font-semibold text-md flex-col sm:flex-row py-5 text-center">
        <p>
          <a href="https://carlosantos.dev/" target="_blank">
            © Carlo Santos 2023
          </a>
        </p>
        <p>Made with React, Next.JS, Prisma, MongoDB</p>
      </footer>
    </>
  );
}

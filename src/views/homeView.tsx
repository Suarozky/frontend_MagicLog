import HomeList from "../components/list/productList";
import { Banner } from "../components/banner";

function HomeView() {
  return (
    <div>
      <Banner />
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-2xl font-bold">Recomendados</h1>
        <button className="bg-blue-700 rounded-xl text-white px-4 py-2 ">See more</button>
      </div>
      <HomeList />
    </div>
  );
}

export default HomeView;

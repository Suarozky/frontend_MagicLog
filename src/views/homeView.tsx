import HomeList from "../components/list/productList";


function HomeView() {
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold text-black">Recomendados</h1>
      </div>
      <HomeList />
    </div>
  );
}

export default HomeView;

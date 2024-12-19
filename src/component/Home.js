import CryptCurr from "./CryptCurr";
import PopulationChart from "./PopulationChart";

const Home = () => (
    <div className="home-container" >
      <div className="chart-section">
        <PopulationChart />
      </div>
      <div className="chart-section">
        <CryptCurr />
      </div>
    </div>
  );
  
  export default Home;
  
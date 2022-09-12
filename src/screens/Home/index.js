import { useState, useEffect } from "react";
import DashboardCard from "../../components/DashboardCard";
import './index.css';
import pokemon from '../../images/pokemon2.png';
import SelectSearch from 'react-select-search';

function Home () {
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [filteredTypeData, setFilteredTypeData] = useState([]);
    const [selectedFilteredType, setSelectedFilteredType] = useState([]);
    const [filteredWeaknessData, setFilteredWeaknessData] = useState([]);
    const [selectedFilteredWeakness, setSelectedFilteredWeakness] = useState([]);

    const fetchPokemon = async () => {
        try{
          const response = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
          const body = await response.text();
          const res =JSON.parse(body);
          setData(res);
          setFilteredData(res);
          setFilteredTypeData(getTypeOptions(res));
          setFilteredWeaknessData(getWeaknessOptions(res));
        } catch(e) {
           console.log(e);
        }
      }

      useEffect(()=>{
        fetchPokemon();
      },[]);

      const handleSearch = (e) => {
        const tempFilteredData = data.pokemon.filter((item) => item.name.toLowerCase().includes(e.target.value));
        setFilteredData({
          ...filteredData,
          pokemon: tempFilteredData,
        });
      }

      const getTypeOptions = (res) => {
        let typeSet = new Set();
        res?.pokemon?.forEach((element) => { element.type.forEach((ele) => typeSet.add(ele));
        });
        return [...typeSet].map((element) => ({
          name: element,
          value: element,
        }))
      }

      const getWeaknessOptions = (res) => {
        let typeSet = new Set();
        res?.pokemon?.forEach((element) => { element.weaknesses.forEach((ele) => typeSet.add(ele));
        });
        return [...typeSet].map((element) => ({
          name: element,
          value: element,
        }))
      }

      const filterResult = (ele) => {
        return selectedFilteredType.every(e1 =>  ele.type.includes(e1))
          && selectedFilteredWeakness.every(e1 =>  ele.weaknesses.includes(e1));
      }

      const searchAndFilterData = () => {
        let filteredList = data.pokemon.filter((ele) => filterResult(ele));
        setFilteredData({
          ...filteredData,
          pokemon: filteredList,
        });
      }

     return (
      <div className='bodyClass'>
        <div className='headerClass'>
            <div className='headerContent'>
              <img className='imageLayout' src={pokemon} alt='Pokemon'/>
              <h1>Pokemon</h1>
            </div>
        </div>
        <div className='searchPanel'>
          <div className='searchContainer'>
            <input className='searchBar' placeholder="Search pokemon name" type='text' onChange={handleSearch}/>
          </div>
          {filteredTypeData?.length > 0 && <div className='filterContainer'>
            {/* <label>Search by Type</label> */}
            <SelectSearch options={filteredTypeData} printOptions='on-focus' closeOnSelect={false} multiple={true} value={selectedFilteredType}
              onChange={(_event, data) => {
                setSelectedFilteredType(data.map((e1)=>e1.value));
              }}  placeholder="Filter by type"/>
          </div>}
          {filteredWeaknessData?.length > 0 && <div className='filterContainer'>
            {/* <label>Search by Weakness</label> */}
            <SelectSearch options={filteredWeaknessData} printOptions='on-focus' closeOnSelect={false} multiple={true} value={selectedFilteredWeakness}
              onChange={(_event, data) => {
                setSelectedFilteredWeakness(data.map((e1)=>e1.value));
              }}  placeholder="Filter by Weakness"/>
          </div>}
          <div className='filterButton'><button onClick={searchAndFilterData}>Filter</button></div>
        </div>
        {filteredData?.pokemon?.length > 0 && <div className='mainContent'>
          { filteredData.pokemon.map((item) => <div className='cardlayout' key={item.id}>
            <DashboardCard image={item} />
          </div> )}
        </div>}
      </div>
     )
}

export default Home;

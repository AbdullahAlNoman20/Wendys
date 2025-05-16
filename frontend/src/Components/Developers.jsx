import { useLoaderData } from "react-router-dom";
import DevelopersCard from "./DevelopersCard";

const Developers = () => {

  const developers = useLoaderData();
  
  return (
    <div>
      <div className="text-center p-5">
        
        <h1 className="font-extrabold text-3xl">Recently We have {developers.length} Amazing Developers</h1>
        <p className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab animi
          quidem, nisi natus dolorem repellendus voluptas reiciendis soluta
          repellat porro doloribus assumenda quod non id cupiditate modi sit!
          Quis, odio?
        </p>
      
    </div>
        <section className="grid grid-cols-1 lg:grid-cols-3">
      {developers.map(developer => 
        <DevelopersCard key={developer.id} developer={developer}></DevelopersCard>
      )}
      </section>
    </div>
  );
};

export default Developers;

import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Service = () => {

    const [services , setServices] = useState([]);

  useEffect(() => {
    fetch('services.json')
      .then((response) => response.json())
      .then((services) => setServices(services))
      
  }, []);

  return (
    <div>
      <div className="text-center p-5">
        
          <h1 className="font-extrabold text-3xl">Recently We have {services.length} Food Item</h1>
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab animi
            quidem, nisi natus dolorem repellendus voluptas reiciendis soluta
            repellat porro doloribus assumenda quod non id cupiditate modi sit!
            Quis, odio?
          </p>
        
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-3">
      {services.map(service => 
        <ServiceCard key={service.id} service={service}></ServiceCard>
      )}
      </section>
      
    </div>
  );
};

export default Service;

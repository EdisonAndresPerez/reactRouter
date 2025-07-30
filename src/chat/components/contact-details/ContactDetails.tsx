import { getClients } from "@/fakeData/fakeData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { NoContactSelected } from "./NoContactSelected";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { ContactInfo } from "./ContactInfo";

export const ContactDetails = () => {
    const {clientId} = useParams()

    // Trae todos los clientes
    const {data: clients, isLoading} = useQuery({
        queryKey: ['clients'],
        queryFn: getClients,
    });

    // Busca el cliente seleccionado
    const client = clients?.find((c) => String(c.id) === String(clientId));

    if (!clientId){
        return <NoContactSelected />
    }


    if(isLoading && !client){
        return <ContactInfoSkeleton/>
    }
    if(client){
        return <ContactInfo client={client}/>
    }


  return (
    <div>
        Client not Found
    </div>

  );
}
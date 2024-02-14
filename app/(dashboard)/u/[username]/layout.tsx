import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import { SideBar } from "./_components/SideBar";
import { Container } from "./_components/Container";


interface CreatorLayoutProps {
    params:{username:string};
    children:React.ReactNode;
}


const CreatorLayout = async({params,children}:CreatorLayoutProps) => {

    const self = await getSelfByUsername(params.username)

    if(!self){
        redirect('/')
    };

  return (
    <>
    <Navbar/>
    <div className="flex h-full pt-20 ">
        <SideBar />
        <Container>
            {children}
        </Container>
    </div>
    </>
  )
}

export default CreatorLayout
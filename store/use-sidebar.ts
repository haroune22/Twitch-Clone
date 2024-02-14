import { create } from "zustand"

interface SidebarStoreProps {
    collapsed:boolean;
    onExpand:() => void;
    onCollapse:() => void;
}

export const useSidebar = create<SidebarStoreProps>((set)=> ({
    collapsed:false,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapse:()=>set(()=>({collapsed:true}))
}) )


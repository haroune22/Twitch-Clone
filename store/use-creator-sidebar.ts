import { create } from "zustand"

interface CreatorSidebarStoreProps {
    collapsed:boolean;
    onExpand:() => void;
    onCollapse:() => void;
}

export const useCreatorSidebar = create<CreatorSidebarStoreProps>((set)=> ({
    collapsed:false,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapse:()=>set(()=>({collapsed:true}))
}) )


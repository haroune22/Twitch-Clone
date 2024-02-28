import { create } from "zustand"


export enum ChatVariant {
    CHAT = "CHAT",
    COMMUNITY= "COMMUNITY"
};

interface useChatSidebarStoreProps {
    collapsed:boolean;
    variant: ChatVariant;
    onExpand:() => void;
    onCollapse:() => void;
    onChangeVariant :(variant:ChatVariant) => void;
}

export const useChatSidebar = create<useChatSidebarStoreProps>((set)=> ({
    collapsed:false,
    variant: ChatVariant.CHAT,
    onExpand:()=>set(()=>({collapsed:false})),
    onCollapse:()=>set(()=>({collapsed:true})),
    onChangeVariant: (variant:ChatVariant) => set(()=> ({variant}))
}) )


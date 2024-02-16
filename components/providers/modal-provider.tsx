"use client"

import SettingsModal from "@/components/models/settings-modal";
import { useEffect, useState } from "react";
import CoverImageModal from "@/components/cover-image-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
    return ( 
        <>
          <SettingsModal/>
          <CoverImageModal/>
        </>
     );
}
 
export default ModalProvider;
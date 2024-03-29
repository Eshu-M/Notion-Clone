"use client"

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { update } from "@/convex/documents";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "./single-image-drop-zone";

const CoverImageModal = () => {
    const params = useParams();
    const coverImage = useCoverImage();
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { edgestore } = useEdgeStore();
    const update = useMutation(api.documents.update);

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);
            
            const response = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                  },
            });

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: response.url
            });

            onClose();
        }
    }

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }
    return ( 
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <SingleImageDropzone className="w-full outline-none" disabled={isSubmitting} value={file} onChange={onChange}/>
            </DialogContent>
        </Dialog>
     );
}
 
export default CoverImageModal;
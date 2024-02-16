import Image from "next/image"

export const Heros=()=>{
    return(
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
                    <Image fill alt="Documents" src={"/documents.png"} className="object-contain dark:hidden"/>
                    <Image fill alt="Documents" src={"/documents-dark.png"} className="object-contain hidden dark:block"/>
                </div>
                <div className="relative h-[350px] w-[350px] hidden md:block">
                    <Image fill src={"/reading.png"} alt="Reading" className="object-contain dark:hidden"/>
                    <Image fill src={"/reading-dark.png"} alt="Reading" className="object-contain dark:block hidden"/>
                </div>
            </div>
        </div>
    )
}
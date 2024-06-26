'use client'
import { images } from "@/src/images"
import Bridge from "./components/Icons/Bridge"
import Logo from "./components/Icons/Logo"
import Image from "next/image"

// import { useState } from "react"
// import Modal from "./Modal"
// import { useLastViewedPhoto } from "@/src/utils/useLastViewedPhoto"

export default function Gallery() {
    // const [photoId, setPhotoId] = useState("")
    // const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

    return (
        <>
            {/* {photoId && (
                <Modal
                    images={images}
                    onClose={() => {
                        setLastViewedPhoto(photoId)
                    }}
                />
            )} */}
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <span className="flex max-h-full max-w-full items-center justify-center">
                            {/* <Bridge /> */}
                        </span>
                        <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
                    </div>
                    <img src="/logo.png" width="500" />
                    <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">ZARINA DRESSING</h1>
                    <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
                    Découvrez notre nouvelle collection de robes élégantes et d’ensembles assortis, parfaits pour toutes les occasions!
                    </p>
                </div>
                {images.map((image) => (
            // <Link
            //   key={id}
            //   href={`/?photoId=${id}`}
            //   as={`/p/${id}`}
            //   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            //   shallow
            //   className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            // >
              <img
                    key={image}
                alt="Zarina_Dressing"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 my-2"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                src={`https://pyiurs.com/catalog/zarina_images/${image}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            // </Link>
          ))}
            </div>
        </>
    )
}
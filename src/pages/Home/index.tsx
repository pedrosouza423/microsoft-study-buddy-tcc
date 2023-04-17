import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from 'react'
import { CertificationBanner } from '../../components/CertificationBanner'
import { CreateAdBanner } from '../../components/CreateAdBanner'
import { CreatedAtModal } from '../../components/CreatedAdModal'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "keen-slider/keen-slider.min.css";
import '../../styles/main.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Certifications } from "../../mock/Certifications";
import logoImg from '../../assets/logo-nlw-esports.svg'
import logoImg2 from '../../assets/logo-tcc.png'
import { Certification, countAdsByGame } from "../Certification";

export interface CertificationInfo extends Certification {
    _count: {
        ads: number;
    }
}

function saveIdGame(certificiation: any) {
    localStorage.setItem("id", certificiation)
}

export function Home() {
    const [certificiations, setCertificiations] = useState<CertificationInfo[]>([])
    const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        rubberband: false,
        breakpoints: {
            "(min-width: 200px)": {
                slides: { perView: 1.3, spacing: 10 },
            },
            "(min-width: 400px)": {
                slides: { perView: 2.5, spacing: 5 },
            },
            "(min-width: 600px)": {
                slides: { perView: 3.5, spacing: 5 },
            },
            "(min-width: 800px)": {
                slides: { perView: 4.5, spacing: 5 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 5.5, spacing: 10 },
            },
            "(min-width: 1200px)": {
                slides: { perView: 6.5, spacing: 10 },
            },
        },
        mode: "free-snap",
        slides: { origin: "center", perView: 5.5, spacing: 10 },
    })

    const contextClass = {
        success: "bg-[#2A2634] relative flex p-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
    }

    function updateGameAds() {
        const adsData = localStorage.getItem("testAds")
        const ads = JSON.parse(adsData!)

        certificiations.forEach(certificiation => {
            const adInfo = ads.find((ad: any) => ad.idGame === Number(certificiation.id))
            if (adInfo) {
                certificiation._count.ads += 1;
            }
        });

        return certificiations.map(certificiation => certificiation._count.ads);
    }

    updateGameAds()

    useEffect(() => {
        try {
            axios("http://localhost:3333/certificiations").then((response) => {
                setCertificiations(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    if (certificiations.length === 0) {
        setCertificiations(Certifications)
    }

    const [adsCounts, setAdsCounts] = useState<Record<number, number>>({});

    useEffect(() => {
        const adsData = localStorage.getItem("testAds");
        const ads = JSON.parse(adsData!);
      
        const counts: Record<number, number> = {};
      
        certificiations.forEach((certificiation) => {
          const filteredAds = ads.filter((ad: any) => ad.idGame === Number(certificiation.id));
          counts[certificiation.id] = filteredAds.length;
        });
      
        setAdsCounts(counts);
      }, [certificiations]);

    return (
        <div className="max-w-[1344px] mx-auto sm:px-8 md:px-10  flex flex-col items-center mt-11">
            <ToastContainer
                theme={"dark"}
                position="top-center"
                limit={12}
                closeOnClick
                autoClose={5000}
                toastClassName={(type) => contextClass.success}
            />
            <div className="w-full h-full mx-auto px-4 sm:px-8 md:px-10 flex items-center flex-col">

                <img src={logoImg2}  />
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-black mt-16 mb-16" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">parceiro de estudo</span> está aqui.</h1>

                <main className="w-full " >
                    {certificiations.length > 0 && (
                        <div className="flex items-center ">
                            <div ref={slideRef} className="keen-slider">
                                {certificiations.map(certificiation => {
                                    return (
                                        <Link to={`/certificiation/${certificiation.title}`} key={certificiation.id} className="keen-slider__slide rounded-lg shadow-2xl shadow-black/25 ">
                                            <CertificationBanner bannerUrl={certificiation.bannerUrl} handleClick={() => saveIdGame(certificiation.id)} title={certificiation.title} adsCount={adsCounts[certificiation.id] || 0} />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </main>

                <Dialog.Root>
                    <CreateAdBanner />
                    <CreatedAtModal />
                </Dialog.Root>
            </div>
        </div>
    )
}

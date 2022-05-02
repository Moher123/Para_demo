import dynamic from 'next/dynamic'
 import Image from 'next/image'
const MetaMaskCard = dynamic(() => import('../components/connectors/MetaMaskCard'), { ssr: false })

export default function Home() {
//Background picture
  return (
    <>
       <div className="flex flex-col justify-center item-center relative tracking-tight bg-black h-screen w-full"> 
       <Image 
        layout="fill"
        objectFit="cover"
        quality={100}
        src="/bg.png"
        alt={"bg image"}
        />
        <div className="w-full justify-center items-center flex flex-col space-x-4 z-10">
        <MetaMaskCard />
        </div>
       
      </div>
    </>
  )
}

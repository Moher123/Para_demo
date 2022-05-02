/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react'
import { hooks, metaMask } from '../../connectors/metaMask'
import { Accounts } from '../Accounts'
import { Card } from '../Card'
import { Chain } from '../Chain'
import { ConnectWithSelect } from '../ConnectWithSelect'
import { Status } from '../Status'
import GlowWrapper from '../GlowWrapper'
const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks
import Image from 'next/image'
export default function MetaMaskCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)
  const perMint = 0.25
  const mintValue = 250000000000000000 //0.25 ETH - 250000000000000000
  const MAX = 5 //max number of tokens to mint
  const MIN = 1 //min number of tokens to mint
  const [counter, setCounter] = useState(1)
  const [sent, setSent] = useState(false)
  const clickHandler = async () => {
    const txHash = await metaMask.provider
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: '0x9dC39f5bCdFfa33436e89E77f706AF3fcE9C5aB7',
            value: convertToEthereumHex(mintValue * counter),
          },
        ],
      })
      .then((txHash) => setSent(true))
      .catch((error) => console.error)
  }

  const convertToEthereumHex = (value: number): string => {
    return '0x' + value.toString(16)
  }
  const buttonHandler = (direction: 'up' | 'down') => {
    if (direction === 'up' && counter < MAX) {
      setCounter(counter + 1)
    } else if (direction === 'down' && counter > MIN) {
      setCounter(counter - 1)
    }
  }

  return sent ? (
    <GlowWrapper>
    <Card>
      <div className='text-center flex flex-wrap justify-center space-y-6'>
        <h2 className="text-white text-3xl w-full font-bold uppercase">Thank you!</h2>
        <p className='text-white font-semibold w-full text-xl under'>You will receive your NFT's in your wallet within 15 minutes</p>
        <button type="button" className="bg-black rounded-lg text-lg font-semibold text-white p-3 hover:bg-[#3f045c]" onClick={() => setSent(false)}>
          Mint More
        </button>
      </div>
    </Card>
    </GlowWrapper>
  ) : (
    <>
    <div className='flex justify-center items-center mb-20'>
        <img src="/logo-full.png" alt="logo" className='  h-60' />
      
      </div>
          <GlowWrapper>
    <Card>
      <div className="z-20 text-center">
      <div className='flex justify-center items-center m-5	'><img  src="/gif.gif" alt="gif" className=' w-40 h-40 rounded'  /></div>
        {/* <span className="w-full  text-[90px] font-bold text-white osaka">Soulz</span> */}
        {/* <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} /> */}
      </div>
      <h1 className="w-full font-semibold text-[30px] uppercase tracking-widest leading-5 text-white text-center py-2 italic osaka">8132/8888</h1>
      <h1 className=" text-white font-bold text-center pb-2 border pt-2 my-2 text-3xl">{perMint * counter} ETH + GAS FEES </h1>
      <div className="flex justify-between">
        <div className='flex flex-col justify-center'>
          <button
            onClick={() => buttonHandler('down')}
            className="inline-flex items-center justify-center w-10 h-10 mr-2 text-white font-bold 
            transition-colors duration-150 bg-black hover:bg-[#3f045c] rounded-full focus:shadow-outline "
          >
            -
          </button>
        </div>

        <input
          className="bg-transparent py-4 text-3xl osaka text-white font-bold text-center"
          type="number"
          value={counter}
          min="1"
          style={{ width: '100%', textAlign: 'center' }}
          readOnly={true}
        />
        <div className='flex flex-col justify-center'>
          <button
            onClick={() => buttonHandler('up')}
            className=" inline-flex items-center justify-center w-10 h-10 mr-2 
            text-white font-bold transition-colors duration-150 bg-black hover:bg-[#3f045c] rounded-full focus:shadow-outline "
          >
           +
          </button>
        </div>
        
      </div>

       
       
      {isActive ? (
        <button
          type="button"
          className="bg-black rounded-lg text-lg font-semibold text-white py-3 hover:bg-[#3f045c] "
          onClick={clickHandler}
        >
          Mint
        </button>
      ) : (
        <ConnectWithSelect
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive}
        />
      )}
    </Card>
     </GlowWrapper>
    {/* <ul className='mt-4 min-h-full osaka tracking-widest text-center flex flex-col justify-around p-4 rounded-large  leading-4 relative'>
    <Image 
        layout="fill"
        objectFit="cover"
        quality={100}
        src="/cardbg.png"
        alt={"card bg image"}
        />
    <li className='relative text-white font-bold text-4xl'>Steps</li>
    <li className='relative text-white font-bold text-xl'>1. Connect Wallet with Metamask</li>
    <li className='relative text-white font-bold text-xl'>2. Click on button "Mint" your NFT's</li>
    <li className='relative text-white font-bold text-xl'>3. Welcome to the community</li>
  </ul> */}
    </>
     
  )
}

import Image from "next/image"
export function Card({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div
      className="border-white px-4 mx-auto flex flex-col justify-between relative"
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   justifyContent: 'space-between',
      //   width: '20rem',
      //   padding: '1rem',
      //   margin: '1rem',
      //   overflow: 'auto',
      //   border: '1px solid',
      //   borderRadius: '1rem',
      // }}
    >

      {children}
    </div>
  )
}

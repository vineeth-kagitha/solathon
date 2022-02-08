import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Copy from '../public/icons/Copy.svg'
import Tick from '../public/icons/Tick.svg'

export const Code = ({ children }) => {
  const [icon, setIcon] = useState(Copy)

  console.log(useRouter().isPreview)
  console.log(useRouter().isReady)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(useRouter().isPreview ? {} : children.props.children.props.children)
    setIcon(Tick)
    setTimeout(() => setIcon(Copy), 3000)
  }

  return (
    <section className="flex items-center relative max-w-fit ">
      {useRouter().isPreview ? {} : {
        ...children,
        props: {
          ...children.props,
          children: {
            ...children,
            props: {
              ...children.props.children.props,
              children: children.props.children.props.children
                .replaceAll(";", "\r")
            }
          }
        }
      }}
      <div className={`flex absolute right-3 top-10 w-6 h-6 duration-100
                            ${icon == Copy ? "cursor-pointer active:translate-y-1" : null}`}>
        <Image src={icon} alt="copy" onClick={copyToClipboard} />
      </div>
    </section>
  )
}
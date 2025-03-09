import { ComponentProps } from 'react'

type ButtonProsps = ComponentProps<'button'> & {
  text: string
  danger?: boolean
}

const Button = ({ text, danger = false, ...props }: ButtonProsps) => {
  return (
    <button
      {...props}
      data-danger={danger}
      className="h-8 text-sm font-medium text-white py-1 px-6 rounded flex items-center bg-zinc-800 hover:bg-zinc-700 data-[danger=true]:text-red-500 data-[danger=true]:hover:bg-red-500 data-[danger=true]:hover:text-white"
    >
      {text}
    </button>
  )
}

export default Button

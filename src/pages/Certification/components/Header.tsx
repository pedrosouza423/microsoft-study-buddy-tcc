import { Link } from 'react-router-dom'
import logo from '../../../assets/logo-tcc.png'

interface Props {
    title: string
}

export function Header({title}: Props) {
    return(
        <div className="h-16 mt-5 flex items-center">
            <header className="text-white mt-4 flex items-center">
                <Link to="/">
                    <img src={logo} className="w-60 h-28" />
                </Link>
                <span className="h-11 animate-appear mr-2 border-r-[4px] rounded-md left-[230px] border-zinc-200"></span>
                <h1 className="text-2xl whitespace-nowrap animate-slide animate-reveal overflow-hidden font-black text-transparent bg-nlw-gradient select-all bg-clip-text">{title}</h1>
            </header>
        </div>
    )
}

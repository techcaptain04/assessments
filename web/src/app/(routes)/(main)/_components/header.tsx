import Link from "next/link";


const Header: React.FC = () => {
    return (
        <header className="
            container mx-auto max-w-screen-lg py-4 px-4
            flex justify-between items-center
        ">
            <div className="">
                <div className="header__logo">
                    <Link href="/">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
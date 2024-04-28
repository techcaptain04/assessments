import Header from "./_components/header";

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="">
            <Header />
            <main className="
            container mx-auto max-w-screen-lg flex flex-col
            ">{children}</main>
            {/* <Footer /> */}
        </div>
    );
}

export default MainLayout;
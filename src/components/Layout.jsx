 import Header from "./header";
const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header/>
      <main className="min-h-screen container mx-auto  scroll-py-8">
        {children}
      </main>
       <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center  ">
            <p>Made With ❤️ by Bhupesh Bhaskar</p>
        </div>
       </footer>
    </div>
  );
};

export default Layout;

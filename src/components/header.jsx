import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi"; // Import icons

const Header = () => {
  const { theme, setTheme } = useTheme();
 
  return (
    <header className="py-1 px-3 sticky top-0 z-50 backdrop-blur-sm bg-background/60 backdrop-saturate-200 border-b border-border">
      <div className="container mx-auto h-16 flex justify-between items-center">
    
        <Link to="/" className="text-xl font-bold text-foreground py-3 px-5 m-2">Climate</Link>
         
        <div className="flex items-center space-x-4"> 
          <button className="text-xl font-bold text-foreground py-3 px-5 m-2 rounded-lg hover:bg-muted transform transition duration-200 ease-in-out hover:scale-105">
            <FiSearch className="h-6 w-6 transition-opacity duration-200 ease-in-out hover:opacity-80" />
          </button>
          
          {/* Theme Toggle Button with Rotation on Click */}
          <button
            className="text-xl font-bold text-foreground py-3 px-3 m-2 rounded-full hover:bg-muted transform transition-transform duration-500 ease-in-out hover:scale-105 active:rotate-180"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <FiSun className="h-6 w-6 transition-all duration-500 ease-in-out" color="#FDB813"/>
            ) : (
              <FiMoon className="h-6 w-6 transition-all duration-500 ease-in-out" color="#222" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

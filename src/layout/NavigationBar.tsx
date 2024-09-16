import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const routes = [
  {
    name: "Home",
    path: ROUTES.HOME,
  },
  {
    name: "Products",
    path: ROUTES.PRODUCTS,
  },
  {
    name: "Create Product",
    path: ROUTES.CREATE_PRODUCT,
  },
];

const NavigationBar = () => {
  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-gray-200">
        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
            {routes.map((route) => (
              <li key={route.path}>
                <NavLink
                  className={({ isActive }) =>
                    `md:p-4 py-2 block ${
                      isActive ? "text-purple-600" : "hover:text-purple-400"
                    }`
                  }
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;

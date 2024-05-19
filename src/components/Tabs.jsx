import { twMerge } from "tailwind-merge";
import { Link, useLocation, useParams } from "react-router-dom";
const Tabs = ({ tabs }) => {
  const pathname = useLocation().pathname;
  const { id } = useParams();

  return (
    <div className="flex flex-1 justify-center">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.url);
        return (
          <Link
            key={tab.name}
            to={`/templates/${id}/${tab.url}`}
            className={twMerge(`
              text-center py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900
              ${isActive ? 'border-b-2 border-blue-500' : 'border-b-4 border-transparent'}
            `)}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;

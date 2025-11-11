import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = ["", ...location.pathname.split("/").filter((x) => x)];

  const getBreadcrumbName = (pathname: string) => {
    if (pathname === "") return "Главная";
    if (pathname === "lamps") {
      return pathnames.length > 1 ? "Лампы" : "Услуги (Лампы)";
    }
    if (!isNaN(Number(pathname))) return "Детали лампы";
    return pathname.charAt(0).toUpperCase() + pathname.slice(1);
  };

  if (location.pathname == "/") return;

  const navigate = useNavigate();

  const onCrumbClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate((event.currentTarget.children[0] as HTMLAnchorElement).pathname);
  };

  return (
    <Breadcrumb className="breadcrumbs">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(1, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item
            className="breadcrumbs__item"
            href={routeTo}
            active={isLast}
            key={index}
            onClick={isLast ? undefined : onCrumbClick}
          >
            {getBreadcrumbName(name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

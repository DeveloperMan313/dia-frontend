import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (pathname: string) => {
    if (pathname === "") return "Главная";
    if (pathname === "lamps") {
      return pathnames.length > 1 ? "Лампы" : "Услуги (Лампы)";
    }
    if (!isNaN(Number(pathname))) return "Детали лампы";
    return pathname.charAt(0).toUpperCase() + pathname.slice(1);
  };

  if (location.pathname == "/") return;

  return (
    <Breadcrumb className="breadcrumbs">
      <Breadcrumb.Item className="breadcrumbs__item">
        <Link to="/">Главная</Link>
      </Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Breadcrumb.Item className="breadcrumbs__item" active key={routeTo}>
            {getBreadcrumbName(name)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item className="breadcrumbs__item" key={routeTo}>
            <Link to={routeTo}>{getBreadcrumbName(name)}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

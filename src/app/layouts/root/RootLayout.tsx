import styles from "./RootLayout.module.scss";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function RootLayout() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (width < 729) {
    return (
      <div className={clsx(styles.RootLayout, styles.mobile)}>
        <Empty>
          <EmptyHeader>
            <EmptyTitle>
              Приложение недоступно на мобильных устройствах
            </EmptyTitle>
            <EmptyDescription>
              Для работы с приложением используйте компьютер
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className={styles.RootLayout}>
      <Outlet />
    </div>
  );
}

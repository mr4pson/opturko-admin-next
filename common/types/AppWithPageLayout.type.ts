import {AppProps} from "next/app";
import {ComponentWithLayout} from "./ComponentWithLayout.type";

type AppWithPageLayout = AppProps & {
    Component: ComponentWithLayout
};

export type {AppWithPageLayout}
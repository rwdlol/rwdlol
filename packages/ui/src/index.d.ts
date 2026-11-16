// Types for index.js. Each Astro component is typed with its props,
// so editors and `astro check` catch missing or wrong props.
import type { AccordionProps } from "./components/Accordion/Accordion";
import type { AlertProps } from "./components/Alert/Alert";
import type { ButtonProps } from "./components/Button/Button";
import type { CardProps } from "./components/Card/Card";
import type { FooterProps } from "./components/Footer/Footer";
import type { HeaderProps } from "./components/Header/Header";
import type { HeroProps } from "./components/Hero/Hero";
import type { InputProps } from "./components/Input/Input";
import type { SkillListProps } from "./components/SkillList/SkillList";

/** An Astro component that accepts the props P. */
type AstroComponent<P> = (props: P) => any;

export declare const Accordion: AstroComponent<AccordionProps>;
export declare const Alert: AstroComponent<AlertProps>;
export declare const Button: AstroComponent<ButtonProps>;
export declare const Card: AstroComponent<CardProps>;
export declare const Footer: AstroComponent<FooterProps>;
export declare const Header: AstroComponent<HeaderProps>;
export declare const Hero: AstroComponent<HeroProps>;
export declare const Input: AstroComponent<InputProps>;
export declare const SkillList: AstroComponent<SkillListProps>;

export type {
  AccordionItem,
  AccordionProps,
} from "./components/Accordion/Accordion";
export type { AlertProps, AlertType } from "./components/Alert/Alert";
export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./components/Button/Button";
export type { CardProps } from "./components/Card/Card";
export type { FooterProps } from "./components/Footer/Footer";
export type { HeaderProps, NavLink } from "./components/Header/Header";
export type { HeroProps } from "./components/Hero/Hero";
export type { InputProps } from "./components/Input/Input";
export type { SkillListProps } from "./components/SkillList/SkillList";

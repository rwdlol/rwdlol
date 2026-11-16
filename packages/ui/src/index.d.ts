import type { AccordionProps } from "@rwdlol/ui/components/Accordion/Accordion.ts";
import type { AlertProps } from "@rwdlol/ui/components/Alert/Alert.ts";
import type { BaseLayoutProps } from "@rwdlol/ui/components/BaseLayout/BaseLayout.ts";
import type { ButtonProps } from "@rwdlol/ui/components/Button/Button.ts";
import type { CardProps } from "@rwdlol/ui/components/Card/Card.ts";
import type { FooterProps } from "@rwdlol/ui/components/Footer/Footer.ts";
import type { HeaderProps } from "@rwdlol/ui/components/Header/Header.ts";
import type { HeroProps } from "@rwdlol/ui/components/Hero/Hero.ts";
import type { InputProps } from "@rwdlol/ui/components/Input/Input.ts";
import type { SkillListProps } from "@rwdlol/ui/components/SkillList/SkillList.ts";

type AstroComponent<P> = (props: P) => any;

export declare const Accordion: AstroComponent<AccordionProps>;
export declare const Alert: AstroComponent<AlertProps>;
export declare const BaseLayout: AstroComponent<BaseLayoutProps>;
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
} from "@rwdlol/ui/components/Accordion/Accordion.ts";
export type { AlertProps, AlertType } from "@rwdlol/ui/components/Alert/Alert.ts";
export type { BaseLayoutProps, SiteConfig } from "@rwdlol/ui/components/BaseLayout/BaseLayout.ts";
export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "@rwdlol/ui/components/Button/Button.ts";
export type { CardProps } from "@rwdlol/ui/components/Card/Card.ts";
export type { FooterProps } from "@rwdlol/ui/components/Footer/Footer.ts";
export type { HeaderProps, NavLink } from "@rwdlol/ui/components/Header/Header.ts";
export type { HeroProps } from "@rwdlol/ui/components/Hero/Hero.ts";
export type { InputProps } from "@rwdlol/ui/components/Input/Input.ts";
export type { SkillListProps } from "@rwdlol/ui/components/SkillList/SkillList.ts";

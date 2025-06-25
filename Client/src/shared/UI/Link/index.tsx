import { buttonDictionary, ButtonStyle, ButtonStyleItem } from "../Button/ButtonDictionary";

export interface ButtonProps {
    style: ButtonStyle;
    children: React.ReactNode;
    className?: string;
    href: string;
  }
  
  const Link: React.FC<ButtonProps> = ({
    style,
    children,
    className,
    href
  }) => {
    const { textColor, bgColor }: ButtonStyleItem = buttonDictionary[style];
  
    return (
      <a
        style={{ color: textColor, backgroundColor: bgColor }}
        className={`py-3 cursor-pointer ${className}`}
        href={href}
      >
        {children}
      </a>
    );
  };
  

export default Link;
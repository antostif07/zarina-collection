import Menu from "./ui/Menu";

export default function Template({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="sm:px-28 px-4 py-8">
            <Menu />
            {children}
        </div>
    )
}
import { Button } from "../ui/button";

type Props = {
  url: string;
  icon: string;
  name: string;
};

export default function SocialBtn({ url, name, icon }: Props) {
  return (
    <Button className="my-1.5 w-full py-4 text-lg">
      <a href={url} className="py-3">
        <i className={icon}></i> {name}
      </a>
    </Button>
  );
}

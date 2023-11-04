import { Button } from "../ui/button"

type Props = {
    url: string
    icon: string
    name: string
}

export default function SocialBtn({url, name, icon}: Props) {
    return (
        <Button className="w-full text-lg my-1.5 py-4">
            <a href={url} className="py-3">
                <i className={icon}></i> {" "} {name}
            </a>
        </Button>
    )
}

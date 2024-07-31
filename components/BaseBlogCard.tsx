import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BaseBlogCardProps {
  href: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  authorFallback: string;
}

const BaseBlogCard: React.FC<BaseBlogCardProps> = ({
  href,
  imageSrc,
  imageAlt,
  title,
  description,
  authorName,
  authorImage,
  authorFallback,
}) => {
  return (
    <Link
      href={href}
      className="bg-muted group grid gap-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[400px]"
      prefetch={false}
    >
      <Image
        src={imageSrc}
        width={400}
        height={225}
        alt={imageAlt}
        className="aspect-video object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold group-hover:underline">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src={authorImage} />
            <AvatarFallback>{authorFallback}</AvatarFallback>
          </Avatar>
          <span>{authorName}</span>
        </div>
      </div>
    </Link>
  );
};

export default BaseBlogCard;

export interface BlogData {
  id: string;
  userId: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  authorFallback: string;
  date: string;
  content: string;
  IsDeleted?: boolean;
}
